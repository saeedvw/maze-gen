function getRandInt(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}

w = 10;
function Cell(i,j){
    this.i = i;
    this.j = j;
    this.visited = false;
    this.walls = {
        top:true,
        bottom:true,
        left:true,
        right:true
    };
    this.show = function(){
        let x = this.i*w;
        let y = this.j*w;
        stroke(255);
    
        // drawing lines around the cell
        if(this.walls.top){
            line(x,y,x+w,y);} //top
        if(this.walls.right){
            line(x+w,y,x+w,y+w);} //right
        if(this.walls.bottom){
            line(x+w,y+w,x,y+w);} //bottom
        if(this.walls.left){
            line(x,y,x,y+w);} // left
        if(this.visited){
            noStroke();
            fill(255,0,255,100);
            rect(x,y,w,w);}
    }
    this.removeWalls =function(next){
        let x = this.i - next.i;
        let y = this.j - next.j;
        if(x===-1){
            this.wals.right =false;
            next.wals.left = false;
        }else if(x===1){
            this.wals.left = false;
            next.wals.right = false;
        }
        if(y===1){
            this.wals.bottom = false;
            next.wals.top=false;
        }else if(y===-1){
            this.wals.top=false;
            next.wals.bottom = false;
        }

    }
    this.checkNs = (grid)=>{
        let ns = [];
        let top = grid[j-1][i];
        let bottom = grid[j+1][i];
        let right = grid[j][i+1]
        let left = grid[j][i-1];
        if(!top.visited){
            ns.push(top);
        }
        if(!bottom.visited){
            ns.push(bottom);
        }
        if(!right.visited){
            ns.push(right);
        }
        if(!left.visited){
            ns.push(left);
        }
        if(ns.length>0){
            let r =getRandInt(0,ns.length);
            return ns[r];
        }else{
            return undefined;
        }
        
    }
}

let grid = [];
// for(let j=0;j<40;j++){
//     for(let i =0;i<40;i++){
//         let cell = new Cell(i,j);
//         grid.push([])
//         grid[i].push(cell);
//     }
// }

generateMaze=(current,h=400,w=400,cw=40,grid=null,inital=false)=>{
    if(!current){
        current = grid[0][0];
        current.visited = true;
        let next = current.checkNs(grid);
        if(next){
            next.visited=true;
            stack.push(current);
            current.removeWalls(next);
            current = next;
            generateMaze(current=next,grid=grid);
        }else if(stack.length>0){
             
            generateMaze(current=stack.pop(),grid=grid);
        }
    }else{
        current.visited = true;
        let next = current.checkNs(grid);
        if(next){
            next.visited=true;
            stack.push(current);
            current.removeWalls(next);
            current = next;
            generateMaze(current=current,grid=grid);
        }else if(stack.length>0){
            current = stack.pop()
            generateMaze(current=current,grid=grid);
        }else{
            return;
        }
    }
}
// width = 400;
// height = 400;
function setup(w=10){
    createCanvas(400,400);
    cols = floor(width/w);
    rows = (height/w);
    frameRate(10000)

    for(let j = 0;j<rows;j++){
        for(let i =0;i<cols;i++){
            let cell = new Cell(i,j);
            // grid.push(cell);
            grid.push([])
            grid[i].push(cell);
        }
    }
    // current = grid[2];
}
stack=[];
generateMaze(grid=grid);
function draw(){
    console.log('drawing')
    // generateMaze(grid=grid);
    background(51);
    for(let j =0;j<grid.length;j++){
        for(let i = 0;i<grid[j].length;i++){
        grid[j][i].show();}
    }
    // current.visited = true;
    // current.highlight();
    
    // let next =  current.checkNeighbors();
    // if(next){
    //     next.visited=true;

    //     stack.push(current);

    //     removeWalls(current,next);
    //     current = next;
    // }else if(stack.length>0){
    //     current = stack.pop();
    // }else{
    //     // console.log(grid);
    //     // return;
    // }
}



console.log(grid)

