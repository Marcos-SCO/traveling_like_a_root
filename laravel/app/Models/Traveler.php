<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Traveler extends Model
{
    use HasFactory;

    public function quote()
    {
        return $this->belongsTo(Quote::class);
    }

    public function additionals()
    {
        return $this->hasMany(TravelerAdditional::class);
    }
}
