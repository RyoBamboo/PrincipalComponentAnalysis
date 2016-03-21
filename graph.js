Calc = new Calc();
var x = [147.5, 160.5, 160.7, 160.2, 154.5, 154.1, 170.0, 171.2, 157.5, 155.7];
var y = [68.0,  75.5,  77.0,  86.0,  73.0,  73.0,  75.0,  80.0,  73.0,  77.5];
var z = [37.0,  54.0,  49.3,  64.0,  47.5,  44.0,  49.5,  58.0,  42.0,  52.0];
var arr = [x, y, z];
var dataset = Calc.getPCScore(Calc.jacobi(Calc.varianceConvenceMatrix(arr)), arr);
console.log(dataset);

var w = 500;
var h = 300;

var padding = 30;

var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

/*-----------------------------------
 * スケールの設定
 *---------------------------------*/
//var xScale = d3.scale.linear()
//    .domain([d3.min(dataset, function(d) { return -Math.abs(d[0])}), d3.max(dataset, function(d) { return d[0]; })])
//    .range([padding, w - padding * 3]);

var xScale = d3.scale.linear()
    .domain([-10, 10])
    .range([padding, w - padding * 3]);

//var yScale = d3.scale.linear()
//    .domain([d3.min(dataset, function(d) { return -Math.abs(d[1])}), d3.max(dataset, function(d) { return d[1]; })])
//    .range([h - padding, padding]);

var yScale = d3.scale.linear()
    .domain([-3, 3])
    .range([h - padding, padding]);

var rScale = d3.scale.linear()
    .domain([0, d3.max(dataset, function(d) { return d[1]; })])
    .range([2, 5]);

/*-----------------------------------
 * 軸の設定
 *---------------------------------*/
var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .ticks(5);

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .ticks(5);

svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
        return xScale(d[0]);
    })
    .attr("cy", function(d) {
        return yScale(d[1]);
    })
    .attr("r", function(d) {
        //return rScale(d[1]);
        return 2;
    });

svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d, i) {
        return i;
    })
    .attr("x", function(d) {
        return xScale(d[0]);
    })
    .attr("y", function(d) {
        return yScale(d[1]);
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "red");

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0, " + (h/2) + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + ((w/2) - padding) + ", 0)")
    .call(yAxis);






