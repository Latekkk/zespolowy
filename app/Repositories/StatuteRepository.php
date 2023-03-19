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
        $this->model->create(array_merge($request->all(), ['slug' => $this->saveSlug($request->title)]));
    }

    public function update(StatuteRequest $request, Statute $advertisement): void
    {
        $advertisement->update(array_merge($request->all(), ['slug' => $this->saveSlug($request->title)]));
    }

    public function remove(Statute $advertisement): void
    {
        $advertisement->delete();
    }


    private function saveSlug($title): string
    {
        return Str::slug(str_replace(' ','_', $title));
    }
}
