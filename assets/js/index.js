function main(){
    if("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition((pos) => {
            const _lat = pos.coords.latitude;
            const _lon = pos.coords.longitude;

            console.log(_lat, _lon);
        });
    } else {
        alert("Sorry, your browser don't have geolocation suport.");
    }
}

main();