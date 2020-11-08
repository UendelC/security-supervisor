const socket = io();

socket.on("Serial-data:", dataSerial => {
	console.log(dataSerial);
});

var initialCoordinates = [-10.5085262, -40.3201187];
let emergency = false;
var mymap = L.map('mapid').setView(initialCoordinates, 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox/streets-v11',
	tileSize: 512,
	zoomOffset: -1,
	accessToken: 'pk.eyJ1IjoidWVuZGVsIiwiYSI6ImNrZ3pjM3V0ZDBtMzkydW1zeWFlNWJ2OHQifQ.m5hstPrMYq2P80nuYTPmTA'
}).addTo(mymap);

var userName = 'Maria da Silva'
emergencyMessage = emergency ? '<br> Socorro, preciso de ajuda' : ''
var userMarkerMesssage = `${userName} ${emergencyMessage}`;
const myCustomColour = 'red'

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
let setIconEmergency = emergency ? {icon: icon} : {};

L.marker(initialCoordinates, setIconEmergency).addTo(mymap)
	.bindPopup(userMarkerMesssage)
	.openPopup();
