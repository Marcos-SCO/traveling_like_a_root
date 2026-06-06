<?php

namespace App\Service;

use Carbon\Carbon;
use App\Enums\TravelZone;

use App\Support\GroupDiscountCalculator;
use App\Support\CalculateChargedDays;

use function Laravel\Prompts\number;

class QuoteService
{
    public function __construct(private TravelerQuoteCalculator $travelerQuoteCalculator) {}

    public function calculateTotal(array $data): array
    {
        $travelZone = TravelZone::from(mb_strtolower($data['travel_zone']));

        $travelers = $data['travelers'];
        $travelersCount = count($travelers);

        $groupPercentageDiscount = GroupDiscountCalculator::percentage($travelersCount);

        $startDate = Carbon::parse($data['start_date']);
        $endDate = Carbon::parse($data['end_date']);

        $chargedDays = CalculateChargedDays::getDays($startDate, $endDate);

        $travelersCalculatedCostData = $this->travelerQuoteCalculator->travelersCost($travelers, $travelZone, $startDate, $chargedDays);

        $totalGroupCost = $this->travelerQuoteCalculator->totalGroupCost($travelersCalculatedCostData);

        $totalEnd = $totalGroupCost - ($totalGroupCost * $groupPercentageDiscount);

        $allWarningMessages =
            $this->travelerQuoteCalculator->warningMessages($travelersCalculatedCostData);

        return [
            'travel_zone' => $travelZone,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'subtotal_amount' => $totalGroupCost,
            
            'charged_days' => $chargedDays,
            
            'travelers_calculated_cost_data' => $travelersCalculatedCostData,
            
            'warnings' =>  $allWarningMessages,

            'discount_amount' => $groupPercentageDiscount,
            'group_discount_percentage' => $groupPercentageDiscount * 100,
            'total_amount' => (int) round($totalEnd, 2),
        ];
    }

    public function formattedCalculatedArrayResponse(array $data): array
    {
        $travelersFormattedData =
            $this->travelerQuoteCalculator->travelersFormattedData($data['travelers_calculated_cost_data']);

        return [
            'charged_days' => $data['charged_days'],

            'travelers' => $travelersFormattedData,

            'warnings' =>  $data['warnings'],
            'group_discount_percentage' => $data['group_discount_percentage'],
            'total_amount' => $data['total_amount'],
        ];
    }
}
