// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
const API_URL = "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/jcdecaux-bike-stations-data-rt/records/";
let limit = 10;
let offset = 0;
let currentPage = 1;

async function fetchBikes() {
    const url = `${API_URL}?limit=${limit}&offset=${offset}`
    const result = await fetch(url);
    const data = await result.json();
    renderData(data.results);
}

function renderData(bikes) {    
  document.getElementById("app").innerHTML = bikes
    .map(
      (r) => `
      <div class="station">
        <h3>${r.name || "Sin nombre"}</h3>
        <p><strong>Código:</strong> ${r.number}</p>
        <p><strong>Ciudad:</strong> ${r.contract_name}</p>
        <p><strong>Bicis disponibles:</strong> ${r.available_bikes}</p>
      </div>
    `
    )
    .join("");
}


document.addEventListener("DOMContentLoaded", () => {
    fetchBikes();
})