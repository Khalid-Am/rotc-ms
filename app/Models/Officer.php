<?php

namespace App\Models;

use Dyrynda\Database\Support\CascadeSoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Officer extends Model
{
    use HasFactory, SoftDeletes, CascadeSoftDeletes;

    protected $cascadeDeletes = ['users'];

    protected $dates = ['deleted_at'];

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

    public function attendances() : HasMany 
    {
        return $this->hasMany(Attendance::class, 'officer_id');
    }

    public function users() :HasMany
    {
        return $this->hasMany(User::class, 'officer_id');
    }

}
