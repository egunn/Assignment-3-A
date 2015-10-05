
//Set up the drawing environment here
var margin = {t:20,r:20,b:20,l:20};
var width = document.getElementById('plot').clientWidth-margin.l-margin.r,
	height = document.getElementById('plot').clientHeight-margin.t-margin.b;

var plot = d3.select('.canvas')
	.append('svg')
	.attr('width',width+margin.l+margin.r)
	.attr('height',height+margin.t+margin.b)
	.append('g')
	.attr('class','plot')
	.attr('transform','translate('+margin.l+','+margin.t+')')

//Start with 100 symbols
var numOfSymbols = 100;

//Create an array, generate objects to push into the array
//Attributes of these symbols are
// --> x position: between 0 and width
// --> y position: betewen 0 and height
// --> size: between 0 and 100x100
// --> type: circle or square
// --> color
var symbols = [];
var x, y,sizew, sizeh,colorr,colorg, colorb,type;
var objects = [];

//for each cycle up to the total number of symbols,
for (i=0; i<numOfSymbols; i++){

	//construct an object with the randomly-generated properties x, y, sizew, sizeh, color, and type
	var objects = {
		x:Math.random()*width,
		y:Math.random()*height,
		sizew:Math.random()*100,
		sizeh: Math.random()*100,
		//save color as a concatenation of strings and function results to give (#,#,#). Use Math.floor function to round down
		color:'rgb('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+')',
		//assign a type to the object; 0 will be circle, 1 will be rectangle
		type:Math.round(Math.random())
	}

	//append the new object onto the symbols array
	symbols.push(objects);
}

//With the array we've created and populated, draw circles to represent these symbols

//for each object in the symbols array, run the following function, and keep track of the array index value we're using
symbols.forEach(function(symbol, index){

	//check the value of the type attribute for an object in the array.
	//if the type value is 0, plot a circle using the object attributes stored in the array
	//(note that the circle does not need two size attribute values, so we'll arbitrarily use sizew to determine the radius)
	if (symbols[index].type == 0) {
		plot.append('circle')
			.attr('cx', symbols[index].x)
			.attr('cy', symbols[index].y)
			.attr('r',symbols[index].sizew)
			.style('fill',symbols[index].color)
	}

	//if the type values is 1, plot a rectangle instead.
	else if (symbols[index].type == 1) {
		plot.append('rect')
			.attr('x', symbols[index].x)
			.attr('y', symbols[index].y)
			.attr('width',symbols[index].sizew)
			.attr('height',symbols[index].sizeh)
			.style('fill',symbols[index].color)
	}
})
