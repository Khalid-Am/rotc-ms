<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OfficerResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'student_id' => $this->student_id,
            'rank' => $this->rank,
            'class' => $this->class,
            'firstName' => $this->firstName,
            'middleName' => $this->middleName,
            'lastName' => $this->lastName,
            'program' => $this->program,
            'major' => $this->major,
            'birthdate' => $this->birthdate ? (new Carbon($this->birthdate))->format('Y-m-d') : null,
            'religion' => $this->religion,
            'blood_type' => $this->blood_type,
            'province' => $this->province,
            'region' => $this->region,
            'height_cm' => $this->height_cm,
        ];
    }
}
