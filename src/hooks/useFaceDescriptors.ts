import { useState, useCallback, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import { createClient } from '@/lib/supabase/client';

export function useFaceDescriptors() {
  const [isReady, setIsReady] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]);
  const supabase = createClient();

  // Load all face descriptors on mount
  useEffect(() => {
    async function loadDescriptors() {
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
    loadDescriptors();
  }, []);

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

    // Threshold check (distance < 0.5 means confident match)
    if (bestDistance > 0.5) {
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
        performance: performance || null,
        confidence: 1 - bestDistance
      };
    }

    return null;
  }, [employees, supabase]);

  return { isReady, matchFace };
}
