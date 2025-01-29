<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $food_type = $_POST['food_type'];
    $quantity = $_POST['quantity'];
    $pickup_date = $_POST['pickup_date'];
    $address = $_POST['address'];

    // Database Connection
    $conn = new mysqli("localhost", "root", "", "food_optimization");

    if ($conn->connect_error) {
        die("Database Connection Failed: " . $conn->connect_error);
    }

    $sql = "INSERT INTO food_donations (name, food_type, quantity, pickup_date, address) 
            VALUES ('$name', '$food_type', '$quantity', '$pickup_date', '$address')";

    if ($conn->query($sql) === TRUE) {
        echo "<script>alert('Donation Successful! Our team will contact you soon.'); window.location.href='../waste_management.html';</script>";
    } else {
        echo "Error: " . $conn->error;
    }

    $conn->close();
}
?>
