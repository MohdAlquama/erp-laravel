<?php

namespace App\Http\Controllers\Admin\BatchShifting;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\BatchShiftLog;
// use App\Models\BatchShiftLog; 
use Inertia\Inertia;

class BatchShiftingController extends Controller
{
    public function index(){
        return Inertia::render('admin/BatchShifting/BatchShifting');
    }

    public function getStudentsByBatchAndSession($adminId, $batchId, $session)
    {
        $students = Student::where('admin_id', $adminId)
            ->where('batch_ids', $batchId)
            ->where('session', $session)
            ->get();

        return response()->json([
            'data' => $students
        ]);
    }


  // ✅ Shift Students to new batch & session
    // public function shiftStudents(Request $request)
    // {
    //     $validated = $request->validate([
    //         'student_ids' => 'required|array',
    //         'batch_id' => 'required|integer',
    //         'session' => 'required|string',
    //     ]);

    //     $updated = Student::whereIn('id', $validated['student_ids'])
    //         ->update([
    //             'batch_ids' => $validated['batch_id'],
    //             'session' => $validated['session'],
    //         ]);

    //     if ($updated === 0) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'No students were updated. Check IDs and batch/session values.'
    //         ], 400);
    //     }

    //     return response()->json([
    //         'success' => true,
    //         'message' => 'Selected students updated successfully'
    //     ]);
    // }


    



    // use App\Models\BatchShiftLog;

public function shiftStudents(Request $request)
{
    $validated = $request->validate([
        'student_ids' => 'required|array',
        'batch_id' => 'required|integer',
        'session' => 'required|string',
        'admin_id' => 'required|integer',
    ]);

    $students = Student::whereIn('id', $validated['student_ids'])->get();

    foreach ($students as $student) {
        // Log the batch shift
        BatchShiftLog::create([
            'student_id' => $student->id,
            'admin_id' => $validated['admin_id'],
            'old_batch_id' => $student->batch_ids,
            'old_session' => $student->session,
            'new_batch_id' => $validated['batch_id'],
            'new_session' => $validated['session'],
        ]);

        // Update the student
        $student->update([
            'batch_ids' => $validated['batch_id'],
            'session' => $validated['session'],
        ]);
    }

    return response()->json([
        'success' => true,
        'message' => 'Selected students updated and history saved successfully'
    ]);
}

public function getBatchShiftLogs($studentId)
{
    $logs = BatchShiftLog::where('student_id', $studentId)
        ->with('admin') // assuming BatchShiftLog has admin relation
        ->orderBy('created_at', 'desc')
        ->get();

    return response()->json($logs);
}

public function getAllBatchShiftLogs($adminId)
{
    $logs = BatchShiftLog::with(['student', 'oldBatch', 'newBatch', 'admin'])
        ->where('admin_id', $adminId)
        ->orderBy('created_at', 'desc')
        ->get();

    return response()->json($logs);
}


}
