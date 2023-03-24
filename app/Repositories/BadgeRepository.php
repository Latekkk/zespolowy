<?php

namespace App\Repositories;

use App\Exceptions\PhotoExceptions\PhotoRemoveException;
use App\Exceptions\PhotoExceptions\PhotoSaveException;
use App\Exceptions\PhotoExceptions\PhotoUpdateException;
use App\Http\Requests\BadgeRequest;
use App\Models\Badge;
use App\Services\PhotoService;

class BadgeRepository
{
    protected Badge $model;
    protected PhotoService $photoService;
    public function __construct(Badge $model, PhotoService $photoService)
    {
        $this->model = $model;
        $this->photoService = $photoService;
    }

    /**
     * @throws PhotoSaveException
     */
    public function create(BadgeRequest $request): void
    {
        $badge = $this->model->create(array_merge($request->all()));
        $this->photoService->savePhoto($this->getFile($request), $badge);
    }

    /**
     * @throws PhotoUpdateException
     */
    public function update(BadgeRequest $request, Badge $badge): void
    {
        $badge->update(array_merge($request->all()));
        if ($request->has('file')) {
             $this->photoService->updatePhoto($this->getFile($request), $badge->photos()->first());
        }
    }

    /**
     * @throws PhotoRemoveException
     */
    public function remove(Badge $badge): void
    {
        $badge->delete();
        $this->photoService->deletePhoto($badge->photos()->first());
    }


    private function getFile($request)
    {
        return $request->img_url;
    }
}
