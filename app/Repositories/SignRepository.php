<?php

namespace App\Repositories;

use App\Exceptions\PhotoExceptions\PhotoRemoveException;
use App\Exceptions\PhotoExceptions\PhotoSaveException;
use App\Exceptions\PhotoExceptions\PhotoUpdateException;
use App\Http\Requests\SignRequest;
use App\Models\Sign;
use App\Services\PhotoService;

class SignRepository
{
    protected Sign $model;
    protected PhotoService $photoService;

    public function __construct(Sign $model, PhotoService $photoService)
    {
        $this->model = $model;
        $this->photoService = $photoService;
    }

    /**
     * @throws PhotoSaveException
     */
    public function create(SignRequest $request): void
    {
        $sign = $this->model->create(array_merge($request->all()));
        $this->photoService->savePhoto($this->getFile($request), $sign);
    }

    /**
     * @throws PhotoUpdateException
     */
    public function update(SignRequest $request, Sign $sign): void
    {
        $sign->update(['name' => $request->name, 'point' => $request->point]);
        if ($request->has('img_url')) {
            if ($sign->photos()->first() === null) {
                $this->photoService->savePhoto($this->getFile($request), $sign);
            } else {
                $this->photoService->updatePhoto($this->getFile($request), $sign->photos()->first(), $sign);
            }
        }
    }

    /**
     * @throws PhotoRemoveException
     */
    public function remove(Sign $sign): void
    {
        $sign->delete();
        $this->photoService->deletePhoto($sign->photos()->first());
    }


    private function getFile($request)
    {
        return $request->img_url;
    }
}
