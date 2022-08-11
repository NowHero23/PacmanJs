export class Pacman {
    #isOpened = true;
    constructor({position, velocity, blockSize, ctx}){
        this.position = position;
        this.velocity = velocity;    
        this.radius = blockSize/2-.7;
        this.ctx = ctx;

        this.radians = 0.75;
        this.openRate = 5;
        this.rotation = 0;
        this.speed = 100;

        this.update = this.update.bind(this)
        this.display = this.display.bind(this)
    }

    update(correction){  
        this.position.x += this.velocity.x * correction;
        this.position.y += this.velocity.y * correction;

        if(this.velocity.x > 0) this.rotation = 0
        else if(this.velocity.x < 0) this.rotation = Math.PI
        else if(this.velocity.y > 0) this.rotation = Math.PI / 2
        else if(this.velocity.y < 0) this.rotation = Math.PI * 1.5

        if (this.radians < 0)
            this.#isOpened = true
        else if(this.radians > 0.75)
            this.#isOpened = false
        
        this.radians += ((this.#isOpened)? this.openRate : -this.openRate ) * correction
    }

    display(debagMode = false){
        if (debagMode) {
            this.ctx.context.strokeStyle = "green";
            this.ctx.context.strokeRect(this.position.x - this.radius, this.position.y - this.radius, this.radius*2, this.radius*2); 
        }

        this.ctx.context.save()
        this.ctx.context.translate(this.position.x,this.position.y)
        this.ctx.context.rotate(this.rotation)
        this.ctx.context.translate(-this.position.x,-this.position.y)

        this.ctx.context.beginPath();

        this.ctx.context.arc(
            this.position.x, 
            this.position.y, 
            this.radius, 
            this.radians, 
            Math.PI * 2 - this.radians);
        
        this.ctx.context.lineTo(this.position.x, this.position.y)

        this.ctx.context.fillStyle = 'yellow';
        this.ctx.context.fill();
        this.ctx.context.closePath();
        this.ctx.context.restore();
    }

}

export class Pellet {
    constructor({position, blockSize, ctx}){
        this.position = position;
        this.radius = blockSize/10;
        this.color = 'white';
        this.ctx = ctx;
    }
    display(){
        this.ctx.context.beginPath();

        this.ctx.context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2);
        this.ctx.context.fillStyle = this.color;
        this.ctx.context.fill();

        this.ctx.context.closePath();              
    }
}

export class RedGhost{
    #target;
    constructor({position, velocity, blockSize, ctx, field}){
        this.position = position;
        this.velocity = velocity;
        this.radius = blockSize/2-.7;
        this.ctx = ctx;
        this.blockSize = blockSize
        this.field = field

        this.speed = 100;

        this.update = this.update.bind(this)
        this.display = this.display.bind(this)

        this.bfs = this.bfs.bind(this)
        

        this.Path = [];

        this.lastMove=""
    }

    #dist({target, self}){
        return Math.sqrt((target.x - self.x) ** 2 + (target.y - self.y) ** 2);
    }

    bfs(){  // #dist({target, self}) та bfs({t, s field}) у майбутньому планую винести аби використовувати а різних Ghost'ах
        let field = this.field
        let delta = [{x:0, y:-1}, {x:0, y:1}, {x:-1, y:0}, {x:1, y:0}]

        let t = {
            x: Math.round((this.#target.position.x + this.#target.radius) / this.blockSize)-1,
            y: Math.round((this.#target.position.y + this.#target.radius) / this.blockSize)-1
        };
        let s = {
            x: Math.round((this.position.x + this.radius) / this.blockSize)-1,
            y: Math.round((this.position.y + this.radius) / this.blockSize)-1
        };
        
        let openList = []
       
        let masArr = []
        let used = []
        let resultArr = []

        for (let y = 0; y < this.field.length; y++) {
            let path = []
            let arr = []
            for (let x = 0; x < this.field[y].length; x++) {
                arr.push(false);
                path.push(Infinity);
            }
            used.push(arr)
            masArr.push(path)
        }
        let cur = {
            x: s.x,
            y: s.y,
            massa: 0,
            used: false,
            from: {
                x: -1,
                y: -1
            }
        };

        masArr[s.y][s.x] = 0;
        used[s.y][s.x] = false;  
        openList.push(cur)

        try {
        while (openList.length != 0) {
            if (cur.used) {
                let min = Infinity;
                let index =Infinity;
                let mas = openList.filter((item)=>{
                    return (item.used == false);
                });
                for (let i = 0; i < mas.length; i++) {
                    const element = mas[i];
                    if (min>element.massa) {
                        index=i;
                        min=element.massa;
                    }
                }
                cur = mas[index];
                cur.massa = masArr[cur.y][cur.x];
                cur.used = used[cur.y][cur.x];
            }
           
            delta.forEach(delt => {
                let nx = cur.x + delt.x;
                let ny = cur.y + delt.y;
            
                if (nx < 0 && field[ny][nx+1] == 4) nx = field[0].length-1;
                else if(nx > field[0].length-1 && field[ny][nx-1] == 4) nx = 0;

                if (field[ny][nx] != 1 && !used[ny][nx]) {
                    let mass = cur.massa + 10 * (this.#dist({target: t, self:{x: nx, y: ny}})*10)
                    openList.push({
                        x: nx,
                        y: ny,
                        massa: mass,
                        used: false,
                        from:{
                            x: cur.x,
                            y: cur.y
                        }
                    });
                    masArr[ny][nx] = mass;
                    used[ny][nx] = true;
                }
                
            })

            cur.used = true;
            resultArr.push(cur);
            if(cur.x == t.x && cur.y == t.y){
                break;
            }
        }

        let Path = []

        let element = resultArr[resultArr.length-1];
        for (;;) {
            
            Path.push({x: element.x *this.blockSize+ this.radius, y: element.y*this.blockSize+ this.radius})
            if (element.x == s.x && element.y == s.y) {
                break;
            }
            element = resultArr.find((e)=>{
                return (e.x == element.from.x && e.y == element.from.y)
            })
        }
        this.Path = Path.reverse()
        } catch (error) {
        
        }
    }

    updateTarget(){}

    update({correction, pacman}){     
        this.#target = pacman
        this.bfs()
        
        //this.Path.shift()
       

        if(this.Path.length > 1){//1
            let thisMove;

            let XXX = .3 < ((Math.max(this.position.x.toFixed(1), this.Path[1].x.toFixed(1)))-(Math.min(this.position.x.toFixed(1), this.Path[1].x.toFixed(1)))).toFixed(1)
            let YYY = .3 < ((Math.max(this.position.y.toFixed(1), this.Path[1].y.toFixed(1)))-(Math.min(this.position.y.toFixed(1), this.Path[1].y.toFixed(1)))).toFixed(1)

            if (Math.floor(this.Path[1].x.toFixed(1)) <= Math.floor(this.position.x.toFixed(1)) && XXX) {//
                this.velocity.x = -this.speed;
                this.velocity.y = 0;
                console.log(thisMove="left");
            }else if(Math.floor(this.Path[1].x.toFixed(1)) >= Math.floor(this.position.x.toFixed(1)) && XXX) {//
                this.velocity.x = this.speed;
                this.velocity.y = 0;
                console.log(thisMove="right");
            }
            else if(Math.floor(this.Path[1].y.toFixed(1)) >= Math.floor(this.position.y.toFixed(1)) && YYY){//
                this.velocity.x = 0;
                this.velocity.y = this.speed;
                console.log(thisMove="down");    
            }
            else if (Math.floor(this.Path[1].y.toFixed(1)) <= Math.floor(this.position.y.toFixed(1)) && YYY) {//
                this.velocity.x = 0;
                this.velocity.y = -this.speed;
                console.log(thisMove="up");
            }

            if (this.lastMove != thisMove) {
                //console.log(this.position);
                //console.log(((Math.max(this.position.x.toFixed(1), this.Path[1].x.toFixed(1)))-(Math.min(this.position.x.toFixed(1), this.Path[1].x.toFixed(1)))).toFixed(1));
            }

        }
            
        this.position.x += this.velocity.x * correction;
        this.position.y += this.velocity.y * correction;
    }

    display(debagMode = false){
        if (debagMode) {
            this.ctx.context.fillStyle = 'green';
            this.ctx.context.fillRect(this.position.x - this.radius-2, this.position.y - this.radius-1, this.radius*2+3, this.radius*2+3);
            this.ctx.context.clearRect(this.position.x - this.radius, this.position.y - this.radius, this.radius*2, this.radius*2);  
        
            this.ctx.context.beginPath();

            this.ctx.context.moveTo(this.position.x, this.position.y);
            this.ctx.context.lineWidth = this.radius/2;
            this.ctx.context.strokeStyle="red"
            
            for (let index = 1; index <this.Path.length; index++) {
                const tile = this.Path[index];
                this.ctx.context.lineTo(tile.x, tile.y)
            }
            this.ctx.context.stroke();
            this.ctx.context.closePath();
        }


        this.ctx.context.beginPath();
        this.ctx.context.arc(
            this.position.x, 
            this.position.y, 
            this.radius, 
            0, 
            Math.PI * 2);
        
        this.ctx.context.lineTo(this.position.x, this.position.y)

        this.ctx.context.fillStyle = 'Red';
        this.ctx.context.fill();
        this.ctx.context.closePath();
    }
}