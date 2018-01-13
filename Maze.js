var a = [];
var rows,cols;
var sizex = 40;
var stack =[];
var current;
function setup() {
	createCanvas(400,400);
	rows = floor(width/sizex);
	cols = floor(height/sizex);
	for (var j = 0; j < rows; j++) {
		for(var i=0;i< cols; i++)
		a.push(new cell(i,j));
	}
	current = a[0]; 
}
function draw(){
	background(51);
	for (var i = 0; i < a.length; i++) {
		a[i].show(sizex);
	}
	current.visited = true;
	current.highlight();
		//Step1.
	var next = current.checkN();
	if(next){
		next.visited = true;
		stack.push(current);
		removeWall(current,next);
		current  = next;
	}else{
		if(stack.length){
			current = stack.pop();
		}
	}
}
function cell(i,j){
	this.i = i;
	this.j = j;
	this.visited = false;
	this.walls = [true,true,true,true];
	this.highlight = function(){
			noStroke();
		 fill(0,255,0,100);
		 rect(this.i*sizex,this.j*sizex,sizex,sizex);
		
	}
	this.show = function(sizex){
		strokeWeight(2);
		stroke(255);
		if(this.walls[0]){
			line(this.i*sizex,this.j*sizex,this.i*sizex+sizex,this.j*sizex);
		}
		if(this.walls[1]){
			line(this.i*sizex,this.j*sizex,this.i*sizex,this.j*sizex+sizex);
		}
		if(this.walls[3]){
			line(this.i*sizex+sizex,this.j*sizex,this.i*sizex+sizex,this.j*sizex+sizex);
		}
		if(this.walls[2]){
			line(this.i*sizex,this.j*sizex+sizex,this.i*sizex+sizex,this.j*sizex+sizex);
		}
		if(this.visited){
			noStroke();
		 fill(200,0,255,100);
		 rect(this.i*sizex,this.j*sizex,sizex,sizex);
		}
	}
	this.checkN = function(){
		var neighbour = [];
		var top = a[index(this.i,this.j-1)];
		// if(top)console.log(top.i,top.j	,"top"); 
		var down = a[index(this.i,this.j+1)];
		// if(down)console.log(down.i,down.j,"down"); 
		var right = a[index(this.i+1,this.j)];
		// if(right)console.log(right.i,right.j,"right"); 
		var left = a[index(this.i-1,this.j)];
		// if(left)console.log(left.i,left.j,"left"); 

		if(top && !top.visited){
			neighbour.push(top);
		}
		if(down && !down.visited){
			neighbour.push(down);
		}
		if(left && !left.visited){
			neighbour.push(left);
		}
		if(right && !right.visited){
			neighbour.push(right);
		}
		if(neighbour.length > 0)
		{
			var r = floor(random(0,neighbour.length));
			return neighbour[r];
		}
		else{
			return undefined;
		}
	}
	
}
function index(i,j){
	if(i>=0 && j>=0 && i<rows && j<cols){
		 return j*cols+i;
		}
	else
		return undefined;
}
function removeWall(current,neighbour){
		var h = neighbour.i - current.i;
		var v = neighbour.j - current.j;
		if(h == -1 ){
			current.walls[1] = false;
			neighbour.walls[3] = false;
		}
		if(h == 1)current.walls[3] = false,neighbour.walls[1] = false;;
		if(v == 1)current.walls[2] = false,neighbour.walls[0] = false;
		if(v == -1)current.walls[0] = false,neighbour.walls[2] = false;

	}








