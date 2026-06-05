<?php

namespace App\Enums;

enum AdditionalCoverage: string
{
    case ADVENTURE_SPORTS = 'esportes_aventura';
    case BAGGAGE = 'bagagem';

    public function label(): string
    {
        return match ($this) {
            self::ADVENTURE_SPORTS => 'Esportes de Aventura',
            self::BAGGAGE => 'Bagagem',
        };
    }
}