async function getDailyWeather(lat, lon) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,precipitation_probability_max,weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,wind_speed_10m,soil_temperature_6cm,weather_code,precipitation,apparent_temperature,precipitation_probability,relative_humidity_2m&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,precipitation,weather_code&timezone=America%2FSao_Paulo&forecast_days=1`);
        const data = await response.json(); 
        return data;
    }
    catch(error) {
        console.error("Could not get data:", error);
    }
}