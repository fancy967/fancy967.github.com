/*
 * The Interface class keeps track of the GUI. It has a list of components and
 * a global alpha.
 */
function Interface() {
    this.components = [];
}

/*
 * Initializes the interface by creating and positioning all components.
 */
Interface.prototype.init = function() {
    this.components.push(new Status(0, 0, 50, 50));
    this.components.push(new Button(220, 10, "kill", new LifeEvent(0)));
    this.components.push(new Button(320, 10, "heal", new LifeEvent(100)));
    this.components.push(new Button(420, 10, "undo", new UndoEvent()));
    this.components.push(new Button(520, 10, "redo", new RedoEvent()));
    this.components.push(new Slider(620, 5, 260, 40, 0));
};

/*
 * Translates the canvas to the GUI area (the bottom 50 pixels) and calls the
 * draw() method of the components.
 */
Interface.prototype.draw = function() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    context.save();

    context.translate(0, canvas.height - 51);
    context.fillStyle = "rgb(200, 200, 200)";
    context.fillRect(0, 0, canvas.width, 50);

    for (var i = 0; i < this.components.length; ++i) {
        this.components[i].draw(context);
    }

    context.strokeRect(0.5, 0.5, canvas.width - 1, 199);
    context.restore();
};

/*
 * Handles mouse clicks. Delegates the click action to the according component.
 */
Interface.prototype.click = function(x, y) {
    var canvas = document.getElementById("canvas");

    for (var i = 0; i < this.components.length; ++i) {
        if (this.components[i].within(x, y - canvas.height + 50)) {
            // Sliders don't have an event yet, so they're handled explicitly..
            if (this.components[i] instanceof Slider) {
                var c = this.components[i];
                return new SpeedEvent(20+ 100* (x - c.x) / c.w,c);
            }
            return this.components[i].event;
        }
    }
};
