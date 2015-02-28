/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
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
    alert("device ready!");
    //navigator.geolocation.getCurrentPosition(onSuccess, onError);
    checkConnection();
    
    navigator.geolocation.getCurrentPosition(zoomToLocation, locationError);
    
}

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








document.addEventListener("deviceready", function(){
   
  if(navigator.network.connection.type == Connection.NONE){
    $("#home_network_button").text('No Internet Access')
                 .attr("data-icon", "delete")
                 .button('refresh');
  }
 
});

/*
var track_id = '';      // Name/ID of the exercise
var watch_id = null;    // ID of the geolocation
var tracking_data = []; // Array containing GPS position objects
 
$("#startTracking_start").on('click', function(){
    alert("start");
     
    // Start tracking the User
    watch_id = navigator.geolocation.watchPosition(
     
        // Success
        function(position){
            tracking_data.push(position);
        },
         
        // Error
        function(error){
            console.log(error);
        },
         
        // Settings
        { frequency: 3000, enableHighAccuracy: true });
     
    // Tidy up the UI
    track_id = $("#track_id").val();
     
    $("#track_id").hide();
     
    $("#startTracking_status").html("Tracking workout: <strong>" + track_id + "</strong>");
});
*/

// LEAFLET JS MAP
/*
var map = L.map('map').setView([52, 21], 14);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18
}).addTo(map);
*/
//

// ESRI MAP

var MAP = {
    map: {}
};

var width = $(window).width();
var height = $(window).height();

require(["esri/map", "dojo/domReady!"], function(Map) { 
  MAP.map = new Map("map", {
    center: [21.05, 52.15],
    zoom: 13,
    basemap: "topo"
  });
});

$("#map").css("width", width*0.8);

if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(zoomToLocation, locationError);
        navigator.geolocation.watchPosition(showLocation, locationError);
}





    function zoomToLocation(position) {
        alert('funct ZOOM ' + '\n' + 'Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n');

       //var pt = esri.geometry.geographicToWebMercator(new esri.geometry.Point(location.coords.longitude, location.coords.latitude));
       //map.centerAndZoom(pt, 16);
    }

    function showLocation(position) {
        alert('funct SHOW ' + '\n' + ' Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n');

        //var pt = esri.geometry.geographicToWebMercator(new esri.geometry.Point(location.coords.longitude, location.coords.latitude));
        //map.centerAndZoom(pt, 16);

        require([
    "esri/geometry/Point",
    "esri/geometry/webMercatorUtils",
    "esri/graphic",
    "esri/symbols/PictureMarkerSymbol"
      ],
      function (Point, webMercatorUtils, Graphic, PictureMarkerSymbol){

        var mapPoint = webMercatorUtils.geographicToWebMercator(new Point(position.coords.longitude,
                position.coords.latitude));
        MAP.map.centerAndZoom(mapPoint, 15);
        var symbol = new PictureMarkerSymbol("img/bluedot.png", 40, 40);
        MAP.map.graphics.add(new Graphic(mapPoint, symbol));

        });

       //if (location.coords.accuracy <= 500) {
         // the reading is accurate, do something
       //} else {
         // reading is not accurate enough, do something else
    }

    function locationError(error) {
       switch (error.code) {
         case error.PERMISSION_DENIED:
           alert("Location not provided");
           break;
         case error.POSITION_UNAVAILABLE:
           alert("Current location not available");
           break;
         case error.TIMEOUT:
           alert("Timeout");
           break;
         default:
           alert("unknown error");
           break;
       }
    }


//

