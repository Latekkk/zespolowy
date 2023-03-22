<?php

namespace App\Repositories;

use App\Http\Requests\ContactRequest;
use App\Models\Contact;

class ContactRepository
{
    protected Contact $model;

    public function __construct(Contact $model)
    {
        $this->model = $model;
    }

    public function create(ContactRequest $request): void
    {
        $this->model->create(array_merge($request->all()));
    }

    public function update(ContactRequest $request, Contact $contact): void
    {
        $contact->update(array_merge($request->all()));
    }

    public function remove(Contact $contact): void
    {
        $contact->delete();
    }
}
