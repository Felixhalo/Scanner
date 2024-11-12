// script.js

// Initialize Quagga
function startScanner() {
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#interactive'), // The HTML element to use for the video stream
            constraints: {
                facingMode: "environment" // Use the rear camera on mobile devices
            },
        },
        decoder: {
            readers: [
                "code_128_reader", // Add other readers as needed
                "ean_reader",
                "ean_8_reader",
                "code_39_reader",
                "code_39_vin_reader",
                "codabar_reader",
                "upc_reader",
                "upc_e_reader",
                "i2of5_reader"
            ]
        },
    }, function(err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });

    // Attach event listeners
    Quagga.onDetected(function(data) {
        const code = data.codeResult.code;
        console.log("Barcode detected: " + code);
        document.getElementById('result').innerText = "Detected Barcode: " + code;
        Quagga.stop(); // Stop scanning after a successful detection
    });
}

// Start the scanner when the page is loaded
window.addEventListener('load', startScanner);
