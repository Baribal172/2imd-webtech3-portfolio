class App {
    constructor() {
        this.getLocation();
        this.lat;
        this.lng;
        this.err;
    }
    getLocation() {
        navigator.geolocation.getCurrentPosition(
            this.gotLocation.bind(this),
            this.errorlocation.bind(this)
        )
    }
    gotLocation(result) {
        this.lat = result.coords.latitude;
        this.lng = result.coords.longitude;
        this.getWeather();
    }
    getWeather() {
        let url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/d7ab9bc692263c2ccaa208429a097dc4/${this.lat},${this.lng}`
        fetch(url)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                document.querySelector('#weather').innerHTML = `The pressure nearby is ${data.currently.pressure} hectopascal, but you'll still have to apply pressure yourself, buy our new toilet paper`
                let temp = data.currently.temperature;
                if (temp < 45) {
                    document.querySelector("#ad").style.backgroundImage = "url('img/sunny.jpg')";
                } else {
                    document.querySelector("#ad").style.backgroundImage = "url('img/rainy.jpg')";
                }
            })
            .catch(err => {
                console.log(err);
            })

    }
    errorlocation(err) {
        console.log(err);
    }
}
let app = new App();
//document.getElementById("imageid").src="../template/save.png";