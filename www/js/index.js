
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    //alert("device ready!");
    //navigator.geolocation.getCurrentPosition(onSuccess, onError);
    //checkConnection();
    
    //navigator.geolocation.getCurrentPosition(zoomToLocation, locationError);
    navigator.geolocation.watchPosition(showLocation, locationError);
    
}


// first positions test
var onSuccess = function(position) {
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

//



function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    alert('Connection type: ' + states[networkState]);
}

// ESRI MAP

var MAP = {
    map: {},
    mapPoint: {}
};


if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(zoomToLocation, locationError);
        navigator.geolocation.watchPosition(showLocation, locationError);
}


    function zoomToLocation(position) {
        //alert('funct ZOOM ' + '\n' + 'Latitude: '          + position.coords.latitude          + '\n' +
        //      'Longitude: '         + position.coords.longitude         + '\n');

       require([
        "esri/geometry/Point",
        "esri/geometry/webMercatorUtils",
        "esri/graphic",
        "esri/symbols/PictureMarkerSymbol"
          ],
          function (Point, webMercatorUtils, Graphic, PictureMarkerSymbol){

            MAP.mapPoint = webMercatorUtils.geographicToWebMercator(new Point(position.coords.longitude,
                    position.coords.latitude));
            MAP.map.centerAndZoom(mapPoint, 15);
            var symbol = new PictureMarkerSymbol("img/bluedot.png", 40, 40);
            MAP.map.graphics.add(new Graphic(MAP.mapPoint, symbol));

        });
    }

    function showLocation(position) {
        //alert('funct SHOW ' + '\n' + ' Latitude: '          + position.coords.latitude          + '\n' +
        //      'Longitude: '         + position.coords.longitude         + '\n');

        //var pt = esri.geometry.geographicToWebMercator(new esri.geometry.Point(location.coords.longitude, location.coords.latitude));
        //map.centerAndZoom(pt, 16);

        require([
        "esri/geometry/Point",
        "esri/geometry/webMercatorUtils",
        "esri/graphic",
        "esri/symbols/PictureMarkerSymbol"
          ],
          function (Point, webMercatorUtils, Graphic, PictureMarkerSymbol){

            MAP.mapPoint = webMercatorUtils.geographicToWebMercator(new Point(position.coords.longitude,
                    position.coords.latitude));
            //MAP.map.centerAndZoom(mapPoint, 15);
            var symbol = new PictureMarkerSymbol("img/bluedot.png", 40, 40);
            MAP.map.graphics.add(new Graphic(MAP.mapPoint, symbol));

        });
    }

    function locationError(error) {
       switch (error.code) {
         case error.PERMISSION_DENIED:
           alert("Location not provided (permission denied?)");
           break;
         case error.POSITION_UNAVAILABLE:
           alert("Current location not available");
           break;
         case error.TIMEOUT:
           alert("Timeout");
           break;
         default:
           alert("unknown error :(");
           break;
       }
    }


//

$("#show_on_map_button").on('click', function(){
    //console.log(MAP.mapPoint);
    MAP.map.centerAndZoom(MAP.mapPoint, 15);
});

$("#home_network_button").on('click', function(){
    checkConnection();
});

$(document).on("pageshow","#mapPage", function(){

    require(["esri/map", "dojo/domReady!"], function(Map) { 
      MAP.map = new Map("map", {
        center: [21.03, 52.15],
        zoom: 13,
        basemap: "topo",
        showAttribution: false
      });
    });

    var width = $(window).width();
    var height = $(window).height();
    $("#map").css("width", width*0.9);
    $("#map").css("height", height*0.7);
    $("#map_root").width("100%");
    $("#map_root").height("100%");



    
});


