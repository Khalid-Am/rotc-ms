<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'status' => $this->status,
            'posted_at' => $this->posted_at ? (new Carbon($this->posted_at))->format("Y-m-d") : null,
            'due_date' => $this->due_date ? (new Carbon($this->due_date))->format("Y-m-d") : null,
            'posted_by' => new UserResource($this->postedBy),
        ];
    }
}
