<?php

namespace App\Repositories;

use App\Http\Requests\SignRequest;
use App\Models\Badge;
use App\Models\Sign;
use Illuminate\Support\Str;

class SignRepository
{
    protected Sign $model;

    public function __construct(Sign $model)
    {
        $this->model = $model;
    }

    public function create(Sign $request): void
    {
        $this->model->create(array_merge($request->all()));
    }

    public function update(SignRequest $request, Sign $sign): void
    {
        $sign->update(array_merge($request->all()));
    }

    public function remove(Sign $sign): void
    {
        $sign->delete();
    }

}
