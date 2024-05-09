const SIGNAL_TIME_STEP = 0.001;

var last = 0;
const flask = new CodeFlask('.code-editor', { language: 'js', lineNumbers: false });

/**
 * Updates the code with the example at the specified index and updates the chart.
 * @param {number} index - The index of the example to use.
 */
function example(index) {
    const examples = [
        "t % (1/period)",
        "Math.sin(2 * Math.PI * period * t)",
        "Math.pow(2, t)",
        "Math.abs(5 * (t - 0.3) * (t - 0.7))",
        "Math.pow(1 - t, 3) * (-1) + 3 * Math.pow(1 - t, 2) * t * (3) + 3 * (1 - t) * Math.pow(t, 2) * (-2) + Math.pow(t, 3) * (1)",
        "Math.random() * 1;",
        "Math.sin(2 * Math.PI * period * t) + (Math.random() - 0.5) * 0.3",
        "last = last + (Math.random() - 0.5) * 0.1",
        "Math.sin(2 * Math.PI * period * t) + (last = last + (Math.random() - 0.5) * 0.1)"
    ];
    flask.updateCode(examples[index]);
    updateChart();
}
example(8);
const codeEditor = document.getElementsByClassName('code-editor')[0];
codeEditor.children[0].style = "position: relative; width: 100%; height: 80px;";

/**
 * Generates a signal based on the given period.
 * @param {number} period - The period of the signal.
 * @returns {Array} An array of points representing the signal.
 */
function generateSignal(period) {
    last = 0;
    const functionCode = "function customSignal(t, period) {\n  return " + flask.getCode() + ";\n}";
    const points = [];
    // Check if the function is valid
    try {
        const signalFunction = new Function('t', 'period', `${functionCode}; return customSignal(t, period);`);
        for (let t = 0; t <= 1; t += SIGNAL_TIME_STEP) {
            points.push({x: t, y: signalFunction(t, period)});
        }
        document.getElementById('errorInCode').style.display = 'none';
    } catch (e) {
        document.getElementById('errorInCode').style.display = 'inline';
        return;
    }
    return points;
}