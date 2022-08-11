export class Rect{
    constructor({position, size, velocity, ctx}){
        this.position = position;
        this.size = size;
        this.velocity = velocity;
        this.ctx = ctx;

        this.update = this.update.bind(this)
        this.display = this.display.bind(this)    
    }

    update(correction){
        if (this.position.x <= 0 && this.velocity.x < 0|| this.position.x + this.size.width > this.ctx.width) {
            this.velocity.x = -this.velocity.x
        }
        if (this.position.y <= 0 && this.velocity.y < 0|| this.position.y + this.size.height > this.ctx.height) {
            this.velocity.y = -this.velocity.y
        }

        this.position.x += this.velocity.x * correction;
        this.position.y += this.velocity.y * correction;
    }
    display(){
        this.ctx.context.beginPath();
        this.ctx.context.fillStyle='orange';
        this.ctx.context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height)
        this.ctx.context.closePath();
    }
}