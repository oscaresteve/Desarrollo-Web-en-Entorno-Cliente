// Observa este código que funciona pero no cumple reglas de la programación funcional

/*
En el fichero spec/convert_functional_spec.test.js puedes ver los tests que deben pasar y las funciones que hay que crear

Las funciones testables son estas:
getAlerts, mapFavorites, toggleToFavorites, createAlertDiv, createAlertsDivs, addClickListeners, markFavorites

Y también la de DOMContentLoaded que construya la web a partir de estas. 
*/

export {
  getAlerts,
  mapFavorites,
  toggleToFavorites,
  createAlertDiv,
  createAlertsDivs,
  addClickListeners,
  markFavorites,
};

let alerts = [];

const getAlerts = async () => {
  const url = "https://data.food.gov.uk/food-alerts/id?_limit=100";
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.items);

  return data.items;
};

const mapFavorites = (favorites) => (alerts) => {
  return alerts.map((a) => ({
    ...a,
    favorite: Boolean(favorites.has(a["@id"])),
  }));
};

const toggleToFavorites = (favorites) => (alertId) => {
  const newFavorites = new Set(favorites);
  favorites.has(alertId)
    ? newFavorites.delete(alertId)
    : newFavorites.add(alertId);
  return newFavorites;
};

const createAlertDiv = (alert) => {
  const divAlert = document.createElement("div");
  divAlert.className = "#DIV";

  const title = document.createElement("h2");
  title.textContent = alert.title;

  const created = document.createElement("h3");
  created.textContent = alert.created;

  const problems = document.createElement("ul");
  problems.className = "problems";

  alert.problem.forEach((p) => {
    const problem = document.createElement("li");
    problem.textContent = p.riskStatement;

    problems.appendChild(problem);
  });

  divAlert.append(title, created, problems);

  return divAlert;
};

const createAlertsDivs = (alerts) => alerts.map(createAlertDiv);

const addClickListeners = (divs, handler) => {
  const newDivs = divs.map((div) => {
    const newDiv = div.cloneNode(true);
    newDiv.addEventListener("click", handler);
    return newDiv;
  });

  return newDivs;
};

const markFavorites = (favorites) => (divsFavorites) => {
  divsFavorites.forEach((div) => {
    if (favorites.has(div.dataset.id)) {
      div.classList.add("favorita");
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  
});

/*
let alertasFavoritas = [];

function addFavorita() {
  alertasFavoritas.push(this);
  console.log(alertasFavoritas);
  let alertasDivs = document.querySelectorAll(".alerta");
  alertasDivs.forEach(function (a) {
    a.classList.remove("favorita");
    alertasFavoritas.forEach(function (fav) {
      if (a === fav) {
        a.classList.add("favorita");
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://data.food.gov.uk/food-alerts/id?_limit=100").then((response) =>
    response.json().then((data) => {
      const alertes = data.items;
      for (let alerta of alertes) {
        const divAlerta = document.createElement("div");
        divAlerta.classList.add("alerta");
        divAlerta.innerHTML = `
                <h2>${alerta.title}</h2>
                <h3>${alerta.created}</h3>
                <h4>Problems:</h4>
                <ul class="problems"></ul>
                <h4>Details:</h4>
                <ul class="details"></ul>
                `;
        for (let p of alerta.problem) {
          const liProblem = document.createElement("li");
          liProblem.textContent = p.riskStatement;
          divAlerta.querySelector("ul.problems").append(liProblem);
        }
        if (alerta.productDetails) {
          for (let p of alerta.productDetails) {
            const liDetail = document.createElement("li");
            liDetail.textContent = p.productName;
            divAlerta.querySelector("ul.details").append(liDetail);
          }
        }

        document.querySelector("#container").append(divAlerta);
        divAlerta.addEventListener("click", addFavorita);
      }
    })
  );
});
*/
