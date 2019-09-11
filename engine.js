

started = false;
let cols,rows;
let w = 40

let grid = [];
// let grid = JSON.parse('')

let current;

let stack = [];


function setup(){
    createCanvas(800,800);
    cols = floor(width/w);
    rows = (height/w);
    frameRate(10)

    for(let j = 0;j<rows;j++){
        for(let i =0;i<cols;i++){
            let cell = new Cell(i,j);
            grid.push(cell);
        }
    }
    current = grid[2];
}

function draw(){
    console.log('drawing')
    background(51);
    for(let i =0;i<grid.length;i++){
        grid[i].show();
    }
    current.visited = true;
    current.highlight();
    
    let next =  current.checkNeighbors();
    if(next){
        next.visited=true;

        stack.push(current);

        removeWalls(current,next);
        current = next;
    }else if(stack.length>0){
        current = stack.pop();
    }else{
        // console.log(grid);
        // return;
    }
}

function index(i,j){
    if(i<0 || j<0 || i>cols-1 || j>rows-1){
        return -1;
    }
    return i+j*cols;
}

function Cell(i,j){
    this.i = i;
    this.j = j;
    this.visited = false;
    this.walls = [true,true,true,true];
    this.highlight  = function(){
        let x = this.i*w;
        let y  = this.j*w;
        noStroke();
        fill(255,0,255,100);
        rect(x,y,w,w);
    }
    this.checkNeighbors = ()=>{
        let neighbors = [];
        let top = grid[index(i,j-1)];
        let right = grid[index(i+1,j)]
        let bottom = grid[index(i,j+1)]
        let left = grid[index(i-1,j)]

        if(top && !top.visited){
            neighbors.push(top);
        }
        if(right && !right.visited){
            neighbors.push(right);
        }
        if(bottom && !bottom.visited){
            neighbors.push(bottom);
        }
        if(left && !left.visited){
            neighbors.push(left);
        }
        if(neighbors.length >0){
            let r = floor(random(0,neighbors.length));
            return neighbors[r];
        }else{
            return undefined;
        }

    }
    this.show = function(){
        let x = this.i*w;
        let y = this.j*w;
        stroke(255);
    
        // drawing lines around the cell
        if(this.walls[0]){
            line(x,y,x+w,y);} //top
        if(this.walls[1]){
            line(x+w,y,x+w,y+w);} //right
        if(this.walls[2]){
            line(x+w,y+w,x,y+w);} //bottom
        if(this.walls[3]){
            line(x,y,x,y+w);} // left
        if(this.visited){
            noStroke();
            fill(0,0,255,100);
            rect(x,y,w,w);}
    }
}

removeWalls = function(a,b){
    let x = a.i - b.i;
    let y = a.j - b.j;
    if(x===1){
        a.walls[3] = false;
        b.walls[1] = false
    }else if(x ===-1){
        a.walls[1]=false;
        b.walls[3]=false;
    }
    if(y===1){
        a.walls[0] = false;
        b.walls[2] = false
    }else if(y ===-1){
        a.walls[2]=false;
        b.walls[0]=false;
    }
    
}

