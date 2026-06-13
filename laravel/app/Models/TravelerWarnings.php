<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TravelerWarnings extends Model
{
    protected $fillable = [
        'traveler_id',
        'warning_message',
    ];

    public function traveler()
    {
        return $this->belongsTo(Traveler::class);
    }
}
