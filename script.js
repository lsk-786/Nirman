// Smart Agriculture AI Prediction
document.getElementById('ai-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const crop = document.getElementById('crop').value;
    const area = parseFloat(document.getElementById('area').value);
    const result = `Predicted demand for ${crop} is ${(area * 150).toFixed(2)} units.`;
    document.getElementById('ai-result').textContent = result;
    document.getElementById('ai-result').style.animation = 'fadeIn 1s ease-in-out';
  });
  
  // Marketplace Bidding System
  const bids = [
    { name: 'Distributor A', price: '₹20/kg' },
    { name: 'Distributor B', price: '₹22/kg' },
    { name: 'Distributor C', price: '₹19/kg' },
  ];
  const bidsList = document.getElementById('bids');
  if (bidsList) {
    bids.forEach((bid) => {
      const li = document.createElement('li');
      li.textContent = `${bid.name} is offering ${bid.price}`;
      bidsList.appendChild(li);
    });
  }
  
  // Food Waste Management
  document.getElementById('waste-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const quantity = parseFloat(document.getElementById('food-quantity').value);
    const expiry = parseInt(document.getElementById('expiry').value);
    const spoilageRate = expiry <= 2 ? 0.8 : expiry <= 5 ? 0.5 : 0.2;
    const result = `${(spoilageRate * quantity).toFixed(2)} kg may spoil soon. Redistribute!`;
    document.getElementById('waste-result').textContent = result;
  });
  
  
  // Fetch NGOs (Mock Data)
  const ngosList = document.getElementById('ngos');
  if (ngosList) {
    ngosList.innerHTML = '<li>NGO A: Contact - 1234567890</li><li>NGO B: Contact - 0987654321</li>';
  }
  
// OpenWeather API key (replace with your actual key)
const API_KEY = "6eeb197f3f85fb9b35e44188e6f12104";

// Population data for cities
const populationData = {
    Mumbai: 20411000,
    Delhi: 31181000,
    Bangalore: 12151000,
    Kolkata: 14859000,
    Chennai: 11324000,
};

// Function to calculate demand
function calculateDemand(cropAmount, temp, population) {
    const demandFactor = temp > 35 ? 0.8 : temp > 20 ? 0.6 : 0.4;
    const estimatedDemand = Math.ceil((population * demandFactor) / 1000);
    const surplusOrDeficit = cropAmount - estimatedDemand;

    return { estimatedDemand, surplusOrDeficit };
}

// Function to fetch data and predict demand
function predictDemand() {
    const cropName = document.getElementById("crop-name").value;
    const cropAmount = parseFloat(document.getElementById("crop-amount").value);
    const city = document.getElementById("city-select").value;

    // Validate inputs
    if (!cropName || isNaN(cropAmount) || cropAmount <= 0 || !city) {
        alert("Please enter valid crop details and select a city.");
        return;
    }

    // OpenWeather API URL
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    console.log("Fetching weather data for:", city);

    // Fetch weather data
    fetch(API_URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error("City not found or API error.");
            }
            return response.json();
        })
        .then((data) => {
            const temp = data.main.temp;
            const condition = data.weather[0].description;
            const population = populationData[city];

            console.log("Weather Data:", data);
            console.log(`Population of ${city}: ${population}`);

            // Calculate demand
            const { estimatedDemand, surplusOrDeficit } = calculateDemand(cropAmount, temp, population);

            // Display results
            document.getElementById("result").innerHTML = `
                <h3>Crop Demand Prediction Results</h3>
                <p><strong>Crop:</strong> ${cropName}</p>
                <p><strong>City:</strong> ${city}</p>
                <p><strong>Current Population:</strong> ${population.toLocaleString()}</p>
                <p><strong>Weather:</strong> ${temp}°C, ${condition}</p>
                <p><strong>Estimated Demand:</strong> ${estimatedDemand} kg</p>
                <p><strong>Surplus/Deficit:</strong> ${
                    surplusOrDeficit > 0
                        ? `${surplusOrDeficit} kg surplus`
                        : `${Math.abs(surplusOrDeficit)} kg deficit`
                }</p>
            `;
        })
        .catch((error) => {
            console.error("Error:", error.message);
            document.getElementById("result").innerHTML = `
                <p style="color: red;">Error: ${error.message}. Please check your inputs.</p>
            `;
        });
}

// Add event listener to button
document.getElementById("predict-button").addEventListener("click", predictDemand);
