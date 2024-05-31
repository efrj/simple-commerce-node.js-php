<?php

class ShippingCalculatorService {
    public $quantity;
    public $weight;

    public function __construct($quantity, $weight)
    {
        $this->quantity = $this->validateInput($quantity);
        $this->weight = $this->validateInput($weight);
    }

    public function calculateShipping()
    {
        $shippingEstimate = $this->getShippingEstimateFromExternalService($this->quantity, $this->weight);
        return json_encode($shippingEstimate);
    }

    protected function getShippingEstimateFromExternalService($quantity, $weight)
    {
        $baseCost = 5.00;
        $costPerKg = 2.00;
        $costPerItem = 1.50;

        $cost = $baseCost + ($weight * $costPerKg) + ($quantity * $costPerItem);
        
        $baseDeliveryTime = 2;
        $additionalTime = ceil($weight / 5) + ceil($quantity / 10);

        $deliveryTime = $baseDeliveryTime + $additionalTime;

        return [
            'cost' => number_format($cost, 2),
            'delivery_time' => $deliveryTime
        ];
    }

    protected function validateInput($input)
    {
        if (!is_numeric($input) || $input <= 0) {
            throw new InvalidArgumentException("Invalid input: $input. It must be a positive number.");
        }
        return $input;
    }
}
?>