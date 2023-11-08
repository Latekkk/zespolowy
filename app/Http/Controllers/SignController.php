<?php

namespace App\Http\Controllers;

use App\Helpers\ToastHelper;
use App\Http\Requests\SignRequest;
use App\Models\Badge;
use App\Models\Sign;
use App\Repositories\SignRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


class SignController extends Controller
{
    protected SignRepository $repository;

    public function __construct(SignRepository $signRepository)
    {
        $this->repository = $signRepository;
    }


    public function index(): Response
    {
        return Inertia::render('Sign/Index', [
            'sign' => Sign::with('photos')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Sign/Form');
    }

    public function show(Sign $sign): Response
    {
        return Inertia::render('Sign/index', [
            'sign' => $sign
        ]);
    }

    public function edit(Sign $sign): Response
    {
        return Inertia::render('Sign/Form', [
            'sign' => $sign->load('photos')
        ]);
    }

    public function update(Sign $sign, SignRequest $signRequest): RedirectResponse
    {
        $this->repository->update($signRequest, $sign);

        return redirect()->route('sign.index')->with(ToastHelper::update('sign'));
    }

    public function store(SignRequest $request): RedirectResponse
    {
        $this->repository->create($request);

        return redirect()->route('sign.index')->with(ToastHelper::create('sign'));
    }

    public function destroy(Sign $sign): RedirectResponse
    {
        $this->repository->remove($sign);

        return redirect()->route('sign.index')->with(ToastHelper::remove('sign'));
    }
}
