/**
 * Created by laurenra on 2/22/17.
 */
$(document).ready(function(){
    // $("#getLocBtn").click(function(){
    //     alert( "Handler for Get Weather button");
    // })
    // $("p").click(function(){
    //     $(this).hide();
    // });
    $("#location").submit(function( event ) {
        // alert( "Handler for .submit called." );
        var city = $("#city").val();
        var state = $("#state").val();
        // showAlert(city, state);
        // getWeather(city, state);
        // getWeatherJson(city, state);
        // getWeatherAjax(city, state);
        getWeatherAjaxBetter(city, state);
        event.preventDefault();
    });
});

function showAlert(city, state) {
    alert( "Doing a show alert for " + city + ", " + state);
}
// Get Yahoo Weather using jQuery .get, see https://api.jquery.com/jquery.get/
function getWeather(city, state) {
    var weatherUrl = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + city + ", " + state + "')&format=json";
    // var weatherUrl = "https://query.yahooapis.com/v1/public/yql?q=select%20wind%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%27" + city + "%2C%20" + state + "%27)&format=json";
    $.get(weatherUrl, function(data, status){
        // alert("Data: " + "\nStatus: " + status);
        // alert("Wind speed for " + city + ", " + state + " is " + data.query.results.channel.wind.speed + " mph");
        $("#jsonTitle").text(".get - Raw JSON Result (status = " + status + ")");
        $("#jsonData").text(JSON.stringify(data, null, 2));
        $("#weatherLocation").text(data.query.results.channel.description);
    });
}

// Get Yahoo Weather using jQuery .getJSON, see https://api.jquery.com/jQuery.getJSON/
function getWeatherJson(city, state) {
    var weatherUrl = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + city + ", " + state + "')&format=json";
    // var weatherUrl = "https://query.yahooapis.com/v1/public/yql?q=select%20wind%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%27" + city + "%2C%20" + state + "%27)&format=json";
    $.getJSON(weatherUrl, function(data) {
        var items = [];
        var outstr = "";
        // $.each(data, function(key, val) {
        //     key("<li id='" + key + "'>" + val + "</li>");
        // });
        // $("<ul/>")
        // alert("JSON Wind speed for " + city + ", " + state + " is " + data.query.results.channel.wind.speed + " mph");
        $("#jsonTitle").text(".getJSON - Raw JSON Result");
        $("#jsonData").text(JSON.stringify(data, null, 2));
        $("#weatherLocation").text(data.query.results.channel.description);
    });
}

// Get Yahoo Weather using jQuery .ajax, see https://api.jquery.com/jQuery.ajax/
function getWeatherAjax(city, state) {
    var weatherUrl = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + city + ", " + state + "')&format=json";
    $.ajax({
        method: "GET",
        url: weatherUrl,
        dataType: "json",

    })
        .done(function(data, textStatus, jqXHR) {
            if (data.query.count == "0") {
                $("#jsonTitle").text(".ajax - Raw JSON Result (status: " + textStatus + " but actually something is wrong)");
                $("#jsonData").text(JSON.stringify(data, null, 2));
                // $("#jsonData").text("query count == 0 so..."
                //     + "\nstatus = " + jqXHR.status
                //     + "\nstatusText = " + jqXHR.statusText
                //     + "\nresponseText = " + jqXHR.responseText
                //     + "\nresponseXML = " + jqXHR.responseXML
                //     + "\nstatusCode = " + jqXHR.statusCode()
                //     + "\ngetAllResponseHeaders = " + jqXHR.getAllResponseHeaders());
                showWeatherForecast(data);
            }
            else {
                $("#jsonTitle").text(".ajax - Raw JSON Result (status: " + textStatus + ")");
                $("#weatherLocation").text(data.query.results.channel.description);
                $("#jsonData").text(JSON.stringify(data, null, 2));
            }
        })
        .fail(function(jqXHR, textStatus, errorThrown){
            $("#jsonTitle").text(".ajax - Raw JSON Result (error: " + errorThrown + ")");
            // $("#jsonData").text("there was an error getting the data");
            $("#jsonData").text("status = " + jqXHR.status
                + "\nstatusText = " + jqXHR.statusText
                + "\nresponseText = " + jqXHR.responseText
                + "\nresponseXML = " + jqXHR.responseXML
                + "\nstatusCode = " + jqXHR.statusCode()
                + "\ngetAllResponseHeaders = " + jqXHR.getAllResponseHeaders());
            $("#weatherLocation").text("");
        });
}

