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
        return [
            'user_id' => 'required|exists:users,id',
            'mountain_section_id' => 'required|exists:mountain_sections,id',
            'points_mountain_section' => [
                'required',
                Rule::in(PointsMountainSectionEnum::toArray()),
                function ($attribute, $value, $fail) use ($userId, $mountainSectionId) {
                    $existingUserPoint = UserPoint::where('user_id', $userId)
                        ->where('mountain_section_id', $mountainSectionId)
                        ->where(function ($query) use ($value) {
                            $query->where('points_mountain_section', $value)
                                ->orWhere('status', '!=', 'rejected');
                        })
                        ->exists();

                    if ($existingUserPoint) {
                        $fail('The selected points_mountain_section is already assigned for this user and mountain section, or the previous record has not been rejected.');
                    }
                }
            ],
            'status' => [
                'required',
                Rule::in(StatusEnum::toArray()),
            ],
            'approved_id' => 'required|exists:users,id',
        ];
    }
}
