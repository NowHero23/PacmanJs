
export class Loop {

    #last = performance.now();
    #fps = 60;
    #slomo = 1; // slow motion multiplier
    #step = 1 / this.#fps;
    #slowStep = this.#slomo * this.#step;
    #dt = 0;
    #now;

    constructor(_update, _display){
        this.update = _update;
        this.display = _display;

        this.deltaTime = 0;
        this.lastUpdate = 0;
        this.maxInterval = 40;
        this.timeSec = 0;

        console.log(`#fps = ${this.#fps}`);
        console.log(`#slomo = ${this.#slomo}`);
        console.log(`#step = ${this.#step}`);
        console.log(`#slowStep = ${this.#slowStep}`);
       
        this.animate = this.animate.bind(this);
        this.animate();
    }

    animate() {
        this.#now = performance.now();
        this.#dt = this.#dt + Math.min(1, (this.#now - this.#last) / 1000);
        while(this.#dt > this.#slowStep) {
            this.#dt = this.#dt - this.#slowStep;
            this.update(this.#step);
        }
        this.#last = this.#now;
      
        this.display(this.#dt / this.#slomo * this.#fps);
        

        requestAnimationFrame(this.animate);
    }

}