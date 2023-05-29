<?php

namespace App\Repositories;

use App\Enums\PointsMountainSectionEnum;
use App\Http\Requests\UserPointsRequest;
use App\Models\UserPoints;

class UserPointsRepository
{
    protected UserPoints $model;

    public function __construct(UserPoints $model)
    {
        $this->model = $model;
    }
    public function create(UserPointsRequest $request): void
    {
        $userPointsRequests = $this->getUserPointsFromRequest($request);
        foreach ($userPointsRequests as $userPointsRequest) {
            $userPointsRequest->save();
        }
    }

    public function update(UserPointsRequest $request, UserPoints $user): void
    {
        $user->update($this->getUserPointsFromRequest($request, true));
    }

    public function remove(UserPoints $user): void
    {
        $user->delete();
    }

    private function getUserPointsFromRequest(UserPointsRequest $request, $update = false): UserPoints|array
    {
        $userPoints = [];

        $userId = $request->input('user_id');
        $mountainSectionId = $request->input('mountain_section_id');
        $status = $request->input('status');
        $approvedId = null;

        $pointsMountainSection = $request->input('points_mountain_section');

        if (in_array(PointsMountainSectionEnum::ENTRY->value, $pointsMountainSection)) {
            $userPoints[] = new UserPoints([
                'user_id' => $userId,
                'mountain_section_id' => $mountainSectionId,
                'points_mountain_section' => PointsMountainSectionEnum::ENTRY->value,
                'status' => $status,
                'approved_id' => $approvedId,
            ]);
        }

        if (in_array(PointsMountainSectionEnum::DESCENT->value, $pointsMountainSection)) {
            $userPoints[] = new UserPoints([
                'user_id' => $userId,
                'mountain_section_id' => $mountainSectionId,
                'points_mountain_section' => PointsMountainSectionEnum::DESCENT->value,
                'status' => $status,
                'approved_id' => $approvedId,
            ]);
        }
        return $userPoints;
    }
}
