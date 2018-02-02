$(document).ready(function () {

    var endPoint = '//api.openweathermap.org/data/2.5/forecast?';
    var lat = 'lat=' + '53.707105';
    var lon = '&lon=' + '-1.243742';
    var APIKey = 'APPID=' + '1f3e30098d59daa0ee84d36dca533728';
    var settings = '&units=metric&'

    var URL = endPoint + lat + lon + settings + APIKey;

    function weather() {
        $.getJSON(URL, (data) => {
            console.log(data);
            updateDOM(data);
        });
    }
    weather();

    function updateDOM(data) {
        var city = data.city.name + ', ' + data.city.country;
        var temp = Math.round(data.list[0].main.temp);
        var wind = data.list[0].wind.speed;
        var humid = data.list[0].main.humidity;
        var desc = data.list[0].weather[0].description;

        $('#city').html(city);
        $('#temp').html(temp);
        $('#wind').html(' ' + wind + 'mph');
        $('#humid').html(' ' + humid + '%');
        $('#desc').html(' '+ desc);

        $('.day-temp').each(function(i, day) {
            $(day).html(Math.round(data.list[i].main.temp) + '&#176;');
        });
    }

});