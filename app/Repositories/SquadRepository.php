<?php

namespace App\Repositories;

use App\Http\Requests\SquadRequest;
use App\Models\Squad;
use Illuminate\Support\Str;

class SquadRepository
{
    protected Squad $model;

    public function __construct(Squad $model)
    {
        $this->model = $model;
    }

    public function create(SquadRequest $request): void
    {
        $this->model->create(array_merge($request->all()));
    }

    public function update(SquadRequest $request, Squad $squad): void
    {
        $squad->update(array_merge($request->all()));
    }

    public function remove(Squad $squad): void
    {
        $squad->delete();
    }
}
