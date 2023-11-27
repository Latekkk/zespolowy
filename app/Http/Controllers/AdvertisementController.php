<?php

namespace App\Http\Controllers;

use App\Helpers\ToastHelper;
use App\Http\Requests\AdvertisementRequest;
use App\Models\Advertisement;
use App\Repositories\AdvertisementRepository;
use Illuminate\Http\RedirectResponse;
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
            'advertisements' => Advertisement::orderByDesc("time_from")->paginate(5)
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Advertisement::class);
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
        $this->authorize('update', Advertisement::class);
        return Inertia::render('Advertisement/Form', [
            'advertisement' => $advertisement
        ]);
    }

    public function update(Advertisement $advertisement, AdvertisementRequest $advertisementRequest): RedirectResponse
    {
        $this->authorize('update', Advertisement::class);
        $this->repository->update($advertisementRequest, $advertisement);
        return redirect()->route('home')->with(ToastHelper::update('advertisement'));
    }

    public function store(AdvertisementRequest $request): RedirectResponse
    {
        $this->authorize('update', Advertisement::class);
        $this->repository->create($request);
        return redirect()->route('home')->with(ToastHelper::create('advertisement'));
    }
    public function destroy(Advertisement $advertisement): RedirectResponse
    {
        $this->repository->remove($advertisement);
        return to_route('advertisment.index')->with(ToastHelper::remove('advertisement'));;
    }
}
