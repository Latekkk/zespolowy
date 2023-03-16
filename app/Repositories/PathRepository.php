<?php

namespace App\Repositories;

use App\Http\Requests\PathRequest;
use App\Models\Path;
use Illuminate\Support\Str;

class PathRepository
{
    protected Path $model;

    public function __construct(Path $model)
    {
        $this->model = $model;
    }

    public function create(PathRequest $request): void
    {
        $this->model->create(array_merge($request->all(), ['slug' => $this->saveSlug($request->name)]));
    }

    public function update(PathRequest $request, Path $path): void
    {
        $path->update(array_merge($request->all(), ['slug' => $this->saveSlug($request->name)]));
    }

    public function remove(Path $path): void
    {
        $path->delete();
    }


    private function saveSlug($text): string
    {
        return Str::slug(str_replace(' ','_', $text));
    }
}
