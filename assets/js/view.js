function wmoCodeToImage(id, isDay, wmoCode){
    
    const images = [
        "clear.svg", "mostly_clear.svg", "partly_cloudy.svg", "fog.svg", "mostly_cloudy.svg", "light_rain.svg", "rain.svg", "snow.svg", "heavy_rain.svg", "thunderstorm.svg"
    ];
    let index;
    let src;

    if(wmoCode == 0) index = 0;
    else if(wmoCode == 1) index = 1;
    else if(wmoCode == 2) index = 2;
    else if(wmoCode == 3) index = 3;
    else if(wmoCode >= 45 && wmoCode <= 48) index = 4;
    else if(wmoCode >= 51 && wmoCode <= 57) index = 5;
    else if(wmoCode >= 61 && wmoCode <= 67) index = 6;
    else if(wmoCode >= 71 && wmoCode <= 77) index = 7;
    else if(wmoCode >= 80 && wmoCode <= 82) index = 8;
    else if(wmoCode > 82) index = 9;

    const folder = isDay === 1 ? "day" : "night";

    document.getElementById(id).src = `../assets/images/climate/${folder}/${images[index]}`;
}

function loadDailyWeather(_data){
    console.log(_data);
    const data = JSON.parse(_data);

    document.getElementById("reg-hour").innerHTML = `${String(new Date(data.current.time).getHours()).padStart(2, "0")}:${String(new Date(data.current.time).getMinutes()).padStart(2, "0")}`;
    document.getElementById("current-temp").innerHTML = Math.round(data.current.temperature_2m)+data.current_units.temperature_2m;
    document.getElementById("apparent-temp").innerHTML = `Feels like ${Math.round(data.current.apparent_temperature)+data.current_units.temperature_2m}`;
    document.getElementById("precipitation-rate").innerHTML = Math.round(data.daily.precipitation_probability_max)+data.daily_units.precipitation_probability_max;

    if(data.current.is_day == 1){
        document.querySelector(".current-weather").classList.add("day");
        document.querySelector(".current-weather").classList.remove("night");
    }
    else{
        document.querySelector(".current-weather").classList.add("night");
        document.querySelector(".current-weather").classList.remove("day");
    }

    wmoCodeToImage("current-weather-ilustration", data.current.is_day, data.current.weather_code);
}