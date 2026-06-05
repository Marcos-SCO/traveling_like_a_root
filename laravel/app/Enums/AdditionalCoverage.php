<?php

namespace App\Enums;

enum AdditionalCoverage: string
{
    case BAGGAGE = 'baggage';
    case ADVENTURE_SPORTS = 'adventure_sports';

    public function label(): string
    {
        return match ($this) {
            self::BAGGAGE => 'BAGAGEM',
            self::ADVENTURE_SPORTS => 'ESPORTES_AVENTURA',
        };
    }
}