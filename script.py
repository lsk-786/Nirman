import requests
import random
import time

API_KEY = "TWV8GX6FJSZK70TX"  # Replace with your actual ThingSpeak Write API Key
THINGSPEAK_URL = "https://api.thingspeak.com/update"

while True:
    temperature = round(random.uniform(20, 35), 2)  # Simulated temperature
    humidity = round(random.uniform(40, 80), 2)  # Simulated humidity
    gas_level = random.randint(200, 800)  # Simulated gas level
    soil_moisture = round(random.uniform(10, 50), 2)  # Simulated soil moisture

    payload = {
        "api_key": API_KEY,
        "field1": temperature,
        "field2": humidity,
        "field3": gas_level,
        "field4": soil_moisture  # Using field4 for soil moisture
    }

    response = requests.post(THINGSPEAK_URL, params=payload)

    if response.status_code == 200:
        print(f"Data Sent: Temp={temperature}°C, Humidity={humidity}%, Gas Level={gas_level}, Soil Moisture={soil_moisture}%")
    else:
        print(f"Failed to send data: {response.status_code}, Response: {response.text}")

    time.sleep(15)  # Send data every 15 seconds

