let currentCar = 1;
const totalCars = 8; // Cambia esto según el número total de imágenes de carros
let money = 10000; // Dinero inicial para cada jugador
let highestBid = 0; // Puja más alta
let timer = 60; // Temporizador inicial de un minuto
let timerInterval;

const carInfo = [
    {
        lotNumber: "62036244",
        vin: "JTDS4RCE3LJ******",
        titleCode: "FL - CERT OF TITLE-REBUILT (P)",
        odometer: "23,328 mi (ACTUAL)",
        damage: "MINOR DENT/SCRATCHES",
        cylinders: 4,
        color: "BLACK",
        engine: "2.0L 4",
        transmission: "AUTOMATIC",
        drivetrain: "Front-wheel Drive",
        type: "AUTOMOBILE",
        fuel: "GAS",
        keys: "YES",
        highlights: "Run and Drive",
        eligibility: "Chequee Ahora",
        minPrice: 5000
    },
    // Añade más objetos de información para los otros carros con su precio mínimo
];

document.getElementById('registration-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const code = document.getElementById('code').value;
    if (code.length === 4) {
        console.log(`Registrado: ${email} con código ${code}`);
        document.getElementById('registration').style.display = 'none';
        document.getElementById('game').style.display = 'flex';
        updateCarInfo(currentCar);
        startTimer();
    } else {
        alert('El código debe tener 4 dígitos');
    }
});

document.getElementById('place-bid').addEventListener('click', () => {
    const bidAmount = parseInt(document.getElementById('bid-amount').value, 10);
    placeBid(bidAmount);
});

document.getElementById('next-car').addEventListener('click', () => {
    currentCar++;
    if (currentCar > totalCars) {
        currentCar = 1; // Reinicia al primer carro
    }
    highestBid = 0;
    document.getElementById('highest-bid-amount').textContent = highestBid;
    updateCarInfo(currentCar);
    document.getElementById('next-car').style.display = 'none';
    document.getElementById('winner').style.display = 'none';
    startTimer();
});

function updateCarInfo(carNumber) {
    document.getElementById('car-image').src = `car${carNumber}_1.jpg`;
    const info = carInfo[carNumber - 1];
    const carInfoElement = document.getElementById('car-info');
    carInfoElement.innerHTML = `
        <strong>Número de lote:</strong> ${info.lotNumber}<br>
        <strong>ID vehicular (VIN):</strong> ${info.vin}<br>
        <strong>Código de título:</strong> ${info.titleCode}<br>
        <strong>Odómetro:</strong> ${info.odometer}<br>
        <strong>Daño principal:</strong> ${info.damage}<br>
        <strong>Cilindros:</strong> ${info.cylinders}<br>
        <strong>Color:</strong> ${info.color}<br>
        <strong>Motor:</strong> ${info.engine}<br>
        <strong>Transmisión:</strong> ${info.transmission}<br>
        <strong>Tracción:</strong> ${info.drivetrain}<br>
        <strong>Tipo de artículo:</strong> ${info.type}<br>
        <strong>Combustible:</strong> ${info.fuel}<br>
        <strong>Llaves:</strong> ${info.keys}<br>
        <strong>Destacados:</strong> ${info.highlights}<br>
        <strong>Estado de Elegibilidad:</strong> ${info.eligibility}
    `;
    document.getElementById('min-price').textContent = info.minPrice;
}

function placeBid(amount) {
    const minPrice = carInfo[currentCar - 1].minPrice;
    if (isNaN(amount) || amount <= 0) {
        alert('Por favor ingresa una cantidad válida para pujar');
        return;
    }
    if (amount <= highestBid || amount < minPrice) {
        alert('La puja debe ser mayor que la puja más alta actual y el precio mínimo');
        return;
    }
    if (money >= amount) {
        highestBid = amount;
        document.getElementById('highest-bid-amount').textContent = highestBid;
        money -= amount;
        document.getElementById('money').textContent = money;
        if (timer <= 1) {
            timer += 5;
        }
    } else {
        alert('No tienes suficiente dinero para esta puja');
    }
}

function startTimer() {
    timer = 60;
    document.getElementById('timer').textContent = timer;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timer--;
        document.getElementById('timer').textContent = timer;
        if (timer <= 0) {
            clearInterval(timerInterval);
            document.getElementById('winner').style.display = 'block';
            document.getElementById('next-car').style.display = 'block';
        }
    }, 1000);
}

// Inicializa el dinero disponible
document.getElementById('money').textContent = money;
