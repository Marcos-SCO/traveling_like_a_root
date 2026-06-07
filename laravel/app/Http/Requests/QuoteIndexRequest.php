<?php

namespace App\Http\Requests;

use App\Enums\TravelZone;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class QuoteIndexRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'travel_zone' => ['nullable', Rule::enum(TravelZone::class)],
            'start_date'  => ['nullable', 'date_format:Y-m-d'],
            'end_date'    => ['nullable', 'date_format:Y-m-d'],
            'cursor'      => ['nullable', 'string'],
        ];
    }
}
