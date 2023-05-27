<?php

namespace App\Repositories;

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
        $userPointsRequest = $this->getUserPointsFromRequest($request);
        $userPointsRequest->save();
        dd($userPointsRequest);
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
        $data = [
//           TODO:: do napisania nie chce mi się xD
        ];

        if ($update) {
            return $data;
        }

        return new UserPoints($data);
    }

}
