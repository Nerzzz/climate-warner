function main(){
    if("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition((pos) => {
            const _lat = pos.coords.latitude;
            const _lon = pos.coords.longitude;

            getDaily(_lat, _lon);
        });
    } else {
        // User input his location (Future)
        alert("Sorry, your browser don't have geolocation suport.");
    }
}

function set(id, content){
    document.getElementById(id).innerHTML = content;
}

function formatTemperature(temperature, unit){
    return `${Math.round(temperature)}${unit}`;
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

            console.log(data);

            set("current-temperature", formatTemperature(current.temperature_2m, units.temperature_2m));

            set("current-like", `Feels like ${formatTemperature(current.apparent_temperature, units.apparent_temperature)}`);

            set("current-prec-rate", `${data.daily.precipitation_probability_max}${data.daily_units.precipitation_probability_max}`);

            const hourlyContainer = document.getElementById("hourly-weather");
            const templateItem = document.getElementById("hourly-item-template");

            data.hourly.time.forEach((hour, index) => {
                const clone = templateItem.content.cloneNode(true);

                clone.querySelector(".hourly-item").setAttribute("id", `${new Date(hour).getHours()}`);
                clone.querySelector(".hour").innerHTML = formatHour(hour);
                clone.querySelector(".temperature").innerHTML = formatTemperature(data.hourly.temperature_2m[index], hourUnits.temperature_2m);
                clone.querySelector(".probability").innerHTML = `${Math.round(data.hourly.precipitation[index])}${hourUnits.precipitation}`;

                hourlyContainer.appendChild(clone);
            });
            document.getElementById(`${new Date(data.current.time).getHours()}`).scrollIntoView();

        });
    }
    catch(error){
        console.error("An error was hapened: ", error);
    }
}

function formatHour(date){
    return `${String(new Date(date).getHours()).padStart(2, "0")}:${String(new Date(date).getMinutes()).padStart(2, "0")}`;
}

main();