<?php

namespace App\Repositories;

use App\Enums\PointsMountainSectionEnum;
use App\Http\Requests\UserPointsRequest;
use App\Models\UserPoints;
use App\Services\PhotoService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserPointsRepository
{
    protected UserPoints $model;
    protected PhotoService $photoService;

    public function __construct(UserPoints $model, PhotoService $photoService)
    {
        $this->model = $model;
        $this->photoService = $photoService;
    }

    public function create(UserPointsRequest $request): void
    {
        DB::transaction(function () use ($request) {
            $userPointsRequest = $this->getUserPointsFromRequest($request);
            $userPointsRequest->save();
            $this->photoService->savePhoto($this->getFile($request), $userPointsRequest);
        });

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
        $pathId = $request->input('guide');
        $mountainSectionId = $request->input('mountain_section_id');
        $status = $request->input('status');
        $approvedId = null;

        $pointsMountainSection = $request->input('points_mountain_section');
        if (in_array(PointsMountainSectionEnum::ENTRY->value, $pointsMountainSection) && in_array(PointsMountainSectionEnum::DESCENT->value, $pointsMountainSection)) {
            $userPoints = new UserPoints([
                'user_id' => $userId,
                'mountain_section_id' => $mountainSectionId,
                'points_mountain_section' => PointsMountainSectionEnum::BOTH->value,
                'status' => $status,
                'approved_id' => $approvedId,
                'path_user_id' => $pathId,
            ]);
        } else if (in_array(PointsMountainSectionEnum::ENTRY->value, $pointsMountainSection)) {
            $userPoints = new UserPoints([
                'user_id' => $userId,
                'mountain_section_id' => $mountainSectionId,
                'points_mountain_section' => PointsMountainSectionEnum::ENTRY->value,
                'status' => $status,
                'approved_id' => $approvedId,
                'path_user_id' => $pathId,
            ]);
        } else if (in_array(PointsMountainSectionEnum::DESCENT->value, $pointsMountainSection)) {
            $userPoints = new UserPoints([
                'user_id' => $userId,
                'mountain_section_id' => $mountainSectionId,
                'points_mountain_section' => PointsMountainSectionEnum::DESCENT->value,
                'status' => $status,
                'approved_id' => $approvedId,
                'path_user_id' => $pathId,
            ]);
        }

        return $userPoints;
    }

    private function getFile($request)
    {

        return $request->img_url;
    }
}
