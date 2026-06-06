<?php

namespace App\Models;

use App\Enums\AdditionalCoverage;
use Illuminate\Database\Eloquent\Model;

class TravelerAdditional extends Model
{
    protected $casts = [
        'coverage_code' => AdditionalCoverage::class,
    ];

    protected $fillable = [
        'traveler_id',
        'coverage_code',
        'amount',
    ];

    public function traveler()
    {
        return $this->belongsTo(Traveler::class);
    }
}
