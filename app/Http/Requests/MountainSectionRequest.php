<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class MountainSectionRequest extends FormRequest
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
            'name'=> 'required|max:200|min:3',
            'start_point' => 'required|different:end_point|exists:points,id',
            'end_point' => 'required|different:start_point|exists:points,id',
            'entry_points'=> 'required|integer|min:1',
            'points_for_descent'=> 'required|integer|min:1',
        ];
    }
}
