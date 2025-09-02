<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BatchShiftLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'old_batch_id',
        'new_batch_id',
        'old_session',
        'new_session',
        'admin_id', 
    ];

    public function admin()
{
    return $this->belongsTo(Admin::class, 'admin_id');
}
    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }

    public function oldBatch()
    {
        return $this->belongsTo(Batch::class, 'old_batch_id');
    }

    public function newBatch()
    {
        return $this->belongsTo(Batch::class, 'new_batch_id');
    }
}
