<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Traveler extends Model
{
    use HasFactory;

    protected $fillable = [
        'quote_id',
        'name',
        'birth_date',
        'age_at_trip',
        'age_multiplier',
        'base_amount',
        'additionals_amount',
        'subtotal_amount',
    ];

    public function quote()
    {
        return $this->belongsTo(Quote::class);
    }

    public function additionals()
    {
        return $this->hasMany(TravelerAdditional::class);
    }
    
    public function warnings()
    {
        return $this->hasMany(TravelerWarning::class);
    }
}
