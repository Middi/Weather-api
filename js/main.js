$(document).ready(function () {

    var celsius = true;
    var endPoint = '//api.openweathermap.org/data/2.5/forecast/daily?';
    var lat = 'lat=' + '53.707105';
    var lon = '&lon=' + '-1.243742';
    var APIKey = 'APPID=' + '76c3222b05bd5fe6e2f602b4591b0aec';
    var settings = '&units=metric&';

    var URL = endPoint + lat + lon + settings + APIKey;

    function weather() {
        $.getJSON(URL, (data) => {
            updateDOM(data);
            console.log(data);
        });
    }
    weather();

    // Update DOM
    function updateDOM(data) {
        var city = data.city.name + ', ' + data.city.country;
        var temp = Math.round(data.list[0].temp.day);
        var wind = data.list[0].speed;
        var humid = data.list[0].humidity;
        var desc = data.list[0].weather[0].description;
        var icon = 'http://openweathermap.org/img/w/10d.png';

        $('#city').html(city);
        $('#temp').html(temp);
        $('#wind').html(' ' + wind + 'mph');
        $('#humid').html(' ' + humid + '%');
        $('#desc').html(' ' + desc);
        $('#icon').attr('src', icon);
        console.log(data);

        $('.day').each(function (i, day) {
            var dayIcon = data.list[i+1].weather[0].icon;

            var today = new Date().getTime();
            var hours = new Date(today + ((i+1) * 86400000));

            $(day).find('.date').html(hours.toString().split(' ')[0]);
            $(day).find('.day-temp').html(Math.round(data.list[i+1].temp.day) + '&#176;');
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