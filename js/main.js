var personalMode = 0;
var jQueryLoad = 0;
var newsCycle = 0;
var smallWeather = 0;
var tempWeather;
setTimeout(function(){
    if(jQueryLoad == 0)
    {
        startTime();
        initialize();        
    }
    
},2000);
setTimeout(function(){
    initialize();
    startTime();

    //getCalendar("");
},100);
setTimeout(function(){
    getNews();
    setTimeout(function(){
        startNews();
    },1000)
},500)

function startTime(){
    var time = new Date();
    var hours = time.getHours();
    var minute = time.getMinutes();
    var seconds = time.getSeconds();
    var day = time.getDate();
    var dayName = time.getDay();
    var month = time.getMonth();
    if (hours == 0)
    {
        hours = 12;
    }
    if (minute < 10)
    {
        minute = "0" + minute;
    }
    if (seconds < 10)
    {
        seconds = "0" + seconds;
    }


    if(dayName == 0)
    {
        dayName = "Sun"
    }
    else if (dayName == 1)
    {
        dayName = "Mon"
    }
    else if (dayName == 2)
    {
        dayName = "Tue"
    }
    else if (dayName == 3)
    {
        dayName = "Wed"
    }
    else if (dayName == 4)
    {
        dayName = "Thu"
    }
    else if (dayName == 5)
    {
        dayName = "Fri"
    }
    else if(dayName == 6)
    {
        dayName = "Sat";
    }

    if(month == 0)
    {
        month = "Jan";
    }
    else if (month == 1)
    {
        month = "Feb";
    }
    else if (month == 2)
    {
        month = "Mar";
    }
    else if (month == 3)
    {
        month = "Apr";
    }
    else if (month == 4)
    {
        month = "May";
    }
    else if (month == 5)
    {
        month = "Jun";
    }
    else if (month == 6)
    {
        month = "Jul";
    }
    else if (month == 7)
    {
        month = "Aug";
    }
    else if (month == 8)
    {
        month = "Sept";
    }
    else if (month == 9)
    {
        month = "Oct";
    }
    else if (month == 10)
    {
        month = "Nov";
    }
    else if (month == 11)
    {
        month = "Dec";
    }
    $("#title").html(hours + ":" + minute + ":" + seconds);
    $("#date").html(dayName + " <b>" + day + " </b>" + month);
    jQueryLoad = 1;
    setTimeout(function(){
        startTime();
    },1000);
}
var news = '';
function getNews(){
    var url = 'http://www.reddit.com/r/news.json?jsonp=jsonCallback';
    $.ajax({
       type: 'GET',
       url: url,
       async: false,
       jsonpCallback: 'jsonCallback',
       contentType: "application/json",
       dataType: 'jsonp',
       success: function(json) {
        console.log(json)
        news = json.data.children;
    },
    error: function(e) {
       console.log(e.message);
    }
    });
    setTimeout(function(){
        getNews();
    },(1000*60*30));   
}
function startNews(){
    if(newsCycle == news.length)
    {
        newsCycle = 0;
    }
    if(personalMode == 0)
    {
        $("#message").html(news[newsCycle].data.title);
        $("#message").css("opacity",1);
        setTimeout(function(){
            $("#message").css("opacity",0);
        },9000);
        setTimeout(function(){
            startNews(++newsCycle);
        },10000);
    }

}

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
        tempWeather = json.list[0];
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
    var icon = json.weather[0].icon;
    //icon = "01d"
    var temperature = Math.round((json.main.temp - 273.15)*(9/5)+32);
    var outside = '';
    if (smallWeather == 0)
    {
        outside = json.weather[0].description;
        var splitO = outside.split(' ');
        outside = '';
        for (i = 0; i < splitO.length; i++)
        {
            outside = outside + " " + splitO[i].replace(splitO[i][0], splitO[i][0].toUpperCase())
        }
    }
    $("#temperature").html(temperature + "°F - " + outside);
    getWeatherIcon(icon);
}
function getWeatherIcon(icon) {
    if (icon == "04n" || icon == "04d" || icon == "03n" || icon == "03d" || icon == "50n" || icon == "50d")
    {
        $("#temperature").append("  <img id='weatherIcon' height=50px src='img/cloudy.png'>")
    }
    else if (icon == "02d" || icon == "02n")
    {
        $("#temperature").append("  <img id='weatherIcon' height=50px src='img/slightCloud.png'>")
    }
    else if (icon == "01d" || icon == "01n")
    {
        $("#temperature").append("  <img id='weatherIcon' height=50px src='img/sun.png'>")
    }
    else if (icon == "09n" || icon == "09d" || icon == "10n" || icon == "10d")
    {
        $("#temperature").append("  <img id='weatherIcon' height=50px src='img/rain.png'>")
    }
    else if (icon == "11n" || icon == "11d")
    {
        $("#temperature").append("  <img id='weatherIcon' height=50px src='img/thunder.png'>")
    }
    else if (icon == "13n" || icon == "13d")
    {
        $("#temperature").append("  <img id='weatherIcon' height=50px src='img/snow.png'>")
    }
    else
    {
        $("#temperature").append("  <img id='weatherIcon' height=50px src='img/sun.png'>")
    }

}

