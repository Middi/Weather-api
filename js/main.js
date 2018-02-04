$(document).ready(function () {

    // Get Location
    navigator.geolocation.getCurrentPosition(success, error);

    function success(pos) {
        var latitude = pos.coords.latitude;
        var longitude = pos.coords.longitude;
        weather(latitude, longitude);
    }

    // Call Weather
    function weather(latitude, longitude) {
        var APIKey = 'APPID=' + '76c3222b05bd5fe6e2f602b4591b0aec';
        var settings = '&units=metric&';
        var URL = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude + settings + APIKey}`;

        $.getJSON(URL, (data) => {
            updateDOM(data);
        });
    }

    // Update DOM
    function updateDOM(data) {
        // Main Data
        var city = data.city.name + ', ' + data.city.country;
        var desc = data.list[0].weather[0].description;
        $('#city').html(city);
        $('#desc').html(' ' + desc);

        // Looped Data
        $('.day').each(function (i, day) {
            var icon = data.list[i].weather[0].icon;
            var today = new Date().getTime();
            var hours = new Date(today + ((i) * 86400000));

            $(day).find('.date').html(hours.toString().split(' ')[0]);
            $(day).find('.day-temp').html(Math.round(data.list[i].temp.day) + '&#176;');
            $(day).find('.icon').attr('src', 'http://openweathermap.org/img/w/' + icon + '.png');
        });
    }
});