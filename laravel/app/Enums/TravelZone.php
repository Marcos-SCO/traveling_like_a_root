<?php

namespace App\Enums;

enum TravelZone: string
{
    case NATIONAL = 'nacional';
    case AMERICAS = 'americas';
    case EUROPE = 'europa';

    public static function hasValue(?string $value): bool
    {
        if (blank($value)) return false;

        return self::tryFrom($value) !== null;
    }

    public function dailyRate(): float
    {
        return match ($this) {
            self::NATIONAL => 10,
            self::AMERICAS => 16,
            self::EUROPE => 22,
        };
    }

    public function label(): string
    {
        return match ($this) {
            self::NATIONAL => 'Nacional',
            self::AMERICAS => 'Américas',
            self::EUROPE => 'Europa',
        };
    }
}
