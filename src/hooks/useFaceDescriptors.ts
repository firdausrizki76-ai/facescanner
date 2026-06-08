import { useState, useCallback, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import { createClient } from '@/lib/supabase/client';

export function useFaceDescriptors() {
  const [isReady, setIsReady] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]);
  const [threshold, setThreshold] = useState<number>(0.5);
  const [resetDelay, setResetDelay] = useState<number>(8000);
  const supabase = createClient();

  // Load all face descriptors and settings on mount
  useEffect(() => {
    async function loadData() {
      // Load Settings
      const { data: settingsData } = await supabase
        .from('app_settings')
        .select('face_match_threshold, scanner_reset_delay')
        .eq('id', 'global')
        .single();
        
      if (settingsData) {
        if (settingsData.face_match_threshold) setThreshold(settingsData.face_match_threshold);
        if (settingsData.scanner_reset_delay) setResetDelay(settingsData.scanner_reset_delay);
      }

      // Load Employees
      const { data, error } = await supabase
        .from('employees')
        .select('id, name, employee_number, department, position, face_descriptor')
        .eq('is_active', true)
        .not('face_descriptor', 'is', null);

      if (!error && data) {
        setEmployees(data);
      }
      setIsReady(true);
    }
    loadData();
  }, [supabase]);

  const matchFace = useCallback(async (descriptor: Float32Array) => {
    if (employees.length === 0) return null;

    let bestMatch = null;
    let bestDistance = Infinity;

    for (const emp of employees) {
      if (emp.face_descriptor && Array.isArray(emp.face_descriptor)) {
        // Convert array back to Float32Array
        const dbDescriptor = new Float32Array(emp.face_descriptor);
        const distance = faceapi.euclideanDistance(descriptor, dbDescriptor);
        
        if (distance < bestDistance) {
          bestDistance = distance;
          bestMatch = emp;
        }
      }
    }

    // Threshold check
    if (bestDistance > threshold) {
      return null;
    }

    if (bestMatch) {
      // Fetch performance data for today
      const { data: performance } = await supabase
        .from('today_performance')
        .select('*')
        .eq('id', bestMatch.id)
        .single();

      // Log success attendance
      await supabase.from('attendance_logs').insert({
        employee_id: bestMatch.id,
        scan_type: 'info',
        confidence_score: 1 - bestDistance
      });

      return {
        employee: bestMatch,
        performance: performance && performance.kg_lifted !== null ? performance : null,
        confidence: 1 - bestDistance
      };
    }

    return null;
  }, [employees, threshold, supabase]);

  return { isReady, matchFace, resetDelay };
}
