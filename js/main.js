$(document).ready(function () {

    // Get Location
    navigator.geolocation.getCurrentPosition(success, error);

    function success(pos) {
        var latitude = pos.coords.latitude;
        var longitude = pos.coords.longitude;
        weather(latitude, longitude);
    }

    function error(error) {
        console.log(error);
    }

    // Call Weather
    function weather(latitude, longitude) {
        var APIKey = '76c3222b05bd5fe6e2f602b4591b0aec';
        var URL = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&units=metric&APPID=${APIKey}`;

        $.getJSON(URL, (data) => {
            updateDOM(data);
        });
    }

    // Update DOM
    function updateDOM(data) {
        // Main Data
        var city = data.city.name;
        var desc = data.list[0].weather[0].description;
        var icon = data.list[0].weather[0].icon;
        var temp = Math.round(data.list[0].temp.day);
        $('#city').html(city);
        $('#desc-main').html(' ' + desc);
        $('#icon-main').attr('src', `http://openweathermap.org/img/w/${icon}.png`);
        $('#temp-main').html(temp + '&#176;');




        // 5 Day Loop
        for (var i = 1; i < 6; i++) {
            var today = new Date().getTime();
            var nextDay = new Date(today + ((i) * 86400000)).toString().split(' ')[0];
            var icon = data.list[i].weather[0].icon;
            var temp = Math.round(data.list[i].temp.day);

            $('#days').append(`
                <div class="day">
                <h3>${nextDay}</h3>
                <img class="icon" src="http://openweathermap.org/img/w/${icon}.png" alt="icon">
                <h4 class="day-temp">${temp}</h4>
                </div>
            `);
        }

    }
});