function getCalendar(url){
    // $.get(
    //     'http://www.corsproxy.com/www.google.com/calendar/feeds/johnmlee101%40gmail.com/private-80b8fb2cf3fd34f615edfa06770d2151/basic',
    //     function(response) {   
    //         console.log(response);
    //         xmlDoc = response;
    //         $xml = $( xmlDoc );
    //         var title = [];
    //         var content = [];
    //         $title = $xml.find( "title" ).each(function(idx,v){
    //             title.push(v);
    //         });
    //         $content = $xml.find( "content" ).each(function(idx,v){
    //             v = new XMLSerializer().serializeToString(v).split(">")[1].split("&lt;br")[0];
    //             console.log(v)
    //             content.push(v);
    //         });
    //         for (i = 1; i < title.length; i++)
    //         {
    //             $("#calendarHolder").append(title[i]);
    //             $("#calendarHolder").append(" - " );
    //             $("#calendarHolder").append(content[i-1]);
    //             $("#calendarHolder").append("<br>");
    //         }
    //         console.log($title.text());
    //     });
var json = {
    "events":
    [
    {
        "startTime":"8:00",
        "endTime":"10:15",
        "title":"Working on Code",
        "location":"The Office"
    },
    {
        "startTime":"16:30",
        "endTime":"17:30",
        "title":"Meeting with Matt",
        "location":"Cafe"
    }
    ]
}
for(i = 0; i < json.events.length; i++)
{
    $("#calendarHolder").append("<div class='calendarEvent'>" + json.events[i].title + " | " + json.events[i].startTime + " - " + json.events[i].endTime + " | " + json.events[i].location +  "<br></div>");
}
console.log(json)
}

function enablePersonal(){
    personalMode = 1;
    smallWeather = 1;
    changeWeather(tempWeather);
    // var name = "John"
    // $("#message").html("Hello " + name + "...");
    // $("#message").css("opacity",1);
    // setTimeout(function(){
    //     $("#message").css("opacity",0);
    // },2000);
    //setTimeout(function(){
        $("#calendar").animate({ opacity: 1 }, 1000);
        $("#calendar").css("marginTop","0px");
        $("#bus").animate({ opacity: 1 }, 1000);
        $("#bus").css("marginTop","0px");
        $("#title").css("fontSize", "3em");
        $("#date").css("fontSize", "1em");
        getCalendar("");
        getBusStop();
        $("#message").css("opacity",0);
    //},3000);
}
function disablePersonal(){
    personalMode = 0;
    smallWeather = 0;
    changeWeather(tempWeather);
    $("#calendar").css("marginTop","400px");
    $("#calendar").animate({ opacity: 0 }, 1000);
    $("#bus").css("marginTop","400px");
    $("#bus").animate({ opacity: 0 }, 1000);
    $("#title").css("fontSize", "4em");
    $("#date").css("fontSize", "2em");
    startNews();
    setTimeout(function(){
        $("#calendarHolder").empty();
        $("#busTime").empty();
    },1000)
    
}

function getBusStop() {
    $.getJSON('http://www.corsproxy.com/citybus.doublemap.com/map/v2/eta?stop=59081', function (json) {
        data = json.etas['59081'].etas;
        $.each(data, function(i, item) {
            if (data[i].route == '1817') {
                $("#busTime").append(data[i].avg + " minutes<br>");
            }
        });
    });
    $("#busTime").append("10 minutes" + "<br>");
    $("#busTime").append("42 minutes" + "<br>");
}