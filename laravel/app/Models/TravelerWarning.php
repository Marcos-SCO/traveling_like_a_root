<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TravelerWarning extends Model
{
    protected $fillable = [
        'quote_id',
        'traveler_id',
        'warning_message',
    ];

    public $timestamps = false;

    public function traveler()
    {
        return $this->belongsTo(Traveler::class);
    }
}
