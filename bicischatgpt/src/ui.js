export function renderBikes(bikes) {
    const app = document.getElementById("app");
    app.innerHTML = "";

    if (bikes.length === 0) {
        app.textContent = "No se encontraron estaciones.";
        return;
    }

    for (const bike of bikes) {
        const bikeDiv = document.createElement("div");
        bikeDiv.classList.add("bike-card");

        const title = document.createElement("h3");
        title.textContent = bike.name;

        const list = document.createElement("ul");

        const address = document.createElement("li");
        address.textContent = `Dirección: ${bike.address}`;

        const availableBikes = document.createElement("li");
        availableBikes.textContent = `Bicicletas disponibles: ${bike.available_bikes}`;

        const availableStands = document.createElement("li");
        availableStands.textContent = `Anclajes libres: ${bike.available_bike_stands}`;

        const city = document.createElement("li");
        city.textContent = `Ciudad: ${bike.city}`;

        list.append(address, availableBikes, availableStands, city);
        bikeDiv.append(title, list);
        app.appendChild(bikeDiv);
    }
}
