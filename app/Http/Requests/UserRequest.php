<?php

namespace App\Http\Requests;

use App\Enums\UserRolesEnum;
use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {


//        TODO: Napisz ładny request, zrobic request do roli
        return [
            'name' => 'required|max:200|min:3',
            'email' => 'required|email|max:200|min:3',
        ];
    }
}
