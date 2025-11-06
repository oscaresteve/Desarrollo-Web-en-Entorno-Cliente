import { fetchGasolineras, fetchProvincias } from "./api";

let provincias = [];
let gasolineras = {};
let tipoCombustible = "precio95";
let rangoPrecios = 0;

async function getData() {
  provincias = await fetchProvincias();
  gasolineras = await fetchGasolineras(1)
  renderForm(provincias);
  showGasolineras(gasolineras, tipoCombustible, rangoPrecios);
}

export function showGasolineras(gasolineras, tipoCombustible, rangoPrecios) {

  const min = [...gasolineras].sort((a, b) => parseFloat(a[tipoCombustible]) - parseFloat(b[tipoCombustible]))
  const filteredGasolineras = [...gasolineras].filter(
    (gas) => gas[tipoCombustible] != ""
  );
  console.log(min);
}

export function renderForm(provincias) {
  const app = document.getElementById("app");

  //Provincias

  const divProvincias = document.createElement("div");

  const titleProvincias = document.createElement("h1");
  titleProvincias.textContent = "Provincias";

  const selectProvincias = document.createElement("select");
  selectProvincias.id = "select-provincias";

  for (const provincia of provincias) {
    const option = document.createElement("option");
    option.value = provincia.IDPovincia;
    option.textContent = provincia.Provincia;
    selectProvincias.appendChild(option);
  }

  divProvincias.append(titleProvincias, selectProvincias);

  //Precios

  const divPrecios = document.createElement("div");

  const titlePrecios = document.createElement("h1");
  titlePrecios.textContent = "Margen de precios";

  //Tipo de combustible

  const divTipoCombustible = document.createElement("div");

  const titleTipoCombustible = document.createElement("h2");
  titleTipoCombustible.textContent = "Tipo de combustible";

  const selectTipoCombustible = document.createElement("select");
  selectTipoCombustible.id = "select-tipo-combustible";

  const gasolina95 = document.createElement("option");
  gasolina95.value = "precio95";
  gasolina95.textContent = "Precio Gasolina 95 ES";

  const gasolina98 = document.createElement("option");
  gasolina98.value = "precio98";
  gasolina98.textContent = "Precio Gasolina 98 ES";

  const gasoleoA = document.createElement("option");
  gasoleoA.value = "precioA";
  gasoleoA.textContent = "Precio Gasoleo A";

  selectTipoCombustible.append(gasolina95, gasolina98, gasoleoA);

  divTipoCombustible.append(titleTipoCombustible, selectTipoCombustible);

  //Rango de Precios

  const divRangoPrecios = document.createElement("div");

  const titleRangoPrecios = document.createElement("h2");
  titleRangoPrecios.textContent = "Rango de Precios";

  const inputRango = document.createElement("input");
  inputRango.type = "range";
  inputRango.min = 0;
  inputRango.max = 100;
  inputRango.value = 1;

  divRangoPrecios.append(titleRangoPrecios, inputRango);

  divPrecios.append(titlePrecios, divTipoCombustible, divRangoPrecios);

  app.append(divProvincias, divPrecios);

  selectProvincias.addEventListener("change", async (e) => {
    gasolineras = await fetchGasolineras(e.target.value);
    showGasolineras(gasolineras, tipoCombustible, rangoPrecios);
  });

  selectTipoCombustible.addEventListener("change", (e) => {
    tipoCombustible = e.target.value;
    showGasolineras(gasolineras, tipoCombustible, rangoPrecios);
  });

  inputRango.addEventListener("change", (e) => {
    rangoPrecios = e.target.value;
    showGasolineras(gasolineras, tipoCombustible, rangoPrecios);
  });
}

function generateMap(idContainer, lat, long, zoom) {
   const map = L.map(idContainer).setView([lat, long], zoom);
   L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
   }).addTo(map);
   return map;
}

document.addEventListener("DOMContentLoaded", () => {
  const map = document.getElementById("map")
  getData();
  generateMap(map, 40, -1, 6)
});
