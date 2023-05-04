<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class BadgeRequest extends FormRequest
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
     * @return array<string, Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|max:200|min:1',
            'point' => 'required|integer|max:200|min:3',
            'img_url' => $this->getImageUrl()
        ];
    }

    private function getImageUrl(): string
    {
        return $this->isMethod('POST')? 'required|image' : 'nullable|';
    }
}
