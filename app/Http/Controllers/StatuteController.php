<?php

namespace App\Http\Controllers;

use App\Helpers\ToastHelper;
use App\Http\Requests\StatuteRequest;
use App\Models\Statute;
use App\Repositories\StatuteRepository;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class StatuteController extends Controller
{
    protected StatuteRepository $repository;

    public function __construct(StatuteRepository $statuteRepository)
    {
        $this->repository = $statuteRepository;
    }


    public function index(): Response
    {
        return Inertia::render('Statute/Index', [
            'statute' => Statute::paginate(1)
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Statute::class);
        return Inertia::render('Statute/Form');
    }

    public function show(Statute $statute): Response
    {
        return Inertia::render('Statute/index', [
            'statute' => $statute
        ]);
    }

    public function edit(Statute $statute): Response
    {
        $this->authorize('update', Statute::class);
        return Inertia::render('Statute/Form', [
            'statute' => $statute
        ]);
    }

    public function update(Statute $statute, StatuteRequest $statuteRequest): RedirectResponse
    {
        $this->authorize('update', Statute::class);
        $this->repository->update($statuteRequest, $statute);
        return redirect()->route('statute.index')->with(ToastHelper::update('statue'));
    }

    public function store(StatuteRequest $request): RedirectResponse
    {
        $this->authorize('update', Statute::class);
        $this->repository->create($request);
        return redirect()->route('statute.index')->with(ToastHelper::create('statue'));
    }
}
