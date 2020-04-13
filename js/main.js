var mapData,ALL_MARKERS=[],MARKERS_LAYER;
var HIRERS_LAYER, CARS_LAYER;
var HIRERS_MARKERS=[], CARS_MARKERS=[];
var filter_hirers_range;

function showAllHirers(){
	if (!map.hasLayer(HIRERS_LAYER))
		map.addLayer(HIRERS_LAYER);

	HIRERS_LAYER.clearLayers();			
	for(var i=0;i<HIRERS_MARKERS.length;i++){		
		let m = HIRERS_MARKERS[i];		
		HIRERS_LAYER.addLayer(m);			
	}
}
function showAllCars(){
	
	if (!map.hasLayer(CARS_LAYER))
		map.addLayer(CARS_LAYER);

	CARS_LAYER.clearLayers();			
	for(var i=0;i<CARS_MARKERS.length;i++){		
		let m = CARS_MARKERS[i];		
		CARS_LAYER.addLayer(m);			
	}
}
function resetMap(){

	showAllHirers();
	showAllCars();
	filter_hirers_range.reset();
	
	let elem = $('input[type="checkbox"]');
	for(var i=0;i<elem.length;i++){
		e = elem[i];
		e.checked=true;	
	}		
}

function filterHirers() {
	
	HIRERS_LAYER.clearLayers();
	
	//let min = Number($('#hirers_min').val());
	//let max = ($('#hirers_max').val());
	let min = filter_hirers_range.result.from;
	let max = filter_hirers_range.result.to;
		
	for(var i=0;i<HIRERS_MARKERS.length;i++){		
		let m = HIRERS_MARKERS[i];
		if(Number(m.options.hires)>=min 
		&& Number(m.options.hires)<=max ){
			HIRERS_LAYER.addLayer(m);	
		}
	}	
}

function filterCar(val){
	CARS_LAYER.clearLayers();
	
	//let min = Number($('#hirers_min').val());
	//let max = ($('#hirers_max').val());
	let min = filter_hirers_range.result.from;
	let max = filter_hirers_range.result.to;
	
	let filters = $('input[name="rad_Cars"]:checked');
	filter_list = [];

	for(var i=0;i<filters.length;i++){		
		filter_list.push(filters[i].value);
	}
	for(var i=0;i<CARS_MARKERS.length;i++){		
		let m = CARS_MARKERS[i];
		//if(m.options.category == val){
		if(filter_list.includes(m.options.category)){
			CARS_LAYER.addLayer(m);	
		}
	}	
}

