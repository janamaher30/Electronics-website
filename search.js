document.addEventListener('DOMContentLoaded', function() {  
  const searchBox = document.querySelector('.search-box');
  const searchResults = document.querySelector('.search-results');
  if (searchBox) {
    searchBox.parentNode.appendChild(searchResults);
    function updateSearchResultsPosition() {
      const searchBoxRect = searchBox.getBoundingClientRect();
      const searchResultsWidth = 300; 
      searchResults.style.top = (searchBoxRect.bottom + window.scrollY + 5) + 'px'; 
      searchResults.style.width = `${searchBoxRect.width}px`; 
    }
    updateSearchResultsPosition();
    window.addEventListener('resize', updateSearchResultsPosition);
  }
  const products = [
    { name: "Resistor 100 kilo ohm", price: "30 L.E", category: "Components", page: "section1.html" },
    { name: "Wires (40 pieces)", price: "40 L.E", category: "Components", page: "section1.html" },
    { name: "Breadboard 200 points", price: "60 L.E", category: "Components", page: "section1.html" },
    { name: "Resistor 1 kilo ohm", price: "10 L.E", category: "Components", page: "section1.html" },
    { name: "Resistor 220 ohm / 0.5 watt", price: "50 L.E", category: "Components", page: "section1.html" },
    { name: "Resistor 220 ohm", price: "35 L.E", category: "Components", page: "section1.html" },
    { name: "Resistor 2.2 kilo ohm", price: "25 L.E", category: "Components", page: "section1.html" },
    { name: "Resistor 10 kilo ohm", price: "30 L.E", category: "Components", page: "section1.html" },
    
    // Diodes, Transistors, Capacitors - Section 2
    { name: "Diodes (1N4007)", price: "1.0 L.E", category: "Diodes", page: "section2.html" },
    { name: "Zener Diodes (5.1V/0.5W)", price: "2.0 L.E", category: "Diodes", page: "section2.html" },
    { name: "Photo Diodes (BP333)", price: "1.0 L.E", category: "Diodes", page: "section2.html" },
    { name: "Ceramic Capacitors (0.01uF)", price: "1.0 L.E", category: "Capacitors", page: "section2.html" },
    { name: "Transistor (BC547)", price: "1.0 L.E", category: "Transistors", page: "section2.html" },
    { name: "Transistor (BC557)", price: "1.0 L.E", category: "Transistors", page: "section2.html" },
    { name: "Ceramic Capacitor (0.1uF)", price: "1.0 L.E", category: "Capacitors", page: "section2.html" },
    { name: "Electrolytic Capacitor (4.7 uF)", price: "10.0 L.E", category: "Capacitors", page: "section2.html" },
    { name: "Ultra Super Capacitor (30 F)", price: "5.0 L.E", category: "Capacitors", page: "section2.html" },
    { name: "Mica Capacitor (7.5 nF)", price: "10 L.E", category: "Capacitors", page: "section2.html" },
    
    // Switches, Relay Switches, Push Buttons - Section 3
    { name: "SW4 - ON/OFF/ON Switch", price: "10.00 L.E", category: "Switches", page: "section3.html" },
    { name: "SW2 - ON-OFF Switch", price: "5.00 L.E", category: "Switches", page: "section3.html" },
    { name: "SW1 - ON/OFF Switch With LED", price: "10.00 L.E", category: "Switches", page: "section3.html" },
    { name: "Metal Switch On/Off 12mm", price: "125.00 L.E", category: "Switches", page: "section3.html" },
    { name: "Metal Switch On/Off 16mm", price: "145.00 L.E", category: "Switches", page: "section3.html" },
    { name: "Metal Switch 22mm Waterproof", price: "160.00 L.E", category: "Switches", page: "section3.html" },
    { name: "Switch 16mm Wire Plug Connector", price: "38.00 L.E", category: "Switches", page: "section3.html" },
    { name: "General Purpose Relay SPDT", price: "15.00 L.E", category: "Relay Switches", page: "section3.html" },
    { name: "SONGLE Power Relay 2-Ch", price: "50.00 L.E", category: "Relay Switches", page: "section3.html" },
    { name: "Push Button 4Pin", price: "0.75 L.E", category: "Push Buttons", page: "section3.html" },
    { name: "Push Button 2pins", price: "0.75 L.E", category: "Push Buttons", page: "section3.html" },
    { name: "Push Button Long 4Pin", price: "2.00 L.E", category: "Push Buttons", page: "section3.html" },
    
    // LEDs, Batteries, ICs - Section 4
    { name: "LED Bulb", price: "7 L.E", category: "LEDs", page: "section4.html" },
    { name: "100 pcs colored LEDs", price: "100 L.E", category: "LEDs", page: "section4.html" },
    { name: "Transparent LED", price: "5 L.E", category: "LEDs", page: "section4.html" },
    { name: "Blue LED", price: "6 L.E", category: "LEDs", page: "section4.html" },
    { name: "20 pcs transparent LEDs", price: "30 L.E", category: "LEDs", page: "section4.html" },
    { name: "Battery 9V", price: "40 L.E", category: "Batteries", page: "section4.html" },
    { name: "Battery 6V", price: "40 L.E", category: "Batteries", page: "section4.html" },
    { name: "Battery 9V Rechargeable", price: "60 L.E", category: "Batteries", page: "section4.html" },
    { name: "TDA0161DP", price: "60 L.E", category: "ICs", page: "section4.html" },
    { name: "CD4070 BE", price: "25 L.E", category: "ICs", page: "section4.html" },
    { name: "TOP258PN", price: "40 L.E", category: "ICs", page: "section4.html" },
    { name: "HT12D Decoder", price: "40 L.E", category: "ICs", page: "section4.html" },
    { name: "74125", price: "20 L.E", category: "ICs", page: "section4.html" },
    
    // Sensors, Motors, Buzzers - Section 5
    { name: "Waterproof DS18B20", price: "35 LE", category: "Sensors", page: "section5.html" },
    { name: "Temperature Sensor", price: "15 LE", category: "Sensors", page: "section5.html" },
    { name: "Vibration Sensor", price: "20 LE", category: "Sensors", page: "section5.html" },
    { name: "Motion Sensor", price: "200 LE", category: "Sensors", page: "section5.html" },
    { name: "DC Motor", price: "150 LE", category: "Motors", page: "section5.html" },
    { name: "Stepper Motor Driver", price: "15 LE", category: "Motors", page: "section5.html" },
    { name: "DC Motors & Gearheads", price: "100 LE", category: "Motors", page: "section5.html" },
    { name: "DC Geared Motor", price: "96 LE", category: "Motors", page: "section5.html" },
    { name: "Passive Electronic Alarm Buzzer", price: "25 LE", category: "Buzzers", page: "section5.html" },
    { name: "Game Show Buzzer System", price: "100 LE", category: "Buzzers", page: "section5.html" },
    { name: "Active Buzzers", price: "25 LE", category: "Buzzers", page: "section5.html" },
    { name: "Mini Piezo Buzzer", price: "20 LE", category: "Buzzers", page: "section5.html" },
    { name: "Answer Buzzers", price: "19 LE", category: "Buzzers", page: "section5.html" }
  ];
  function performSearch(targetproduct) {
    const results = products.filter(product => 
      product.name.toLowerCase().includes(targetproduct.toLowerCase()) ||
      product.category.toLowerCase().includes(targetproduct.toLowerCase())
    );
    searchResults.innerHTML = '';
    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-item" style="padding: 10px; text-align: center;"> this product is not  available "</div>';
      searchResults.style.display = 'block';
      return;
    }
    results.forEach(product => {
      const resultItem = document.createElement('div');
      resultItem.className = 'search-item';
      resultItem.style.padding = '10px';
      resultItem.style.borderBottom = '1px solid #333';
      resultItem.style.cursor = 'pointer';
      
      const productName = document.createElement('div');
      productName.style.fontWeight = 'bold';
      productName.textContent = product.name;
      
      const productPrice = document.createElement('div');
      productPrice.style.fontSize = '0.9em';
      productPrice.style.color = '#999';
      productPrice.textContent = product.price;
      
      const productCategory = document.createElement('div');
      productCategory.style.fontSize = '0.8em';
      productCategory.style.color = '#777';
      productCategory.textContent = product.category;
      
      resultItem.appendChild(productName);
      resultItem.appendChild(productPrice);
      resultItem.appendChild(productCategory);
      
      resultItem.addEventListener('mouseover', function() {
        this.style.backgroundColor = document.body.classList.contains('light') ? '#ddd' : '#132238';
      });
      
      resultItem.addEventListener('mouseout', function() {
        this.style.backgroundColor = '';
      });
      
      resultItem.addEventListener('click', function() {
        window.location.href = product.page;
      });
      
      searchResults.appendChild(resultItem);
    });
    
    searchResults.style.display = 'block';
    
    updateSearchResultsPosition();
  }
  
  if (searchBox) {
    searchBox.addEventListener('input', function() {
      performSearch(searchBox.value);
    });
    
    document.addEventListener('click', function(event) {
      if (!searchBox.contains(event.target) && !searchResults.contains(event.target)) {
        searchResults.style.display = 'none';
      }
    });
    
  }
});