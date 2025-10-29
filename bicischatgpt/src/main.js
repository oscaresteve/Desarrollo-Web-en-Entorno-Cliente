import { fetchBikes } from "./api";
import { renderBikes } from "./ui";

let limit = 5;
let offset = 0;
let page = 1;
let allBikes = [];

async function loadBikes() {
  allBikes = await fetchBikes(limit, offset);
  renderBikes(allBikes);
  document.getElementById("page").textContent = `Página ${page}`;
}

document.addEventListener("DOMContentLoaded", () =>{

  loadBikes();

  document.getElementById("previous").addEventListener("click", () => {
    if (page > 1) {
      offset -= limit;
      page --;
      loadBikes();
    }
  })

  document.getElementById("next").addEventListener("click", () => {
    offset += limit;
    page ++;
    loadBikes();
  })

  document.getElementById("input").addEventListener("input", (e) => {
    const filter = e.target.value.toLowerCase();
    const filtered = allBikes.filter(bike => bike.name.toLowerCase().includes(filter))
    renderBikes(filtered);  
  })

  document.getElementById("sort-az").addEventListener("click", () => {
    const sorted = [...allBikes].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
    renderBikes(sorted)
  })
  
  document.getElementById("sort-za").addEventListener("click", () => {
    const sorted = [...allBikes].sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()))
    renderBikes(sorted)
  })

  document.getElementById("select").addEventListener("change", (e) => {
    limit = parseInt(e.target.value);
    offset = 0;
    page = 1;
    loadBikes();
  })
})