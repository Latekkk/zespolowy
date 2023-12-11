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
        $tripId = $request->input('trip_id');
        $pathId = $request->input('guide');
        $status = $request->input('status');
        $approvedId = null;

        $pointsMountainSection = $request->input('points_mountain_section');
        $userPoints = new UserPoints([
            'user_id' => $userId,
            'points_mountain_section' => $pointsMountainSection,
            'trip_id' => $tripId,
            'status' => $status,
            'approved_id' => $approvedId,
            'path_user_id' => $pathId,
        ]);
        return $userPoints;
    }

    private function getFile($request)
    {

        return $request->img_url;
    }
}
