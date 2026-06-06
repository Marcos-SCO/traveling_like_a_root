<?php

namespace App\Models;

use App\Enums\AdditionalCoverage;
use Illuminate\Database\Eloquent\Model;

class TravelerAdditional extends Model
{
    protected $casts = [
        'coverage_code' => AdditionalCoverage::class,
    ];
}
