<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Models\Contact;
use App\Repositories\ContactRepository;
use Illuminate\Auth\Access\AuthorizationException;
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

        return redirect()->route('home')->with(['toast' => ['message' => __('contact.create.toast'), 'type' => 'success']]);
    }

    public function store(ContactRequest $request): RedirectResponse
    {

        $this->repository->create($request);

        return redirect()->route('home')->with(['toast' => ['message' => __('contact.create.toast'), 'type' => 'success']]);
    }
}
