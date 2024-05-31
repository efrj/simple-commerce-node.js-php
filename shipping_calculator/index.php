<?php

require 'shipping_calculator.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

try {
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit();
    }

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Only POST requests are allowed');
    }

    $postData = json_decode(file_get_contents('php://input'), true);

    if (!isset($postData['quantity']) || !isset($postData['weight'])) {
        throw new InvalidArgumentException('Both quantity and weight are required.');
    }

    $quantity = $postData['quantity'];
    $weight = $postData['weight'];

    $shippingCalculator = new ShippingCalculatorService($quantity, $weight);
    $shippingEstimate = $shippingCalculator->calculateShipping();

    echo $shippingEstimate;
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['error' => $e->getMessage()]);
}
