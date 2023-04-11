<?php

namespace App\Repositories;

use App\Http\Requests\StatuteRequest;
use App\Models\Statute;
use Illuminate\Support\Str;

class StatuteRepository
{
    protected Statute $model;

    public function __construct(Statute $model)
    {
        $this->model = $model;
    }

    public function create(StatuteRequest $request): void
    {
        $this->model->create(array_merge($request->all()));
    }

    public function update(StatuteRequest $request, Statute $statute): void
    {
        $statute->update(array_merge($request->all()));
    }

    public function remove(Statute $statute): void
    {
        $statute->delete();
    }
}
