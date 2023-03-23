<?php

namespace App\Repositories;

use App\Http\Requests\BadgeRequest;
use App\Models\Badge;
use Illuminate\Support\Str;

class BadgeRepository
{
    protected Badge $model;

    public function __construct(Badge $model)
    {
        $this->model = $model;
    }

    public function create(Badge $request): void
    {
        $this->model->create(array_merge($request->all()));
    }

    public function update(BadgeRequest $request, Badge $badge): void
    {
        $badge->update(array_merge($request->all()));
    }

    public function remove(Badge $badge): void
    {
        $badge->delete();
    }

}
