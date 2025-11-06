export async function fetchProvincias() {
  try {
    const API_URL =
      "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/Provincias/";
    const result = await fetch(API_URL);
    if (!result.ok) throw new Error("Error al obtener las provincias");
    const data = await result.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchGasolineras(IDPovincia) {
  try {
    const API_URL = `https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroProvincia/${IDPovincia}`;
    const result = await fetch(API_URL);
    if (!result.ok) throw new Error("Error al obtener las gasolineras");
    const data = await result.json();

    const dataMaped = [...data.ListaEESSPrecio].map((res) => ({
      direccion: res.Dirección,
      precio95: res["Precio Gasolina 95 E5"],
      precio98: res["Precio Gasolina 98 E5"],
      precioA: res["Precio Gasoleo A"],
    }));
    return dataMaped;
  } catch (error) {
    console.error(error);
  }
}
