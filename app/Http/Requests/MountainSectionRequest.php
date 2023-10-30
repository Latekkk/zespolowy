<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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
        if ($this->route('mountainSection') === null) {
            $nameRule = 'required|max:200|min:3|unique:mountain_sections,name,'.$this->name;
        } else {
            $nameRule = 'required|max:200|min:3|unique:mountain_sections,name,' . $this->route('mountainSection')->id;
        }

        return [
            'name' => $nameRule,
            'start_point' => 'required|different:end_point|exists:points,id',
            'end_point' => 'required|different:start_point|exists:points,id',
            'entry_points' => 'required|integer|min:1',
            'points_for_descent' => 'required|integer|min:1',
            'start_end_points' => [
                function ($attribute, $value, $fail) {
                    $exists = DB::table('mountain_sections')
                        ->where('start_point', '=', request()->input('end_point'))
                        ->where('end_point', '=', request()->input('start_point'))
                        ->exists();
                    if ($exists) {
                        $fail('The start and end points combination already exists.');
                    }
                },
            ],
            'mountain_main_part_id' => 'required'
        ];
    }
}
