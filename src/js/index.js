function main(){
    if("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition((pos) => {
            const _lat = pos.coords.latitude;
            const _lon = pos.coords.longitude;

            getDaily(_lat, _lon);
            getDailyVariables(_lat, _lon);
        });
    } else {
        alert("Sorry, your browser don't have geolocation suport.");
    }
}

function set(id, content){
    document.querySelector(id).innerHTML = content;
}

function formatTemperature(temperature, unit){
    return `${Math.round(temperature)}${unit}`;
}

function selectWeatherIlustrationSrc(wmo, hour){
    const folder = (hour > 5 && hour < 19) ? "day" : "night";

    let weather;
    if(wmo == 0){ weather = "clear"; }
    else if(wmo == 1){ weather = "mostly-clear"; }
    else if(wmo == 2){ weather = "partly-cloudy"; }
    else if(wmo >= 3 && wmo <= 48){ weather = "mostly-cloudy"; }
    else if(wmo >= 51 && wmo <= 55){ weather = "light-rain"; }
    else if(wmo >= 61 && wmo <= 65){ weather = "heavy-rain"; }
    else if(wmo >= 80 && wmo <= 82){ weather = "light-rain"; }
    else if(wmo >= 71 && wmo <= 77){ weather = "snow"; }
    else if(wmo >= 95){ weather = "thunderstorm"; }
    else { weather = "clear"; }

    return `./assets/images/climate/${folder}/${weather}.svg`;
}
async function getDaily(lat, lon) {
    try{        
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&timezone=auto&daily=precipitation_probability_max,weather_code&hourly=temperature_2m,precipitation,weather_code&current=temperature_2m,apparent_temperature,is_day,weather_code,precipitation,relative_humidity_2m&forecast_days=1`, {
            method: "GET"
        }).then((_response) => {
            return _response.json();
        }).then((data) => {

            const current = data.current;
            const units = data.current_units;
            const hourUnits = data.hourly_units

            const hour = new Date(current.time).getHours();
            if(hour > 5 && hour < 19) {
                document.querySelector(".current-weather").classList.add("day");
                document.querySelector(".current-weather").classList.remove("night");
            }
            else {
                document.querySelector(".current-weather").classList.remove("day");
                document.querySelector(".current-weather").classList.add("night");
            }

            set("#current-temperature", formatTemperature(current.temperature_2m, units.temperature_2m));

            set("#current-like", `Feels like ${formatTemperature(current.apparent_temperature, units.apparent_temperature)}`);

            set("#current-prec-rate", `${data.daily.precipitation_probability_max}${data.daily_units.precipitation_probability_max}`);

            document.getElementById("current-ilustration").setAttribute("src", selectWeatherIlustrationSrc(current.weather_code, hour));

            const hourlyContainer = document.getElementById("hourly-weather");
            const templateItem = document.getElementById("hourly-item-template");

            data.hourly.time.forEach((_hour, index) => {
                const clone = templateItem.content.cloneNode(true);

                if(hour > new Date(_hour).getHours()){ 
                    clone.querySelector(".hourly-item").classList.add("past");
                }

                clone.querySelector(".hourly-item").setAttribute("id", `${new Date(_hour).getHours()}`);
                
                clone.querySelector(".ilustration").setAttribute("src", selectWeatherIlustrationSrc(data.hourly.weather_code[index], `${new Date(_hour).getHours()}`));
                clone.querySelector(".hour").innerHTML = formatHour(_hour);
                clone.querySelector(".temperature").innerHTML = formatTemperature(data.hourly.temperature_2m[index], hourUnits.temperature_2m);
                clone.querySelector(".probability").innerHTML = `${data.hourly.precipitation[index]}${hourUnits.precipitation}`;

                hourlyContainer.appendChild(clone);
            });

            document.getElementById(hour).scrollIntoView();
            document.getElementById(hour).classList.add("now");

        });
    }
    catch(error){
        console.error("An error was hapened: ", error);
    }
}

function formatHour(date){
    return `${String(new Date(date).getHours()).padStart(2, "0")}:${String(new Date(date).getMinutes()).padStart(2, "0")}`;
}

async function getDailyVariables(lat, lon) {
    try {
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,sunrise,sunset,uv_index_max,rain_sum&timezone=America%2FSao_Paulo&forecast_days=1`, {
            method: "GET"
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
            const daily = data.daily;
            const units = data.daily_units;

            set(`#wind-direction`, getCardinalDirection(daily.wind_direction_10m_dominant));

            set("#wind-max-speed", `Wind speed: ${Math.round(daily.wind_speed_10m_max)} ${units.wind_speed_10m_max}`);
            set("#wind-gusts", `Gusts speed: ${Math.round(daily.wind_gusts_10m_max)} ${units.wind_gusts_10m_max}`);
        });
    } catch (error) {
        console.error("An error was hapened: ", error);
    }
}

function getCardinalDirection(deg){
    const card = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return card[(Math.round(deg / 48) % 8)];
}

main();