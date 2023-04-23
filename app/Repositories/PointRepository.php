<?php

namespace App\Repositories;

use App\Exceptions\PointExceptions\PointExceptionsSaveWithMountainMainParts;
use App\Helpers\SlugHelper;
use App\Http\Requests\PointRequest;
use App\Models\Point;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PointRepository
{
    protected Point $model;

    public function __construct(Point $model)
    {
        $this->model = $model;
    }

    /**
     * @throws PointExceptionsSaveWithMountainMainParts
     */
    public function create(PointRequest $request): void
    {
        try {
            DB::transaction(function () use ($request) {
                $point = $this->getPointFromRequest($request);
                $point->save();

                $point->mountainMainParts()->attach(array_column($request->mountainMainParts, 'id'), ['point_id' => $point->id]);

            });
        } catch (PointExceptionsSaveWithMountainMainParts $e) {
            throw new PointExceptionsSaveWithMountainMainParts($e->getMessage());
        }
    }

    /**
     * @throws PointExceptionsSaveWithMountainMainParts
     */
    public function update(PointRequest $request, Point $point): void
    {
        try {
            DB::transaction(function () use ($request, $point) {
                $point->update($this->getPointFromRequest($request, true));
                $point->mountainMainParts()->detach();
                $point->mountainMainParts()->attach(array_column($request->mountainMainParts, 'id'), ['point_id' => $point->id]);
            });
        } catch (PointExceptionsSaveWithMountainMainParts $e) {
            throw new PointExceptionsSaveWithMountainMainParts($e->getMessage());
        }
    }

    public function remove(Point $point): void
    {
        $point->delete();
    }

    private function getPointFromRequest($request, $update = false): Point|array
    {
        $data = [
            'user_id' => Auth::user()->id,
            'name' => $request->name,
            'lat' => $request->markers[0]['lat'],
            'lng' => $request->markers[0]['lng'],
            'slug' => SlugHelper::getSlug($request->name)
        ];

        if ($update) {
            return $data;
        }
        return new Point($data);
    }

}
