<?php

namespace App\Http\Controllers;

use App\Http\Requests\PathRequest;
use App\Models\Path;
use App\Repositories\PathRepository;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PathController extends Controller
{

    protected PathRepository $repository;

    public function __construct(PathRepository $pathRepository)
    {
        $this->repository = $pathRepository;
    }


    public function index(): Response
    {
        return Inertia::render('Path/Index', [
            'path' => Path::paginate(5)
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Path/Form');
    }

    public function show(Path $path): Response
    {
        return Inertia::render('Path/index', [
            'path' => $path
        ]);
    }

    public function edit(Path $path): Response
    {
        return Inertia::render('Path/Form', [
            'path' => $path
        ]);
    }

    public function update(Path $path, PathRequest $pathRequest): RedirectResponse
    {
        $this->repository->update($pathRequest, $path);

        return redirect()->route('home')->with(['toast' => ['message' => __('path.create.toast'), 'type' => 'success']]);
    }

    public function store(PathRequest $request): RedirectResponse
    {
        $this->repository->create($request);

        return redirect()->route('home')->with(['toast' => ['message' => __('path.create.toast'), 'type' => 'success']]);
    }

}