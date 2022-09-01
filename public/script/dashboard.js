const ctx = document.getElementById('myChart1').getContext('2d');
const ctx1 = document.getElementById('myChart2').getContext('2d');
const ctx2 = document.getElementById('myChart3').getContext('2d');
const ctx3 = document.getElementById('myChart4').getContext('2d');
const ctx4 = document.getElementById('myChart5').getContext('2d');

const data = [];
const data2 = [];
let prev = 100;
let prev2 = 80;
for (let i = 0; i < 1000; i++) {
    prev += 5 - Math.random() * 10;
    data.push({x: i, y: prev});
    prev2 += 5 - Math.random() * 10;
    data2.push({x: i, y: prev2});
    }
const totalDuration = 10000;
const delayBetweenPoints = totalDuration / data.length;
const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
const animation = {
    x: {
        type: 'number',
        easing: 'linear',
        duration: delayBetweenPoints,
        from: NaN, // the point is initially skipped
        delay(ctx) {
            if (ctx.type !== 'data' || ctx.xStarted) {
                return 0;
                }
            ctx.xStarted = true;
            return ctx.index * delayBetweenPoints;
            }
        },
    y: {
        type: 'number',
        easing: 'linear',
        duration: delayBetweenPoints,
        from: previousY,
        delay(ctx) {
            if (ctx.type !== 'data' || ctx.yStarted) {
                return 0;
                }
            ctx.yStarted = true;
            return ctx.index * delayBetweenPoints;
            }
        }
    };
const config = {
    type: 'line',
    data: {
        datasets: [{
            label: "Temperaturas 01 [°C]",
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            radius: 0,
            data: data,
            },
            {
            label: "Temperaturas 02 [°C]",
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            radius: 0,
            data: data2,
            }]
            },
            options: {
                animation,
                interaction: {
                    intersect: false
                },
                plugins: {
                    title: {
                        display: true,
                        text: "Temperaturas en la Camara de Secado"
                    }
                },
                scales: {
                    x: {
                        type: 'linear',
                        title: {
                            display: true,
                            text: "Tiempo"
                            }
                    },
                    y: {
                        title: {
                            display: true,
                            text: "Temperatura [°C]"
                        }
                    }
                }
            }
        };
const myChart1 = new Chart(ctx,config);

//Chart.defaults.scales.ticks.beginAtZero = true;

let myChart2 = new Chart(ctx1, {
    type: "radar",
    //labels: ["Temperatura", "pH", "Luminocidad", "4545"],
    data : {
        labels: ["Temperatura", "pH", "Luminocidad"],
        datasets: [{
            label: "Configuración",            
            data: [25, 255, 54],
            fill: true,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgb(255, 99, 132)",
            pointBackgroundColor: "rgb(255, 99, 132)",
            pointBorderColor: "#FFF",
            pointHoverBackgroundColor: "#FFF",
            pointHoverBorderColor: "rgb(255, 99, 132)",
        }]
    },
    options: {
        scales: {r: {ticks: {display: false}}},
        plugins: {legend: {display: false}}
    } 
});

var temp = 23;
var ph = 5.6;
var luminocidad = 80;

const myChart3 = new Chart(ctx2, {
    type: "doughnut",
    data: {
        labels: ["Temperatura [°C]"],
        datasets: [{
            label: "Temperatura",
            data: [temp, 100 - temp],
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
            borderDash: [5, 5],
            borderWidth: 1
        }]
    },
    options: {
        responsive: false,
        plugins: {
            legend: {position: "bottom"},
            title: {
                display: true,
                text: "Temperatura de la Pecera",
                font: {size: 20}
            }
        }
    }
});
const myChart4 = new Chart(ctx3, {
    type: "doughnut",
    data: {
        labels: ["pH"],
        datasets: [{
            label: "pH",
            data: [ph, 14.0 - ph],
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
            borderDash: [5, 5],
            borderWidth: 1
        }]
    },
    options: {
        responsive: false,
        plugins: {
            legend: {position: "bottom"},
            title: {
                display: true,
                text: "pH de la Pecera",
                font: {size: 20}
            }
        }
    }
});
const myChart5 = new Chart(ctx4, {
    type: "doughnut",
    data: {
        labels: ["Luminocidad [%]"],
        datasets: [{
            label: "Luminocidad",
            data: [luminocidad, 100 - luminocidad],
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
            borderDash: [5, 5],
            borderWidth: 1
        }]
    },
    options: {
        responsive: false,
        plugins: {
            legend: {position: "bottom"},
            title: {
                display: true,
                text: "Luminocidad de la Pecera",
                font: {size: 20}
            }
        }
    }
});