<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class SignRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'hiking_trail' => 'required|max:200|min:3',
            'img_url' => $this->getImageUrl(),
            'description' => 'required|max:10000',
        ];
    }

    private function getImageUrl(): string
    {
        return $this->isMethod('POST')? 'required|image' : 'nullable|';
    }
}
