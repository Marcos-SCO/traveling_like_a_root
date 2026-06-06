<?php

namespace App\Enums;

enum TravelZone: string
{
    case NATIONAL = 'nacional';
    case AMERICAS = 'americas';
    case EUROPE = 'europa';

    public function dailyRate(): float
    {
        return match ($this) {
            self::NATIONAL => 10.00,
            self::AMERICAS => 16.00,
            self::EUROPE => 22.00,
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