<?php

namespace App\Service;

use Carbon\Carbon;
use App\Enums\TravelZone;

use App\Support\GroupDiscountCalculator;
use App\Support\CalculateChargedDays;

class QuoteService
{
    public function __construct(private TravelerQuoteCalculator $travelerQuoteCalculator) {}

    public function calculateTotal(array $data): array {
        $travelZone = TravelZone::from(mb_strtolower($data['travel_zone']));

        $travelers = $data['travelers'];
        $travelersCount = count($travelers);

        $groupPercentageDiscount = GroupDiscountCalculator::percentage($travelersCount);

        $startDate = Carbon::parse($data['start_date']);
        $endDate = Carbon::parse($data['end_date']);

        $chargedDays = CalculateChargedDays::getDays($startDate, $endDate);

        $travelersCost = $this->travelerQuoteCalculator->travelersCost($travelers, $travelZone, $startDate, $chargedDays);

        $totalGroupCost = $this->travelerQuoteCalculator->totalGroupCost($travelersCost);

        $totalEnd = $totalGroupCost - ($totalGroupCost * $groupPercentageDiscount);

        $travelersFormattedData =
            $this->travelerQuoteCalculator->travelersFormattedData($travelersCost);

        $allWarningMessages =
            $this->travelerQuoteCalculator->warningMessages($travelersCost);

        return [
            'charged_days' => $chargedDays,
            'travelers' => $travelersFormattedData,
            'warnings' =>  $allWarningMessages,
            'group_discount_percentage' => $groupPercentageDiscount * 100,
            'total_amount' => round($totalEnd, 2),
        ];
    }
}