$(window).on('load', function() {
	 
$('.filter').hide();
$('.search_container').hide();
	$('#clearFilter'). click(function(){						
		 resetMap();
	});		
	
	$('input[name="cb_Hirers"]').click(function(){
		if ($(this).is(':checked')) {  
		  map.addLayer(HIRERS_LAYER);
		}else{
		  map.removeLayer(HIRERS_LAYER);			
		}
	});
	
	$('input[name="cb_Cars"]').click(function(){
		if ($(this).is(':checked')) {  
		  map.addLayer(CARS_LAYER);
		}else{
		  map.removeLayer(CARS_LAYER);			
		}
	});	


	
	$('input[name="rad_Cars"]').click(function(){
		filterCar(this.value)
	});		
	//$('input[name="rad_Hires"]').click(function(){
	$('#btnFilterHirers').click(function(){
		filterHirers()
	});		
	/*************************************/
  	
  var documentSettings = {};
  var markerColors = [];

  var polygonSettings = [];
  var polygonSheets = 1;
  var polygonsLegend;

  var completePoints = false;  

  /**
   * Returns an Awesome marker with specified parameters
   */
  function createMarkerIcon(icon, prefix, markerColor, iconColor) {
	  
	return L.AwesomeMarkers.icon({
      icon: icon,
      prefix: prefix,
      markerColor: markerColor,
      iconColor: iconColor	 ,
	  iconSize:     [16, 16], // size of the icon 
	  popupAnchor:  [-3, -25] // point from which the popup should open relative to the iconAnchor
	  
    });
  }


  /**
   * Sets the map view so that all markers are visible, or
   * to specified (lat, lon) and zoom if all three are specified
   */
  function centerAndZoomMap(points) {
    var lat = map.getCenter().lat, latSet = false;
    var lon = map.getCenter().lng, lonSet = false;
    var zoom = 12, zoomSet = false;
    var center;

    if (getSetting('_initLat') !== '') {
      lat = getSetting('_initLat');
      latSet = true;
    }

    if (getSetting('_initLon') !== '') {
      lon = getSetting('_initLon');
      lonSet = true;
    }

    if (getSetting('_initZoom') !== '') {
      zoom = parseInt(getSetting('_initZoom'));
      zoomSet = true;
    }

    if ((latSet && lonSet) || !points) {
      center = L.latLng(lat, lon);
    } else {
      center = points.getBounds().getCenter();
    }

    if (points) {
      zoom = map.getBoundsZoom(points.getBounds());
    }
 
    map.setView(center, zoom);
  }
  ///////////  ///////////  ///////////  ///////////  ///////////  ///////////  ///////////  ///////////
  ///////////  ///////////  ///////////  ///////////  ///////////  ///////////  ///////////  ///////////
  ///////////  ///////////  ///////////  ///////////  ///////////  ///////////  ///////////  ///////////
  
  function mapCars(points) {
    //var layer;
	//var markers = L.markerClusterGroup({
	var markers = L.featureGroup({
			
	});
	var searchData = [];
    // check that map has loaded before adding points to it?
    for (var i in points) {
      var point = points[i];
		
		let t1 = Number(point.Latitude) ;
		let t2 = Number(point.Latitude) ;

      if (
		t1>0 && t1!=NaN && t2>0 && t2!=NaN
	  ) {
		   
		// If icon contains '.', assume it's a path to a custom icon,
		// otherwise create a Font Awesome icon
		    var iconSize =     [32, 32];
			var anchor = [iconSize[0] / 2, iconSize[1]];
			var icon =  L.icon({
				iconUrl: 'img/'+point.Category+'.png',    
				iconSize:     [48, 48], // size of the icon
				shadowSize:   [50, 64], // size of the shadow
				iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
				shadowAnchor: [4, 62],  // the same for the shadow
				popupAnchor:  [-3, -80] // point from which the popup should open relative to the iconAnchor
			});		  		  
			let pointProperties = {
				name:point.Name,								
				latitude:point.Latitude,
				longitude:point.Longitude
			};
			searchData.push(pointProperties);
		 
			 
			var marker = L.marker([point.Latitude, point.Longitude], 
				{
					icon: icon,
					name:point.Name,
					category:point.Category
				}
			)
			.bindPopup("<b>" + point['Name'] + '</b><br>' )
			/*.on('popupopen', function (popup) {			
			});*/
			;      
			$(marker._icon).addClass('marker_visible')
			
			markers.addLayer(marker);
			//marker.addTo(layers[point.Group]);         
			CARS_MARKERS.push(marker);
      }		
    }          
	 
    completePoints = true;
    return markers;
}



function mapHirers(points) {
	
    //var layer;
	/*var markers = L.markerClusterGroup({
		maxClusterRadius:15
	});*/
	var markers = L.featureGroup({		
	});	
	var MAX_NUM_OF_HIRES=0;
	var searchData = [];
    // check that map has loaded before adding points to it?
    for (var i in points) {
      var point = points[i];
		
		if ( MAX_NUM_OF_HIRES<Number(point.Hires))
			MAX_NUM_OF_HIRES = Number(point.Hires);
		
		
		let t1 = Number(point.Latitude) ;
		let t2 = Number(point.Latitude) ;

      if (
		t1>0 && t1!=NaN && t2>0 && t2!=NaN
	  ) {
		   
		// If icon contains '.', assume it's a path to a custom icon,
		// otherwise create a Font Awesome icon
			var iconSize = [32, 32]; 
			var anchor = [iconSize[0] / 2, iconSize[1]];
			let color ="#ff0000";
			
			if(point.Hires<=5){
				color = "#0000ee";//blue
			}
			else if(point.Hires>5 && point.Hires<=10){
				color = "#00ee00";//green
			}
			
			else if(point.Hires>10 && point.Hires<=15){
				color = "#EFFF33";//yellow
			}
			else if(point.Hires>15 && point.Hires<=20){
				color = "#aa0000";//red
			}
			else if(point.Hires>20){
				color = "#0a0a0a";// 			
			}
			
			
			var icon =  createMarkerIcon('', 'fa', color, "white" );		  		  
			let pointProperties = {
				name:point.Name,								
				latitude:point.Latitude,
				hires:point.Hires,
				longitude:point.Longitude
			};
			searchData.push(pointProperties);
		 
			 
			var marker = L.marker([point.Latitude, point.Longitude], 
				{
					icon: icon,
					name:point.Name,
					hires:point.Hires							
				}
			)
			.bindPopup("<b>" + point['Name'] + '</b><br>'
			+ "<b>" + point.Hires + " Hires </b>"
			)
			/*.on('popupopen', function (popup) {			
			});*/
			;          
			markers.addLayer(marker);
			//marker.addTo(layers[point.Group]);         
			HIRERS_MARKERS.push(marker);
      }		
    }          
	  
	ms_search_layer = $('#ms_search_layer').magicSuggest({
		placeholder: "Search",
		data: searchData,
		 
		valueField: 'name',
		displayField: 'name',
		displayFieldAdditional: ['country'],
		allowFreeEntries: false,
		maxSelection: 1,
		highlight: false,
		renderer: function (data) {
			 var html_div = '<div style="padding: 5px; overflow:hidden;">' +
				'<div style="font-family:Roboto;font-weight: bold; color: #333; font-size: 13px; line-height: 11px">' + data.name + '</div>' +
				'<div style="font-family:Roboto;color: #999; font-size: 10px">' + data.hires+ ' Hires</div>' +
			'</div>';
			return html_div;
		}
	});  
	 $(ms_search_layer).on('selectionchange', function () {
		if (this.getSelection().length > 0) {

			var data = this.getSelection()[0];
			
			m = getHirerMarkerByName(data.name);			
			
			center = L.latLng(data.latitude, data.longitude);
			map.setView(center, 18);	
			m.openPopup();
			
			setTimeout(function () {
				$("#ms_search_layer input")[0].setAttribute("placeholder", "");
				$("#ms_search_layer span.ms-helper")[0].style.display = "none";
			}, 1);


		} else {
			 

		}

	});

	$("#ms_search_layer").on('click', 'span.ms-close-btn', function (e) {
		setTimeout(function () {
			ms_search_layer.clear();
		}, 1000);
	});



	 $(".js-range-slider").ionRangeSlider({
        type: "int",
        min: 0,
        max: MAX_NUM_OF_HIRES,
        from: 0,
        to: MAX_NUM_OF_HIRES,
        step: 5
    });
    filter_hirers_range = $(".js-range-slider").data("ionRangeSlider");

    completePoints = true;
    return markers;
}

  ///////////  ///////////  ///////////  ///////////  ///////////  ///////////  ///////////  ///////////
  ///////////  ///////////  ///////////  ///////////  ///////////  ///////////  ///////////  ///////////
  ///////////  ///////////  ///////////  ///////////  ///////////  ///////////  ///////////  ///////////
 
    
   
   /**
   * Here all data processing from the spreadsheet happens
   */
  function onMapDataLoad() {
    var options = mapData.sheets(constants.optionsSheetName).elements;
    createDocumentSettings(options);

    
    document.title = getSetting('_mapTitle');
    addBaseMap();
	let points;
    // Add point markers to the map
    points = mapData.sheets(constants.HirersSheetName);        
    if (points && points.elements.length > 0) { 
      HIRERS_LAYER = mapHirers(points.elements);
	  map.addLayer(HIRERS_LAYER);
    } else {
      completePoints = true;
    }
      // Add point markers to the map
    points = mapData.sheets(constants.CarsSheetName);    
    if (points && points.elements.length > 0) { 
      CARS_LAYER = mapCars(points.elements);
	  map.addLayer(CARS_LAYER);
    } else {
      completePoints = true;
    }    	  
    
	centerAndZoomMap(CARS_LAYER);
	
    // Add location control
    if (getSetting('_mapMyLocation') !== 'off') {
      var locationControl = L.control.locate({
        keepCurrentZoomLevel: true,
        returnToPrevBounds: true,
        position: getSetting('_mapMyLocation')
      }).addTo(map);
    }

    // Add zoom control
    if (getSetting('_mapZoom') !== 'off') {
      L.control.zoom({position: getSetting('_mapZoom')}).addTo(map);
    }

    map.on('zoomend', function() {
      //togglePolygonLabels();
    });

    

    // Change Map attribution to include author's info + urls
    changeAttribution();

    // Append icons to categories in markers legend
    $('#points-legend form label span').each(function(i) {
      var legendIcon = (markerColors[i].indexOf('.') > 0)
        ? '<img src="' + markerColors[i] + '" class="markers-legend-icon">'
        : '&nbsp;<i class="fa fa-map-marker" style="color: '
          + markerColors[i]
          + '"></i>';
      $(this).prepend(legendIcon);
    });

    // When all processing is done, hide the loader and make the map visible
    showMap();

    function showMap() {
      if (completePoints ) { 
        $('#map').css('visibility', 'visible');
        //$('.filter').show();
		$('.filter').css('visibility', 'visible');
		$("footer").show();
        $('.loader').hide();
		$('.search_container').show();		
		$('.filter').show();

        // Open intro popup window in the center of the map
        if (getSetting('_introPopupText') != '') {
          initIntroPopup(getSetting('_introPopupText'), map.getCenter());
        };

       } else {
        setTimeout(showMap, 50);
      }
    }
  }
  
  
  /**
   * Changes map attribution (author, GitHub repo, email etc.) in bottom-right
   */
  function changeAttribution() {
    var attributionHTML = $('.leaflet-control-attribution')[0].innerHTML;
    var credit = 'Developed by <a href="https://farazahmed95.github.io/site/"  target="_blank" />Faraz Ahmed</a>';  
    credit += ' | Map: ' ;
    $('.leaflet-control-attribution')[0].innerHTML = credit + attributionHTML;
  }


  /**
   * Loads the basemap and adds it to the map
   */
  function addBaseMap() {
    var basemap = trySetting('_tileProvider', 'CartoDB.Positron');
    L.tileLayer.provider(basemap, {
      maxZoom: 18
    }).addTo(map);
    L.control.attribution({
      position: trySetting('_mapAttribution', 'bottomright')
    }).addTo(map);
  }

  /**
   * Returns the value of a setting s
   * getSetting(s) is equivalent to documentSettings[constants.s]
   */
  function getSetting(s) {
    return documentSettings[constants[s]];
  }

  

  /**
   * Returns the value of setting named s from constants.js
   * or def if setting is either not set or does not exist
   * Both arguments are strings
   * e.g. trySetting('_authorName', 'No Author')
   */
  function trySetting(s, def) {
    s = getSetting(s);
    if (!s || s.trim() === '') { return def; }
    return s;
  }
 

  /**
   * Triggers the load of the spreadsheet and map creation
   */
   //var mapData;

   $.ajax({	
       url:'csv/Options.csv',
       type:'HEAD',
       error: function() {
         // Options.csv does not exist, so use Tabletop to fetch data from
         // the Google sheet
         mapData = Tabletop.init({
           key: googleDocURL,
           callback: function(data, mapData) { onMapDataLoad(); }
         });
       },
       success: function() {
         // Get all data from .csv files
         mapData = Procsv;
         mapData.load({
           self: mapData,
           tabs: ['Options', 'Points', 'Polygons', 'Polylines'],
           callback: onMapDataLoad
         });
       }
   });

  /**
   * Reformulates documentSettings as a dictionary, e.g.
   * {"webpageTitle": "Leaflet Boilerplate", "infoPopupText": "Stuff"}
   */
  function createDocumentSettings(settings) {
    for (var i in settings) {
      var setting = settings[i];
      documentSettings[setting.Setting] = setting.Customize;
    }
  }

  /**
   * Reformulates polygonSettings as a dictionary, e.g.
   * {"webpageTitle": "Leaflet Boilerplate", "infoPopupText": "Stuff"}
   */
   

   
    

});

function getHirerMarkerByName(name){
	let markers = HIRERS_LAYER.getLayers();
	for(var i=0;i<markers.length;i++){
		let m = markers[i];		
		if( m.options.name == name)				
			return m;
	}
	return null;
}
 