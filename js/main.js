$(document).ready(function () {

    navigator.geolocation.getCurrentPosition(success, error);

    function success(pos) {
        var latitude = pos.coords.latitude;
        var longitude = pos.coords.longitude;
        weather(latitude, longitude);
    }

    function error() {
        console.log('error');
    }

    var celsius = true;

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
        var city = data.city.name + ', ' + data.city.country;
        var wind = data.list[0].speed;
        var humid = data.list[0].humidity;
        var desc = data.list[0].weather[0].description;
        var icon = 'http://openweathermap.org/img/w/10d.png';

        $('#city').html(city);
        $('#wind').html(' ' + wind + 'mph');
        $('#humid').html(' ' + humid + '%');
        $('#desc').html(' ' + desc);
        $('#icon').attr('src', icon);
        console.log(data);

        $('.day').each(function (i, day) {
            var dayIcon = data.list[i].weather[0].icon;
            var today = new Date().getTime();
            var hours = new Date(today + ((i) * 86400000));

            $(day).find('.date').html(hours.toString().split(' ')[0]);
            $(day).find('.day-temp').html(Math.round(data.list[i].temp.day) + '&#176;');
            $(day).find('.day-icon').attr('src', 'http://openweathermap.org/img/w/' + dayIcon + '.png');
        });
    }


    // Farenheit conversion

    $('#c-deg').on('click', () => {
        if (!celsius) {
            var tempF = $('#temp').html();
            $('#temp').html(Math.round((tempF - 32) * 0.5556));
            // 5 Days Conversion
            $('.day-temp').each(function (i, day) {
                var tempD = $(day).html().replace('°', '');
                $(day).html(Math.round((tempD - 32) * 0.5556) + '&#176;');
            });
            $('#c-deg').addClass('button-active');
            $('#f-deg').removeClass('button-active');
            celsius = true;
        }
    });

    $('#f-deg').on('click', () => {
        if (celsius) {
            var tempF = $('#temp').html();
            $('#temp').html(Math.round((tempF * 1.8000) + 32));
            // 5 Days Conversion
            $('.day-temp').each(function (i, day) {
                var tempD = $(day).html().replace('°', '');
                $(day).html(Math.round((tempD * 1.8000) + 32) + '&#176;');
            });
            $('#f-deg').addClass('button-active');
            $('#c-deg').removeClass('button-active');
            celsius = false;
        }
    });

    // Dates


});