<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class QuoteResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'travel_zone' => $this->travel_zone,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'charged_days' => $this->charged_days,
            'total_amount' => $this->total_amount,

            'travelers' => $this->whenLoaded('travelers', function () {
                return $this->travelers->map(function ($traveler) {
                    return [
                        'id' => $traveler->id,
                        'name' => $traveler->name,
                        'birth_date' => $traveler->birth_date,
                        'subtotal_amount' => $traveler->subtotal_amount,

                        'additionals' => $traveler->additionals->map(function ($add) {
                            return [
                                'coverage_code' => $add->coverage_code,
                                'amount' => $add->amount,
                            ];
                        }),
                    ];
                });
            }),
        ];
    }
}
