export async function fetchBikes(limit, offset) {
    const url = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/jcdecaux-bike-stations-data-rt/records/?limit=${limit}&offset=${offset}`;
    const res = await fetch(url);
    const data = await res.json();
    
    /*const results = data.results.map(({name, address, available_bikes, available_bike_stands, city}) => ({
        name,
        address,
        available_bikes,
        available_bike_stands,
        city
    }))*/

    const results = data.results.map(res => ({
        name: res.name,
        address: res.address,
        available_bikes: res.available_bikes,
        available_bike_stands: res.available_bike_stands,
        city: res.city

    }))
    
    return results;
}