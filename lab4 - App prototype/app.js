class Weather {
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
                console.log(temp);
                if (temp <= 50) {
                    document.querySelector("#ad").style.backgroundImage = "url('img/rainy.jpg')";
                } else {
                    document.querySelector("#ad").style.backgroundImage = "url('img/sunny.jpg')";
                }
                document.querySelector("#summary").innerHTML = `Today it's ${data.currently.summary}`;
                document.querySelector("#temp").innerHTML = `${temp} ºF`;
            })
            .catch(err => {
                console.log(err);
            })

    }
    errorlocation(err) {
        console.log(err);
    }
}
let weather = new Weather();