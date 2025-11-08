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

const getAlerts = async () => {
  const url = "https://data.food.gov.uk/food-alerts/id?_limit=100";
  const res = await fetch(url);
  const data = await res.json();
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
  (favorites.has(alertId) && newFavorites.delete(alertId)) ||
    newFavorites.add(alertId);
  return newFavorites;
};

const createAlertDiv = (alert) => {
  const divAlert = document.createElement("div");
  divAlert.className = "#DIV";
  divAlert.dataset.id = alert["@id"];

  const title = document.createElement("h2");
  title.textContent = alert.title;

  const created = document.createElement("h3");
  created.textContent = alert.created;

  const titleProblems = document.createElement("h4");
  titleProblems.textContent = "Problems:";

  const problems = document.createElement("ul");
  problems.className = "problems";

  alert.problem.forEach((p) => {
    const problem = document.createElement("li");
    problem.textContent = p.riskStatement;

    problems.appendChild(problem);
  });

  const titleDetails = document.createElement("h4");
  titleDetails.textContent = "Details:";

  const details = document.createElement("ul");
  details.className = "details";

  alert.productDetails?.forEach((d) => {
    const detail = document.createElement("li");
    detail.textContent = d.productName;
    details.appendChild(detail);
  });

  divAlert.append(
    title,
    created,
    titleProblems,
    problems,
    titleDetails,
    details
  );

  return divAlert;
};

const createAlertsDivs = (alerts) => alerts.map(createAlertDiv);

const addClickListeners = (divs, handler) =>
  divs.map((div) => {
    const newDiv = div.cloneNode(true);
    newDiv.addEventListener("click", handler);
    return newDiv;
  });

const markFavorites = (favorites) => (divsFavorites) => {
  divsFavorites.forEach((div) => {
    div.classList.remove("favorita");
    favorites.has(div.dataset.id) && div.classList.add("favorita");
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  const alerts = await getAlerts();
  let favorites = new Set([]);

  const divs = addClickListeners(createAlertsDivs(alerts), (ev) => {
    favorites = toggleToFavorites(favorites)(ev.currentTarget.dataset.id);
    markFavorites(favorites)(divs);
  });

  document.getElementById("container").append(...divs);
});