// Get Yahoo Weather using jQuery .ajax, see https://api.jquery.com/jQuery.ajax/
function getWeatherAjaxBetter(city, state) {
    var weatherUrl = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + city + ", " + state + "')&u=f&format=json";
    var jqajax = $.ajax({
        method: "GET",
        url: weatherUrl,
        dataType: "json"
    });

    jqajax.done(function (data, textStatus, jqXHR) {
        if (data.query.count == "0") {
            $("#jsonTitle").text(".ajax - Raw JSON Result (status: " + textStatus + " but actually something is wrong)");
            $("#jsonData").text(JSON.stringify(data, null, 2));
            // $("#jsonData").text("query count == 0 so..."
            //     + "\nstatus = " + jqXHR.status
            //     + "\nstatusText = " + jqXHR.statusText
            //     + "\nresponseText = " + jqXHR.responseText
            //     + "\nresponseXML = " + jqXHR.responseXML
            //     + "\nstatusCode = " + jqXHR.statusCode()
            //     + "\ngetAllResponseHeaders = " + jqXHR.getAllResponseHeaders());
        }
        else {
            $("#jsonTitle").text(".ajax - Raw JSON Result (status: " + textStatus + ")");
            $("#weatherLocation").text(data.query.results.channel.description);
            $("#jsonData").text(JSON.stringify(data, null, 2));
            showWeatherForecast(data);
        }
    });

    jqajax.fail(function (jqXHR, textStatus, errorThrown) {
        $("#jsonTitle").text(".ajax - Raw JSON Result (error: " + errorThrown + ")");
        // $("#jsonData").text("there was an error getting the data");
        $("#jsonData").text("status = " + jqXHR.status
            + "\nstatusText = " + jqXHR.statusText
            + "\nresponseText = " + jqXHR.responseText
            + "\nresponseXML = " + jqXHR.responseXML
            + "\nstatusCode = " + jqXHR.statusCode()
            + "\ngetAllResponseHeaders = " + jqXHR.getAllResponseHeaders());
        $("#weatherLocation").text("");
    });
}

function showWeatherForecast(data) {
    var test = data.query.results.channel.location.city;
    console.log("showWeatherForecast, city = " + test);
    // var forecast = data.query.results.channel.item.forecast;
    // console.log("forecast = " + forecast);
    // console.log("forecast[1] day = " + forecast[1]["day"]);
    // for (var x in forecast) {
    //     var day = forecast[x];
    //     console.log("date=" + day["date"] + ", day=" + day["day"] + ", text=" + day["text"]);
    // };
    var weekly = data.query.results.channel.item.forecast;
    for (var i in weekly) {
        var daily = weekly[i];
        // console.log("day" + daily["day"] + ", " + daily["date"] + ", text=" + daily["text"]);
        // console.log("day" + daily.day + ", " + daily.date + ", text=" + daily.text);
        $("#forecastTable").append("<tr>"
            + "<td><h4>" + daily.day + ", " + daily.date + "</h4></td>"
            + "<td><h4>" + daily.high + "&deg;</h4></td>"
            + "<td><h4>" + daily.low  + "&deg;</h4></td>"
            + "<td><h4>" + daily.text + "</h4></td>"
            + "<td><h4></h4></td>"
            + "</tr>");
    }
}