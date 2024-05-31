<?php

require 'shipping_calculator.php';

function test_shippingCalculator_validInputs()
{
    $calculator = new ShippingCalculatorService(5, 5.2);
    $result = json_decode($calculator->calculateShipping(), true);
    
    $cost = number_format((float)$result['cost'], 2, '.', '');
    assert($cost === "22.90", "Expected cost to be 22.90, got {$cost}");
    
    $delivery_time = $result['delivery_time'];
    assert($delivery_time === 5, "Expected delivery time to be 5 days, got {$delivery_time}");
}

function test_shippingCalculator_invalidQuantity()
{
    try {
        new ShippingCalculatorService(-5, 5.2);
        assert(false, "Expected InvalidArgumentException for negative quantity");
    } catch (InvalidArgumentException $e) {
        assert($e->getMessage() === "Invalid input: -5. It must be a positive number.", "Unexpected exception message: " . $e->getMessage());
    }
}

function test_shippingCalculator_invalidWeight()
{
    try {
        new ShippingCalculatorService(5, -5.2);
        assert(false, "Expected InvalidArgumentException for negative weight");
    } catch (InvalidArgumentException $e) {
        assert($e->getMessage() === "Invalid input: -5.2. It must be a positive number.", "Unexpected exception message: " . $e->getMessage());
    }
}

function test_shippingCalculator_zeroQuantity()
{
    try {
        new ShippingCalculatorService(0, 5.2);
        assert(false, "Expected InvalidArgumentException for zero quantity");
    } catch (InvalidArgumentException $e) {
        assert($e->getMessage() === "Invalid input: 0. It must be a positive number.", "Unexpected exception message: " . $e->getMessage());
    }
}

function test_shippingCalculator_zeroWeight()
{
    try {
        new ShippingCalculatorService(5, 0);
        assert(false, "Expected InvalidArgumentException for zero weight");
    } catch (InvalidArgumentException $e) {
        assert($e->getMessage() === "Invalid input: 0. It must be a positive number.", "Unexpected exception message: " . $e->getMessage());
    }
}

test_shippingCalculator_validInputs();
test_shippingCalculator_invalidQuantity();
test_shippingCalculator_invalidWeight();
test_shippingCalculator_zeroQuantity();
test_shippingCalculator_zeroWeight();

echo "All tests passed.\n";
