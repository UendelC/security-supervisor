const socket = io();
let info = {};
let count = 0;
let lastCoordinates = [0,0];
var markers = [];


var mymap = L.map('mapid').setView([-9.4, -40.5], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox/streets-v11',
	tileSize: 512,
	zoomOffset: -1,
	accessToken: 'pk.eyJ1IjoidWVuZGVsIiwiYSI6ImNrZ3pjM3V0ZDBtMzkydW1zeWFlNWJ2OHQifQ.m5hstPrMYq2P80nuYTPmTA'
}).addTo(mymap);


socket.on("Serial-data:", dataSerial => {	
	info = {
		time: dataSerial.value.time,
		lat: dataSerial.value.lat,
		lon: dataSerial.value.lon,
		valid: dataSerial.value.valid,
	}
	
	if (typeof info.lat !== 'undefined') {
		var initialCoordinates = [info.lat,info.lon];
		console.log(info.lat, info.lon);
		emergencyMessage = '<br> Socorro, preciso de ajuda';
		var userMarkerMesssage = `${emergencyMessage}`;
		const myCustomColour = 'red';

		const markerHtmlStyles = `
			background-color: ${myCustomColour};
			width: 3rem;
			height: 3rem;
			display: block;
			left: -1.5rem;
			top: -1.5rem;
			position: relative;
			border-radius: 3rem 3rem 0;
			transform: rotate(45deg);
			border: 1px solid #FFFFFF`

		const icon = L.divIcon({
			className: "my-custom-pin",
			iconAnchor: [0, 24],
			labelAnchor: [-6, 0],
			popupAnchor: [0, -36],
			html: `<span style="${markerHtmlStyles}" />`
		})

		// O estilo do icone em caso de emergência deve ser melhorado
		let setIconEmergency = {icon: icon};

		for (let i = 0; i < markers.length - 1; i++) {
			mymap.removeLayer(markers[i]);
		}
		if(lastCoordinates[0] !== initialCoordinates[0] && initialCoordinates[1] !== lastCoordinates[1]){
			lastCoordinates = initialCoordinates;
			mymap.setView(lastCoordinates, 16, {
				"animate": true,
				"pan": {
				  "duration": 10
				}});
			let marker1 = L.marker(initialCoordinates, setIconEmergency)
				.addTo(mymap)
				.bindPopup(userMarkerMesssage)
				.openPopup();

			markers.push(marker1);
		} 
	}
});

