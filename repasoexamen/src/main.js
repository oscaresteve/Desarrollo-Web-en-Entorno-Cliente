const API_URL = 'https://jsonplaceholder.typicode.com/users';
let users = []

async function fetchUsers() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al cargar los datos")
    users = await response.json();
    console.log(users);
  } catch (error) {
    
  }
  renderUsers(users);
}

function filterUsers(text) {
  const filteredUsers = users.filter(u => u.name.includes(text));
  renderUsers(filteredUsers);
}

function ordenarNombre() {
  const ordenadosUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));
  renderUsers(ordenadosUsers )
}

function ordenarCiudad() {
  const ordenadosUsers = [...users].sort((a, b) => a.address.city.localeCompare(b.address.city));
  renderUsers(ordenadosUsers)
}

function showdetails(user) {
  const details = document.getElementById("details");
  details.innerHTML = `
    <h2>Detalles de ${user.name}</h2>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Teléfono:</strong> ${user.phone}</p>
    <p><strong>Ciudad:</strong> ${user.address.city}</p>
    <p><strong>Empresa:</strong> ${user.company.name}</p>
    <p><strong>Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
  `;

}

function renderUsers(users) {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const divUsers = document.createElement("div");

  users.map(u => {
    const divUser = document.createElement("div");

    const nameUser = document.createElement("h1");
    nameUser.textContent = u.name;

    const emailUser = document.createElement("h3");
    emailUser.textContent = "Email: " + u.email;

    const cityUser = document.createElement("h3");
    cityUser.textContent = "City: " + u.address.city;
    divUser.addEventListener("click", () => showdetails(u));
    divUser.append(nameUser, emailUser, cityUser);
    divUsers.appendChild(divUser);
  })

  app.appendChild(divUsers)
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("input").addEventListener("input", (e) => {
    filterUsers(e.target.value)
  })

  document.getElementById("ordenarnombre").addEventListener("click", ordenarNombre);
  document.getElementById("ordenarciudad").addEventListener("click", ordenarCiudad);

  fetchUsers();
})