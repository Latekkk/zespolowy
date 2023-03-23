<?php

namespace App\Http\Controllers;

use App\Http\Requests\PointRequest;
use App\Models\Point;
use App\Models\Path;
use App\Repositories\PointRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Request;
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
        return Inertia::render('Point/Index', ['points' => Point::paginate(5)]);
    }

    public function create(): Response
    {
        return Inertia::render('Point/Form', []);
    }

    public function edit(Point $point): Response
    {
        return Inertia::render('Point/Form', ['point' => $point]);
    }

    public function Update(Point $point): Response
    {
        return Inertia::render('Point/Form', []);
    }

    public function store(PointRequest $pointRequest): RedirectResponse
    {
        $this->repository->create($pointRequest);

        return redirect()->route('home')->with(['toast' => ['message' => __('point.create.toast'), 'type' => 'success']]);
    }


    //api

    public function getAll(): JsonResponse
    {
        $params = request()->query();
        $points = Point::orderBy($params['sort']?? 'id', (int)$params['sortOrder'] >= 0? 'asc' : 'desc' )-> paginate((int)$params['paginate'] ?? 15)->appends(request()->query());
        return response()->json($points);
    }

    public function removeAPI(Point $point): JsonResponse
    {
        $this->repository->remove($point);
        return response()->json(['status' => 'ok']);
    }
}
