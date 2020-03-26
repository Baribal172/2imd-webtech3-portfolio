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
        // this.getTemp();
        this.getPressure();
        this.getSummary();
        this.getImages();
    }

    getWeather() {
        let url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/d7ab9bc692263c2ccaa208429a097dc4/${this.lat},${this.lng}`
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                localStorage.setItem("response", JSON.stringify(data));
                console.log("herlaadt");
            })
            .catch(err => {
                console.log(err);
            });
        setInterval(() => {
            this.getWeather();
        }, 60 * 60000);
    }
    //new code that loads img from pixabay api
    getImages() {
        var key = '15750540-4b288fe0d31b466d153c9c58a';
        var query = "toilet paper";
        var url = "https://pixabay.com/api/?key=" + key + "&q=" + query;
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                let hits = data["hits"];
                let firstHit = hits[Math.floor((Math.random() * 20) + 0)];
                let imageURL = firstHit["largeImageURL"];
                document.querySelector("#ad").style.backgroundImage = `url(${imageURL})`;
            })
            .catch(err => {
                console.log(err);
            });
    }
    //old code without the use of the second api
    // getTemp() {
    //     let storage = JSON.parse(localStorage.getItem("response"));
    //     if (storage.currently.temperature <= 20) {
    //         document.querySelector("#ad").style.backgroundImage = "url('img/rainy.jpg')";
    //     } else {
    //         document.querySelector("#ad").style.backgroundImage = "url('img/sunny.jpg')";
    //     }
    // }
    getPressure() {
        let storage = JSON.parse(localStorage.getItem("response"));
        document.querySelector('#weather').innerHTML = `The pressure nearby is ${storage.currently.pressure} hectopascal, but you'll still have to apply pressure yourself, buy our new toilet paper`;
    }
    getSummary() {
        let storage = JSON.parse(localStorage.getItem("response"));
        document.querySelector("#summary").innerHTML = `Today it's ${storage.currently.summary}`;
        document.querySelector("#temp").innerHTML = `${storage.currently.temperature} ºF`;
    }
    errorlocation(err) {
        console.log(err);
    }
}
let weather = new Weather();