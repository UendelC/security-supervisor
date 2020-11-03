const socket = io();
let counter = 2;
socket.on("Serial-data:", dataSerial => {

    myChart.data.labels.push(counter);
    if (dataSerial.value.indexOf(" %") != -1) {
        myChart.data.datasets[1].data.push(parseFloat(dataSerial.value.replace(" %", "")));
    }
    if (dataSerial.value.indexOf(" *C") != -1) {
        myChart.data.datasets[0].data.push(parseFloat(dataSerial.value.replace(" ºC", "")));
    }
    myChart.data.datasets[0].data.push(dataSerial.value.replace("Saida A0:", ""));
    counter = counter + 1;
    myChart.update();
});

var ctx = document.getElementById('meuGrafico').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Som',
            data: [],
            backgroundColor: [
                'rgba(255, 0, 0, 0.2)'
            ],
            borderColor: [
                'rgba(255, 0, 0, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                id: "T",
                type: "linear",
                position: "left",
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});