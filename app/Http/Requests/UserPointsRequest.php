<?php

namespace App\Http\Requests;

use App\Enums\PointsMountainSectionEnum;
use App\Enums\StatusEnum;
use App\Models\UserPoints;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UserPointsRequest extends FormRequest
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
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        $user_id = $this->user_id;
        $mountainSectionId =  $this->mountain_section_id;
        
        return [
            'user_id' => 'required|exists:users,id',
            'mountain_section_id' => 'required|exists:mountain_sections,id',
            'points_mountain_section' => 'required|array|',
            'points_mountain_section.*' => [
                Rule::in(PointsMountainSectionEnum::toArray()),
                function ($attribute, $value, $fail) use ($user_id, $mountainSectionId) {
                    $existingUserPoint = UserPoints::where('user_id', $user_id)
                        ->where('mountain_section_id', $mountainSectionId)
                        ->where(function ($query) use ($value) {
                            $query->where('points_mountain_section', $value)
                                ->orWhere('status', '!=', 'rejected');
                        })
                        ->exists();

                    if ($existingUserPoint) {
                        $fail('Wybrany points_mountain_section jest już przypisany dla tego użytkownika i sekcji górskiej lub poprzedni rekord nie został odrzucony.');
                    }
                }
            ],
            'status' => [
                'required',
                Rule::in(StatusEnum::toArray()),
            ],
            'approved_id' => 'nullable|exists:users,id',
        ];
    }
}
