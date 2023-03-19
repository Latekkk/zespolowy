<?php

namespace App\Http\Controllers;

use App\Http\Requests\PointRequest;
use App\Models\Point;
use App\Repositories\PointRepository;
use Illuminate\Http\RedirectResponse;
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

    public function Update(Point $point): Response
    {
        return Inertia::render('Point/Form', []);
    }

    public function store(PointRequest $pointRequest): RedirectResponse
    {
        $this->repository->create($pointRequest);

        return redirect()->route('home')->with(['toast' => ['message' => __('point.create.toast'), 'type' => 'success']]);
    }
}
