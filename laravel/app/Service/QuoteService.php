<?php

namespace App\Service;

use App\DTOs\QuoteDTO;
use Carbon\Carbon;
use App\Enums\TravelZone;

use App\Support\GroupDiscountCalculator;
use App\Support\CalculateChargedDays;

use function Laravel\Prompts\number;

class QuoteService
{
    public function __construct(private TravelerQuoteCalculator $travelerQuoteCalculator) {}

    public function calculateTotal(QuoteDTO $data): array
    {
        $travelZone = TravelZone::from(mb_strtolower($data->travelZone));

        $travelers = (array) $data->travelers;
        $travelersCount = count($travelers);

        $groupPercentageDiscount = GroupDiscountCalculator::percentageNumber($travelersCount);

        $startDate = Carbon::parse($data->startDate);
        $endDate = Carbon::parse($data->endDate);

        $chargedDays = CalculateChargedDays::getDays($startDate, $endDate);

        $travelersCalculatedCostData = $this->travelerQuoteCalculator->travelersCost($travelers, $travelZone, $startDate, $chargedDays);

        $totalGroupCost = $this->travelerQuoteCalculator->totalGroupCost($travelersCalculatedCostData);

        $allWarningMessages =
            $this->travelerQuoteCalculator->warningMessages($travelersCalculatedCostData);

        $groupPercentageCalculation = ($totalGroupCost * $groupPercentageDiscount) / 100;

        $totalEnd = $totalGroupCost - $groupPercentageCalculation;

        return [
            'travel_zone' => $travelZone,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'subtotal_amount' => $totalGroupCost,

            'charged_days' => $chargedDays,

            'travelers_calculated_cost_data' => $travelersCalculatedCostData,

            'warnings' =>  $allWarningMessages,

            'discount_amount' => round($groupPercentageCalculation, 2),
            'group_discount_percentage' => $groupPercentageDiscount,
            'total_amount' => round($totalEnd, 2),
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
