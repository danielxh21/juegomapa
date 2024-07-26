let currentCar = 1;
const totalCars = 8; // Cambia esto según el número total de imágenes de carros
let money = 10000; // Dinero inicial para cada jugador

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
        eligibility: "Chequee Ahora"
    },
    // Añade más objetos de información para los otros carros
];

document.getElementById('registration-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const code = document.getElementById('code').value;
    if (code.length === 4) {
        // Guardar la información del jugador (puedes agregar validación adicional aquí)
        console.log(`Registrado: ${email} con código ${code}`);
        // Ocultar el formulario de registro y mostrar el juego
        document.getElementById('registration').style.display = 'none';
        document.getElementById('game').style.display = 'flex';
    } else {
        alert('El código debe tener 4 dígitos');
    }
});

document.getElementById('next-car').addEventListener('click', () => {
    currentCar++;
    if (currentCar > totalCars) {
        currentCar = 1; // Reinicia al primer carro
    }
    updateCarInfo(currentCar);
});

function updateCarInfo(carNumber) {
    document.getElementById('car-image').src = `car${carNumber}.jpg`;
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
}

document.getElementById('bid-1000').addEventListener('click', () => {
    placeBid(1000);
});

document.getElementById('bid-5000').addEventListener('click', () => {
    placeBid(5000);
});

function placeBid(amount) {
    if (money >= amount) {
        money -= amount;
        document.getElementById('money').textContent = money;
    } else {
        alert('No tienes suficiente dinero para esta puja');
    }
}

// Inicializa con el primer carro y el dinero inicial
updateCarInfo(currentCar);
document.getElementById('money').textContent = money;
