document.addEventListener("click", function (event) {

    let button = event.target.closest("button");

    if (!button) return;

    let audio = new (window.AudioContext || window.webkitAudioContext)();

    let oscillator = audio.createOscillator();
    let gain = audio.createGain();

    oscillator.connect(gain);
    gain.connect(audio.destination);

    oscillator.frequency.value = 700;
    oscillator.type = "sine";

    gain.gain.setValueAtTime(0.2, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(
        0.01,
        audio.currentTime + 0.2
    );

    oscillator.start();
    oscillator.stop(audio.currentTime + 0.2);

    // If button opens another page
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
            }, 300);
        }
    }

}, true);
