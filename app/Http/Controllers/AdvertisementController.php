<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdvertisementRequest;
use App\Models\Advertisement;
use App\Repositories\AdvertisementRepository;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AdvertisementController extends Controller
{
    protected AdvertisementRepository $repository;

    public function __construct(AdvertisementRepository $advertisementRepository)
    {
        $this->repository = $advertisementRepository;
    }


    public function index(): Response
    {
        return Inertia::render('Advertisement/Index', [
            'advertisements' => Advertisement::paginate(5)
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Advertisement/Form');
    }

    public function show(Advertisement $advertisement): Response
    {
        return Inertia::render('Advertisement/index', [
            'advertisement' => $advertisement
        ]);
    }

    public function edit(Advertisement $advertisement): Response
    {
        return Inertia::render('Advertisement/Form', [
            'advertisement' => $advertisement
        ]);
    }

    public function update(Advertisement $advertisement, AdvertisementRequest $advertisementRequest): RedirectResponse
    {
        $this->repository->update($advertisementRequest, $advertisement);

        return redirect()->route('home')->with(['toast' => ['message' => __('advertisement.create.toast'), 'type' => 'success']]);
    }

    public function store(AdvertisementRequest $request): RedirectResponse
    {
        $this->repository->create($request);

        return redirect()->route('home')->with(['toast' => ['message' => __('advertisement.create.toast'), 'type' => 'success']]);
    }
}
