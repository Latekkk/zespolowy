<?php

namespace App\Http\Controllers;


use App\Helpers\ToastHelper;
use App\Http\Requests\SquadRequest;
use App\Models\Squad;
use App\Repositories\SquadRepository;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class SquadController extends Controller
{
    protected SquadRepository $repository;

    public function __construct(SquadRepository $squadRepository)
    {
        $this->repository = $squadRepository;
    }


    public function index(): Response
    {
        return Inertia::render('Squad/Index', [
            'squad' => Squad::paginate(1)
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Squad::class);
        return Inertia::render('Squad/Form');
    }

    public function show(Squad $squad): Response
    {
        return Inertia::render('Squad/index', [
            'squad' => $squad
        ]);
    }

    public function edit(Squad $squad): Response
    {
        $this->authorize('update', Squad::class);
        return Inertia::render('Squad/Form', [
            'squad' => $squad
        ]);
    }

    public function update(Squad $squad, SquadRequest $squadRequest): RedirectResponse
    {
        $this->authorize('update', Squad::class);
        $this->repository->update($squadRequest, $squad);
        return redirect()->route('squad.index')->with(ToastHelper::update('squad'));
    }

    public function store(SquadRequest $request): RedirectResponse
    {
        $this->authorize('update', Squad::class);
        $this->repository->create($request);
        return redirect()->route('squad.index')->with(ToastHelper::create('squad'));
    }
}
