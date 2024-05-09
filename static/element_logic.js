

/**
 * Event listener for the 'change' event on the 'vzorkovaciPerioda' input element.
 * Calls the updateChart function if autoUpdate is enabled.
 */
document.getElementById('vzorkovaciPerioda').addEventListener('change', function() {
    if (autoUpdate) {
        updateChart();
    }
});

/**
 * Event listener for the 'change' event on the 'sirkaKvantizacnihoIntervalu' input element.
 * Calls the updateChart function if autoUpdate is enabled.
 */
document.getElementById('sirkaKvantizacnihoIntervalu').addEventListener('change', function() {
    if (autoUpdate) {
        updateChart();
    }
});

/**
 * Event listener for the 'change' event on the 'signalFrequency' input element.
 * Calls the updateChart function if autoUpdate is enabled.
 */
document.getElementById('signalFrequency').addEventListener('change', function() {
    if (autoUpdate) {
        updateChart();
    }
});

/**
 * Event listener for the 'change' event on the 'autoUpdateCheckbox' input element.
 * Updates the autoUpdate variable and calls the updateChart function if autoUpdate is enabled.
 */
document.getElementById('autoUpdateCheckbox').addEventListener('change', function() {
    autoUpdate = this.checked;
    if (autoUpdate) updateChart();
});

/**
 * Determines whether the chart should auto-update.
 * @type {boolean}
 */
var autoUpdate = true;

// Call the updateChart function on page load
document.onload = updateChart();

// Call the updateChart function when the flask updates
flask.onUpdate(function() {
    if (autoUpdate) {
        updateChart();
    }
});

// Show the modal on page load
window.addEventListener('DOMContentLoaded', function() {
    var modal = new bootstrap.Modal(document.getElementById('documentationModal'));
    modal.show();
});