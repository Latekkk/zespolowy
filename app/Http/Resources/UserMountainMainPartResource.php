<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserMountainMainPartResource extends JsonResource
{

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'mountain_main_part_id' => $this->mountain_main_part_id,
            'name' => $this->mountainMainPart->name,
            'granted' => $this->grantedByUser->name,
            'created_at' => $this->created_at->toDateTimeString(),
        ];
    }
}
