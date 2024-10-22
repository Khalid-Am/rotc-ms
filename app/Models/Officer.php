<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Officer extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'student_id',
        'rank',
        'class',
        'firstName',
        'middleName',
        'lastName',
        'program',
        'major',
        'birthdate',
        'religion',
        'blood_type',
        'province',
        'region',
        'height_cm'
    ];

}