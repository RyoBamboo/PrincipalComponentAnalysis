var dataset = [
    [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
    [410, 12], [475, 44], [25, 67], [85, 21], [220, 88], [600, 150],[-420, 20]
];

var w = 500;
var h = 300;

var padding = 30;

var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

/*-----------------------------------
 * スケールの設定
 *---------------------------------*/
var xScale = d3.scale.linear()
    .domain([d3.min(dataset, function(d) { return -Math.abs(d[0])}), d3.max(dataset, function(d) { return d[0]; })])
    .range([padding, w - padding * 3]);

var yScale = d3.scale.linear()
    .domain([d3.min(dataset, function(d) { return -Math.abs(d[1])}), d3.max(dataset, function(d) { return d[1]; })])
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
        return rScale(d[1]);
    });

svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d) {
        return d[0] + ", " + d[1];
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






