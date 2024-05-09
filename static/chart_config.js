/**
 * Filters the given signal by sampling it at a specified period.
 *
 * @param {Array} signal - The signal to be sampled.
 * @param {number} samplePeriod - The period at which the signal should be sampled.
 * @returns {Array} - The sampled signal.
 */
function sampleSignal(signal, samplePeriod) {
    return signal.filter((_, index) => {
        return index % samplePeriod === 0;
    });
}

/**
 * Quantizes the given signal by rounding the y-values to the nearest multiple of the quantization step.
 *
 * @param {Array<{x: number, y: number}>} signal - The signal to be quantized.
 * @param {number} quantizationStep - The step size for quantization.
 * @returns {Array<{x: number, y: number}>} - The quantized signal.
 */
function quantizeSignal(signal, quantizationStep) {
    return signal.map(point => {
        const roundedY = Math.round(point.y / quantizationStep) * quantizationStep;
        return { x: point.x, y: roundedY };
    });
}

/**
 * Draws a chart with the given data.
 * 
 * @param {number[]} originalSignal - The original signal data.
 * @param {number[]} sampledSignal - The sampled signal data.
 * @param {number[]} quantizedSignal - The quantized signal data.
 */
function drawChart(originalSignal, sampledSignal, quantizedSignal) {
    const ctx = document.getElementById('chartContainer');
    if (window.myChart != null) {
        window.myChart.destroy();
    }
    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Diskretizovaný Signál',
                data: quantizedSignal,
                fill: false,
                borderColor: 'red',
                borderWidth: 2,
                pointRadius: 1.7,
                stepped: true,
            }, {
                label: 'Vzorkovaný signál',
                data: sampledSignal,
                fill: false,
                borderColor: 'green',
                borderWidth: 2,
                pointRadius: 1.7,
                stepped: true,
            }, {
                label: 'Původní Signál',
                data: originalSignal,
                fill: false,
                borderColor: 'blue',
                tension: 0,
                pointRadius: 0,
                showLine: true
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                }
            },        
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                }
            }
        }
    });
}

/**
 * Updates the chart with the latest data.
 */
function updateChart() {
    const vzorkovaciPerioda = parseInt(document.getElementById('vzorkovaciPerioda').value);
    const sirkaKvantizacnihoIntervalu = parseFloat(document.getElementById('sirkaKvantizacnihoIntervalu').value);
    const signalFrequency = parseInt(document.getElementById('signalFrequency').value);
    const originalSignal = generateSignal(signalFrequency);
    const sampledSignal = sampleSignal(originalSignal, vzorkovaciPerioda)
    const quantizedSignal = quantizeSignal(sampledSignal, sirkaKvantizacnihoIntervalu);
    if (window.myChart == null) {
        drawChart(originalSignal, sampledSignal, quantizedSignal);
    } else {
        window.myChart.data.datasets[0].data = quantizedSignal;
        window.myChart.data.datasets[1].data = sampledSignal;
        window.myChart.data.datasets[2].data = originalSignal;
        window.myChart.update();
    }
}