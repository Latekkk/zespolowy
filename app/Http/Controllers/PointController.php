<?php

namespace App\Http\Controllers;

use App\Helpers\ToastHelper;
use App\Http\Requests\PointRequest;
use App\Models\MountainMainPart;
use App\Models\MountainsSection;
use App\Models\Point;
use App\Repositories\PointRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class PointController extends Controller
{

    protected PointRepository $repository;

    public function __construct(PointRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index(): Response
    {
        return Inertia::render('Point/Index', [
            'points' => Point::where('user_id', Auth::id())->orwhere('is_global', true)->paginate(5),
            'mountainMainParts' => MountainMainPart::all(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Point::class);
        return Inertia::render('Point/Form', [
            'mountainMainParts' => MountainMainPart::all(),
            'lastPoint' => Point::latest()->first()
        ]);

    }

    public function edit(Point $point): Response
    {
        $this->authorize('update', [$point]);
        $point->load('mountainMainParts');
        return Inertia::render('Point/Form', [
            'point' => $point,
            'mountainMainPart' => MountainMainPart::all()
        ]);
    }

    public function update(Point $point, PointRequest $pointRequest): RedirectResponse
    {
        $this->authorize('update', $point);
        $this->repository->update($pointRequest, $point);
        return redirect()->route('point.index')->with(ToastHelper::update('point'));
    }

    public function store(PointRequest $pointRequest): RedirectResponse
    {
        $this->authorize('update', Point::class);
        $this->repository->create($pointRequest);
        return redirect()->route('point.index')->with(ToastHelper::create('point'));
    }

    public function getAll(): JsonResponse
    {
        $params = request()->query();
        $selectedMountainMainPart = $params['selectedMountainMain'] ?? null;
        if ($selectedMountainMainPart !== null) {
            $points = Point::whereIn('mountain_main_part_id', $selectedMountainMainPart)
                ->orderBy($params['sort'] ?? 'id', (int)$params['sortOrder'] >= 0 ? 'asc' : 'desc')
                ->paginate((int)$params['paginate'] ?? 15)
                ->appends(request()->query());
        } else {
            $points = Point::where('is_global', true)
                ->orderBy($params['sort'] ?? 'id', (int)$params['sortOrder'] >= 0 ? 'asc' : 'desc')
                ->when(array_key_exists('userId', $params), function ($query) use ($params) {
                    return $query->orWhere('user_id', $params['userId']);
                })
                ->paginate((int)$params['paginate'] ?? 15)
                ->appends(request()->query());
        }
        return response()->json($points);
    }

    public function removeAPI(Point $point): JsonResponse
    {
        $this->authorize('delete', $point);
        $this->repository->remove($point);
        return response()->json(['status' => 'ok']);
    }
}
