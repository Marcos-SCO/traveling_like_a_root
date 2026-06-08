<?php

namespace App\DTOs;

class TravelerDTO
{
    public function __construct(
        public readonly string $name,
        public readonly string $birthDate,
        public readonly array $additionals = [],
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            name: $data['name'],
            birthDate: $data['birth_date'],
            additionals: $data['additionals'] ?? [],
        );
    }
}
