<?php

namespace App\Http\Controllers;

use App\Helpers\ToastHelper;
use App\Http\Requests\ContactRequest;
use App\Models\Contact;
use App\Models\Path;
use App\Repositories\ContactRepository;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    protected ContactRepository $repository;

    public function __construct(ContactRepository $contactRepository)
    {
        $this->repository = $contactRepository;
    }


    public function index(): Response
    {
        return Inertia::render('Contact/Index', [
            'contacts' => Contact::paginate(15)
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Contact/Form');
    }

    public function show(Contact $contact): Response
    {
        return Inertia::render('Contact/index', [
            'contact' => $contact
        ]);
    }

    public function edit(Contact $contact): Response
    {
        return Inertia::render('Contact/Form', [
            'contact' => $contact
        ]);
    }

    public function update(Contact $contact, ContactRequest $contactRequest): RedirectResponse
    {
        $this->repository->update($contactRequest, $contact);

        return redirect()->route('home')->with(ToastHelper::update('contact'));
    }

    public function store(ContactRequest $request): RedirectResponse
    {

        $this->repository->create($request);

        return redirect()->route('home')->with(ToastHelper::create('contact'));
    }

    public function getAll(): JsonResponse
    {
        $params = request()->query();
        $paths = Contact::where('response', $params['responseSwitch'] !== 'true' ? 1 : 0)->orderBy($params['sort']?? 'id', (int)$params['sortOrder'] >= 0? 'asc' : 'desc' )->paginate((int)$params['paginate'] ?? 15);
        return response()->json($paths);
    }

    public function removeAPI(Contact $contact): JsonResponse
    {
        $this->repository->remove($contact);
        return response()->json(['status' => 'ok']);
    }

    public function setResponseFromApi(Contact $contact): JsonResponse
    {
        $this->repository->setResponse($contact);
        return response()->json(['status' => 'ok']);
    }
}
