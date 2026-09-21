document.addEventListener("click", function (event) {

    let button = event.target.closest("button");

    if (!button) return;

    let audio = new (window.AudioContext || window.webkitAudioContext)();

    let oscillator = audio.createOscillator();
    let gain = audio.createGain();

    oscillator.connect(gain);
    gain.connect(audio.destination);

    oscillator.type = "sine";

    // Soft modern click sound
    oscillator.frequency.setValueAtTime(900, audio.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
        500,
        audio.currentTime + 0.12
    );

    gain.gain.setValueAtTime(0.4, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audio.currentTime + 0.12
    );

    oscillator.start();
    oscillator.stop(audio.currentTime + 0.12);

    // Page navigation
    let code = button.getAttribute("onclick");

    if (code && code.includes("location.href")) {

        let match = code.match(
            /location\.href\s*=\s*['"]([^'"]+)['"]/
        );

        if (match) {
            event.preventDefault();
            event.stopImmediatePropagation();

            setTimeout(function () {
                window.location.href = match[1];
            }, 180);
        }
    }

}, true);
