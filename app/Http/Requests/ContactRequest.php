<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name'=> 'required|string|min:3|max:255',
            'title'=> 'required|string|min:5|max:255',
            'email'=> 'required_without:phone_number|email:rfc,dns|min:5|max:255',
            'phone_number'=> 'required_without:email|string|min:8|max:15',
            'description'=> 'required|string|min:10|max:255',
            'response'=> 'nullable|boolean'
        ];
    }
}
