document.addEventListener("click", function (event) {

    if (event.target.closest("button")) {

        const audio = new (window.AudioContext || window.webkitAudioContext)();

        const oscillator = audio.createOscillator();
        const gain = audio.createGain();

        oscillator.connect(gain);
        gain.connect(audio.destination);

        oscillator.frequency.value = 700;
        oscillator.type = "sine";

        gain.gain.setValueAtTime(0.2, audio.currentTime);
        gain.gain.exponentialRampToValueAtTime(
            0.01,
            audio.currentTime + 0.15
        );

        oscillator.start();
        oscillator.stop(audio.currentTime + 0.15);
    }

});
