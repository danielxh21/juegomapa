document.addEventListener("DOMContentLoaded", function() {
    const auctionList = document.getElementById('auction-list');
    const budgetDisplay = document.getElementById('budget');
    const nextCarButton = document.getElementById('next-car-button');

    // Definición de los autos con múltiples imágenes y detalles
    const cars = [
        { 
            id: 1, 
            images: ['images/car1_1.jpg', 'images/car1_2.jpg', 'images/car1_3.jpg', 'images/car1_4.jpg', 'images/car1_5.jpg', 'images/car1_6.jpg', 'images/car1_7.jpg', 'images/car1_8.jpg'], 
            brand: 'Toyota', 
            model: 'Corolla', 
            year: 2020, 
            highestBid: 5000, 
            info: `
                <div class="detail-item"><span class="label">Número de lote:</span><span class="value">62036244</span></div>
                <div class="detail-item"><span class="label">ID vehicular (VIN):</span><span class="value">JTDS4RCE3LJ******</span></div>
                <div class="detail-item"><span class="label">Código de título:</span><span class="value">FL - CERT OF TITLE-REBUILT (P)</span></div>
                <div class="detail-item"><span class="label">Odómetro:</span><span class="value">23,328 mi (ACTUAL)</span></div>
                <div class="detail-item"><span class="label">Daño principal:</span><span class="value">MINOR DENT/SCRATCHES</span></div>
                <div class="detail-item"><span class="label">Cilindros:</span><span class="value">4</span></div>
                <div class="detail-item"><span class="label">Color:</span><span class="value">BLACK</span></div>
                <div class="detail-item"><span class="label">Motor:</span><span class="value">2.0L 4</span></div>
                <div class="detail-item"><span class="label">Transmisión:</span><span class="value">AUTOMATIC</span></div>
                <div class="detail-item"><span class="label">Tracción:</span><span class="value">Front-wheel Drive</span></div>
                <div class="detail-item"><span class="label">Tipo de artículo:</span><span class="value">AUTOMOBILE</span></div>
                <div class="detail-item"><span class="label">Combustible:</span><span class="value">GAS</span></div>
                <div class="detail-item"><span class="label">Llaves:</span><span class="value">YES</span></div>
                <div class="detail-item"><span class="label">Destacados:</span><span class="value">Run and Drive</span></div>
                <div class="detail-item"><span class="label">Estado de Elegibilidad:</span><span class="value">Chequee Ahora Chequee Ahora</span></div>
            `
        },
        { 
            id: 2, 
            images: ['images/car2_1.jpg', 'images/car2_2.jpg', 'images/car2_3.jpg', 'images/car2_4.jpg', 'images/car2_5.jpg', 'images/car2_6.jpg', 'images/car2_7.jpg', 'images/car2_8.jpg'], 
            brand: 'Honda', 
            model: 'Civic', 
            year: 2019, 
            highestBid: 4500, 
            info: `
                <div class="detail-item"><span class="label">Motor:</span><span class="value">1.8L</span></div>
                <div class="detail-item"><span class="label">Transmisión:</span><span class="value">Manual</span></div>
                <div class="detail-item"><span class="label">Kilometraje:</span><span class="value">20,000 km</span></div>
            `
        },
        { 
            id: 3, 
            images: ['images/car3_1.jpg', 'images/car3_2.jpg', 'images/car3_3.jpg', 'images/car3_4.jpg', 'images/car3_5.jpg', 'images/car3_6.jpg', 'images/car3_7.jpg', 'images/car3_8.jpg'], 
            brand: 'Ford', 
            model: 'Mustang', 
            year: 2021, 
            highestBid: 7000, 
            info: `
                <div class="detail-item"><span class="label">Motor:</span><span class="value">5.0L</span></div>
                <div class="detail-item"><span class="label">Transmisión:</span><span class="value">Automática</span></div>
                <div class="detail-item"><span class="label">Kilometraje:</span><span class="value">10,000 km</span></div>
            `
        }
    ];

    // Definición de los jugadores
    const players = [
        { id: 1, name: 'Jugador 1', budget: 10000 },
        { id: 2, name: 'Jugador 2', budget: 10000 }
    ];

    // Jugador actual (puedes agregar una lógica para cambiar entre jugadores)
    let currentPlayer = players[0];

    // Índice del auto actual
    let currentCarIndex = 0;
    let currentImageIndex = 0;

    // Función para actualizar el presupuesto en la interfaz
    function updateBudgetDisplay() {
        budgetDisplay.textContent = `Dinero disponible: $${currentPlayer.budget}`;
    }

    // Renderizado del auto actual
    function renderCurrentCar() {
        auctionList.innerHTML = '';
        const car = cars[currentCarIndex];
        const carElement = document.createElement('div');
        carElement.classList.add('auction-card');
        carElement.innerHTML = `
            <div class="image-container">
                <button class="prev" onclick="showPrevImage()">&#10094;</button>
                <img src="${car.images[currentImageIndex]}" alt="${car.brand} ${car.model}">
                <button class="next" onclick="showNextImage()">&#10095;</button>
            </div>
            <div class="auction-details">
                <h2>${car.brand} ${car.model} (${car.year})</h2>
                <p>Highest Bid: <span class="bid">$${car.highestBid}</span></p>
                <button class="button" onclick="placeBid(${car.id})">Pujar</button>
            </div>
            <div class="vehicle-details">
                <h2>Detalles del Vehículo</h2>
                ${car.info}
            </div>
        `;
        auctionList.appendChild(carElement);
    }

    // Función para mostrar la imagen anterior
    window.showPrevImage = function() {
        const car = cars[currentCarIndex];
        currentImageIndex = (currentImageIndex === 0) ? car.images.length - 1 : currentImageIndex - 1;
        renderCurrentCar();
    }

    // Función para mostrar la siguiente imagen
    window.showNextImage = function() {
        const car = cars[currentCarIndex];
        currentImageIndex = (currentImageIndex === car.images.length - 1) ? 0 : currentImageIndex + 1;
        renderCurrentCar();
    }

    // Función para pujar
    window.placeBid = function(carId) {
        const bidAmount = prompt(`Ingrese su oferta (Presupuesto disponible: $${currentPlayer.budget}):`);
        if (bidAmount) {
            const car = cars.find(c => c.id === carId);
            const bid = parseFloat(bidAmount);

            if (bid > car.highestBid && bid <= currentPlayer.budget) {
                car.highestBid = bid;
                currentPlayer.budget -= bid;
                updateBudgetDisplay();
                renderCurrentCar();
                alert('¡Oferta aceptada!');
            } else if (bid > currentPlayer.budget) {
                alert('No tienes suficiente presupuesto para esta oferta.');
            } else {
                alert('La oferta debe ser mayor que la oferta más alta actual.');
            }
        }
    }

    // Función para mostrar el siguiente auto
    nextCarButton.addEventListener('click', function() {
        if (currentCarIndex < cars.length - 1) {
            currentCarIndex++;
            currentImageIndex = 0; // Reiniciar el índice de la imagen
            renderCurrentCar();
        } else {
            alert('No hay más autos.');
        }
    });

    // Inicializa la vista
    updateBudgetDisplay();
    renderCurrentCar();
});
