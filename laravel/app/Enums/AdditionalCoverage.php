<?php

namespace App\Enums;

enum AdditionalCoverage: string
{
    case ADVENTURE_SPORTS = 'esportes_aventura';
    case BAGGAGE = 'bagagem';

    public static function hasValue(?string $value): bool
    {
        if (blank($value)) return false;

        return self::tryFrom($value) !== null;
    }

    public function label(): string
    {
        return match ($this) {
            self::ADVENTURE_SPORTS => 'Esportes de Aventura',
            self::BAGGAGE => 'Bagagem',
        };
    }
}