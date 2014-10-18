var personalMode = 0;
var jQueryLoad = 0;
setTimeout(function(){
    if(jQueryLoad == 0)
    {
        startTime();
        initialize();        
    }
    getCalendar("https://www.google.com/calendar/feeds/johnmlee101%40gmail.com/private-80b8fb2cf3fd34f615edfa06770d2151/basic");
},2000);
function startTime(){
    var time = new Date();
    var hours = time.getHours();
    var minute = time.getMinutes();
    var seconds = time.getSeconds();
    if (hours == 0)
    {
        hours = 12;
    }
    if (hours < 10)
    {
        hours = "0" + hours;
    }
    if (minute < 10)
    {
        minute = "0" + minute;
    }
    if (seconds < 10)
    {
        seconds = "0" + seconds;
    }
    $("#title").html(hours + ":" + minute + ":" + seconds);
    jQueryLoad = 1;
    setTimeout(function(){
        startTime();
    },1000);
}

setTimeout(function(){
    initialize();
    startTime();
},100);

function initialize(){
    var url = 'http://api.openweathermap.org/data/2.5/find?q=West_Lafayette&callback=weatherGet';
    $.ajax({
       type: 'GET',
       url: url,
       async: false,
       jsonpCallback: 'jsonCallback',
       contentType: "application/json",
       dataType: 'jsonp',
       success: function(json) {
        changeWeather(json.list[0]);
            //jQueryLoad = 1;
        },
        error: function(e) {
           console.log(e.message);
       }
   });
    setTimeout(function(){
        initialize();
    },10000);
}

function changeWeather(json){
    console.log(json);
    var temperature = Math.round((json.main.temp - 273.15)*(9/5)+32);
    var outside = json.weather[0].description;
    var splitO = outside.split(' ');
    outside = '';
    for (i = 0; i < splitO.length; i++)
    {
        outside = outside + " " + splitO[i].replace(splitO[i][0], splitO[i][0].toUpperCase())
    }
    $("#temperature").html(temperature + "°F - " + outside);
}

function getCalendar(url){
    $.get(
    'http://www.corsproxy.com/www.google.com/calendar/feeds/johnmlee101%40gmail.com/private-80b8fb2cf3fd34f615edfa06770d2151/basic',
    function(response) { console.log(response);});
}