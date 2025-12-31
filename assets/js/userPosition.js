function getPosition() {
    return new Promise((resolve, reject) =>{
        navigator.geolocation.getCurrentPosition(
            (pos)=>{
                resolve([pos.coords.latitude, pos.coords.longitude]);
            },
            ()=>{
                reject("Your browser don't have geolocalization permission");
            }
        );
    });
}