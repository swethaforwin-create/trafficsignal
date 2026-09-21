document.addEventListener("click", function (event) {

    if (event.target.tagName === "BUTTON" ||
        event.target.closest("button")) {

        let sound = new Audio();

        // Button click sound
        sound.src = "https://actions.google.com/sounds/v1/ui/click.ogg";

        sound.play();
    }

});
