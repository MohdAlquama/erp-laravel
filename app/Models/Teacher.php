<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Teacher extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'email', 'password', 'batch', 'created_by'];

    protected $hidden = ['password'];

    protected $casts = [
        'batch' => 'array', // 👈 Casts JSON to PHP array
    ];
}
