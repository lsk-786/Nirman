import requests
import random
import time

API_KEY = "TWV8GX6FJSZK70TX"  # Replace with your actual ThingSpeak Write API Key
THINGSPEAK_URL = "https://api.thingspeak.com/update"

while True:
    temperature = round(random.uniform(20, 35), 2)  # Simulated temperature
    humidity = round(random.uniform(40, 80), 2)  # Simulated humidity
    gas_level = random.randint(200, 800)  # Simulated gas level

    payload = {
        "api_key": API_KEY,
        "field1": temperature,
        "field2": humidity,
        "field3": gas_level
    }

    response = requests.get(THINGSPEAK_URL, params=payload)

    if response.status_code == 200:
        print(f"Data Sent: Temp={temperature}°C, Humidity={humidity}%, Gas Level={gas_level}")
    else:
        print(f"Failed to send data: {response.status_code}")

    time.sleep(15)  # Send data every 15 seconds
