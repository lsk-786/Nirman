#include <WiFi.h>
#include <HTTPClient.h>
#include "DHT.h"

#define DHTPIN 4       // GPIO pin for DHT sensor
#define DHTTYPE DHT11  // Change to DHT22 if you're using it
#define GAS_SENSOR_PIN 34 // Analog pin for gas sensor

const char* ssid = "Your_SSID";
const char* password = "Your_PASSWORD";

const char* server = "http://api.thingspeak.com";
String apiKey = "Your_ThingSpeak_API_Key";

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi!");

  dht.begin();
}

void loop() {
  // Read sensors
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  int gasLevel = analogRead(GAS_SENSOR_PIN); // Simulated gas sensor reading

  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  Serial.println("Temperature: " + String(temperature) + "°C");
  Serial.println("Humidity: " + String(humidity) + "%");
  Serial.println("Gas Level: " + String(gasLevel));

  // Send data to ThingSpeak
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String url = server + "/update?api_key=" + apiKey +
                 "&field1=" + String(temperature) +
                 "&field2=" + String(humidity) +
                 "&field3=" + String(gasLevel);
    http.begin(url);
    int httpResponseCode = http.GET();
    if (httpResponseCode > 0) {
      Serial.println("Data sent to ThingSpeak!");
    } else {
      Serial.println("Error sending data.");
    }
    http.end();
  }

  delay(60000); // Update every 60 seconds
}
