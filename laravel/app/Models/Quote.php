<?php

namespace App\Models;

use App\Enums\TravelZone;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quote extends Model
{
    use HasFactory;

    protected $casts = [
        'travel_zone' => TravelZone::class,
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    protected $fillable = [
        'travel_zone',
        'start_date',
        'end_date',
        'charged_days',
        'group_discount_percentage',
        'subtotal_amount',
        'discount_amount',
        'total_amount',
    ];

    public function travelers()
    {
        return $this->hasMany(Traveler::class);
    }
}
