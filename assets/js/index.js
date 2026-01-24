function main(){
    if("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition((pos) => {
            const _lat = pos.latitude;
            const _lon = pos.longitude;

            console.log(_lat, _lon);
        });
    } else {
        alert("Sorry, your browser don't have geolocation suport.");
    }
}

main();