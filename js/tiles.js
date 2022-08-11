export class Wall{  
    #map=[
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],]

    constructor({position, blockSize, ctx, level}){ 
        this.position = position;
        this.w = blockSize;
        this.h = blockSize;
        this.ctx = ctx;

        this.update = this.update.bind(this)
        this.display = this.display.bind(this) 
        this.update(level);
    }
    update(level){

        if(this.position.x == 0 || level.field[this.position.y / this.h][this.position.x / this.w-1] == 1){
            this.#map[1][0] = 1
            this.#map[2][0] = 1
            if(this.position.y == 0 || level.field[this.position.y / this.h-1][this.position.x / this.w] == 1){
                this.#map[0][0] = 1
            }
            try {
                if(this.position.y/this.h == level.field[0].length-1 || (this.position.y/this.h <= level.field[this.position.y/this.h].length + 2  && level.field[this.position.y/this.h+1][this.position.x/this.w] == 1)
                ){
                    this.#map[3][0] = 1
                }
            } catch (e) {
                this.#map[3][0] = 1
            }
        }
        if(this.position.x / this.w == level.field[0].length-1 || level.field[this.position.y / this.h][this.position.x / this.w+1] == 1){
            this.#map[1][3] = 1
            this.#map[2][3] = 1

            if(this.position.y == 0 || level.field[this.position.y / this.h-1][this.position.x / this.w] == 1){
                this.#map[0][3] = 1
                
            }
            
            try {
                if(this.position.y/this.h == level.field[0].length + 1 || (this.position.y/this.h <= level.field[this.position.y/this.h].length & level.field[this.position.y/this.h+1][this.position.x/this.w] == 1)
                ){
                    this.#map[3][3] = 1
                }
            } catch (e) {
                this.#map[3][3] = 1
            }
        }
        if(this.position.y == 0 || level.field[this.position.y / this.h-1][this.position.x /this.w] == 1){                    
            this.#map[0][1] = 1
            this.#map[0][2] = 1
        }
        if(this.position.y/this.h == level.field.length-1 || level.field[this.position.y / this.h+1][this.position.x/this.w] == 1){                   
            this.#map[3][1] = 1
            this.#map[3][2] = 1

            if(this.position.x == level.field[this.position.y/this.h].length-1 
            || level.field[this.position.y/this.h][this.position.x/this.w+1] == 1){
                this.#map[2][3] = 1
                this.#map[1][3] = 1
            }
        }  


        if (this.#map[0][1] == 1 && this.#map[1][0] == 1 || this.#map[1][0] == 1 && this.#map[1][3] == 1 || this.#map[0][1] == 1 && this.#map[3][1] == 1 ||  
            (level.field[this.position.y / this.h][this.position.x / this.w-1] == 2 ||level.field[this.position.y / this.h][this.position.x / this.w+1] == 2)) {           
            this.#map[1][1] = 1
        }
        if (this.#map[0][2] == 1 && this.#map[1][3] == 1 || this.#map[1][0] == 1 && this.#map[1][3] == 1 || this.#map[0][2] == 1 && this.#map[3][2] == 1 ||   
            (level.field[this.position.y / this.h][this.position.x / this.w-1] == 2 ||level.field[this.position.y / this.h][this.position.x / this.w+1] == 2)) {           
            this.#map[1][2] = 1  
        }
        if (this.#map[2][0] == 1 && this.#map[3][1] == 1 || this.#map[2][0] == 1 && this.#map[2][3] == 1 || this.#map[0][1] == 1 && this.#map[3][1] == 1 ||  
            (level.field[this.position.y / this.h][this.position.x / this.w-1] == 2 ||level.field[this.position.y / this.h][this.position.x / this.w+1] == 2)) {           
            this.#map[2][1] = 1  
        }
        if (this.#map[3][2] == 1 && this.#map[2][3] == 1 || this.#map[2][0] == 1 && this.#map[2][3] == 1 || this.#map[0][2] == 1 && this.#map[3][2] == 1 ||    
            (level.field[this.position.y / this.h][this.position.x / this.w-1] == 2 ||level.field[this.position.y / this.h][this.position.x / this.w+1] == 2)) {           
            this.#map[2][2] = 1
        }

    }

    display(debagMode = false){
        this.#map.forEach((row, y) => {
            row.forEach((element, x) => {
                if (element == 1) {
                    this.ctx.context.fillStyle = 'blue';
                    this.ctx.context.fillRect(
                        this.position.x + (x * this.w / this.#map.length), 
                        this.position.y + (y * this.h / this.#map.length),
                        this.w / this.#map.length, 
                        this.h / this.#map.length);
                }
                else if (debagMode && element==0) {
                    this.ctx.context.fillStyle = 'white';
                    this.ctx.context.fillRect(this.position.x + (x * this.w / 4), this.position.y + (y * this.h / 4), this.w / 4, this.h / 4);
                }
            });
        });
    }
}

export class GhostLair{
    #IsShow = false
    constructor({position, blockSize, ctx, level}){
        this.position = position;
        this.w = blockSize;
        this.h = blockSize;
        this.ctx = ctx;

        this.update = this.update.bind(this)
        this.display = this.display.bind(this) 
        this.update(level)
    }
    update(level){
        this.#IsShow = ((level.field[this.position.y / this.h][this.position.x / this.w - 1] == 1 || level.field[this.position.y / this.h][this.position.x / this.w + 1] == 1) 
        && level.field[this.position.y / this.h - 1][this.position.x / this.w] == 4)
        
    }
    display(debagMode = false){
        if (debagMode) {
            this.ctx.context.strokeStyle = "white";
            this.ctx.context.strokeRect(this.position.x, this.position.y, this.w, this.h);
        }
        
        if (this.#IsShow) {
            this.ctx.context.fillStyle = 'orange';
            this.ctx.context.fillRect(this.position.x - this.w / 2, this.position.y + (this.w / 3), this.w * 2, this.h / 3);
        }
    }
}