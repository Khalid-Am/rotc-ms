<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Attendance extends Model
{
    use HasFactory;

    protected $fillable = [
        'officer_id',
        'signed_at',
    ];

    public function signedBy() : BelongsTo
    {
        return $this->belongsTo(Officer::class, 'officer_id');
    }
}
