<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class PointRequest extends FormRequest
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
            'name' => 'required',
            'markers' => 'required|array|min:1',
            'markers.*.lat' => 'required',
            'markers.*.lng' => 'required',
            'mountainMainParts' => 'required|array|min:1',
            'mountainMainParts.*.id' => 'required|exists:mountain_main_parts,id',
        ];
    }
}
