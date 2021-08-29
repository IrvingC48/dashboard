const doCharts = async () => {

    clearCharts()

    const fechaStart = document.getElementById('fechaInicio').value;
    const fechaEnd = document.getElementById('fechaFin').value;
    const country = document.getElementById('pais').value;

    const allData = await getDataCovid(country);

    const { confirmed, deaths, recovery } = filterbyTotal(
        allData[0].data, allData[1].data, allData[2].data, fechaStart, fechaEnd);

    const dConfirmed = transformData(allData[0].data, fechaStart, fechaEnd);
    const dDeaths = transformData(allData[1].data, fechaStart, fechaEnd);
    const dRecovery = transformData(allData[2].data, fechaStart, fechaEnd);

    cargarDatos(confirmed, deaths, recovery, dConfirmed, dDeaths, dRecovery);
};

const cargarDatos = (tContagiados, tRecuperados, tMuertos, datesConfirmed, datesDeaths, datesRecovery) => {

    const acu = document.getElementById('acumulado').getContext('2d');
    const distCasos = document.getElementById('distCasos').getContext('2d');
    const distMuertes = document.getElementById('distMuertes').getContext('2d');
    const distRecuperados = document.getElementById('recuperados').getContext('2d');

    const acumulado = new Chart(acu, {
        type: 'bar',
        data: {
            labels: ['Contagiados', 'Recuperados', 'Muertos'],
            datasets: [{
                label: 'No.Personas',
                data: [tContagiados, tRecuperados, tMuertos],
                backgroundColor: [
                    'rgba(52, 99, 247, 1)',
                    'rgba(52, 247, 96, 1)',
                    'rgba(247, 52, 52, 1)'
                ],
                borderColor: [
                    'rgba(52, 99, 247, 1)',
                    'rgba(52, 247, 96, 1)',
                    'rgba(247, 52, 52, 1)'
                ],
                borderWidth: 1,
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Acumulado Infecciones Covid-19',
                fontSize:25,
            },
            legend: {
                position: 'top',
                align: 'end',
            }
        }
    });

    const distribucion = new Chart(distCasos, {
        type: 'line',
        data: {
            labels: Object.keys(datesConfirmed),
            datasets: [{
                label: 'No.Personas',
                data: Object.values(datesConfirmed),
                fill: false,
                backgroundColor: ['rgba(52, 99, 247, 1)'],
                borderColor: ['rgba(52, 99, 247, 1)'],
                borderWidth: 1,
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Distribucion Casos Covid-19',
                fontSize:25,
            },
            legend: {
                position: 'top',
                align: 'end',
            }
        }
    });

    const muertes = new Chart(distMuertes, {
        type: 'line',
        data: {
            labels: Object.keys(datesDeaths),
            datasets: [{
                label: 'No.Personas',
                data: Object.values(datesDeaths),
                fill: false,
                backgroundColor: ['rgba(217, 60, 35, 1)'],
                borderColor: ['rgba(217, 60, 35, 1)'],
                borderWidth: 1,
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Muertes por Covid-19',
                fontSize:25,
            },
            legend: {
                position: 'top',
                align: 'end',
            }
        }
    });

    const recus = new Chart(distRecuperados, {
        type: 'line',
        data: {
            labels: Object.keys(datesRecovery),
            datasets: [{
                label: 'No.Personas',
                data: Object.values(datesRecovery),
                fill: false,
                backgroundColor: ['rgba(0, 210, 50, 1)'],
                borderColor: ['rgba(0, 210, 50, 1)'],
                borderWidth: 1,
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Recuperados de Covid-19',
                fontSize:25,
            },
            legend: {
                position: 'top',
                align: 'end',
            }
        }
    })
};

const clearCharts = () => {
    document.getElementById("c1").innerHTML = '<canvas id="acumulado" height="200"></canvas>';
    document.getElementById("c2").innerHTML = '<canvas id="distCasos" height="200"></canvas>';
    document.getElementById("c3").innerHTML = '<canvas id="distMuertes" height="200"></canvas>';
    document.getElementById("c4").innerHTML = '<canvas id="recuperados" height="200"></canvas>';
};