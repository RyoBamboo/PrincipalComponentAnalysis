Calc = function() {

};

// 配列の合計値を算出
Calc.prototype.sum = function(arr)
{
    var sum = arr.reduce(function(prev, current, index, array) {
        return prev + current;
    });

    return sum;
};


// 配列の平均値を算出
Calc.prototype.average = function(arr)
{
    var sum = this.sum(arr);
    var average = sum/arr.length;

    return average;
};


// 配列の分散を算出
Calc.prototype.dispersion = function(arr)
{
    var dispersion = 0;
    var average = this.average(arr);
    var tmp = 0;

    arr.forEach(function(value) {
        tmp += Math.pow((value - average), 2);
    });
    dispersion = tmp/arr.length;

    return dispersion;
};


// ２つの配列の共分散を算出
Calc.prototype.convariance = function(arr_x, arr_y)
{
    var convariance = 0;
    var ave_x = this.average(arr_x);
    var ave_y = this.average(arr_y);
    var length = arr_x.length;
    var tmp = 0;

    for(var i = 0; i < length; i++) {
        tmp += (arr_x[i] - ave_x) * (arr_y[i] - ave_y);
    }
    convariance = tmp/length;

    return convariance;
};


// 2つの配列の分散共分散行列を求める
Calc.prototype.varianceConvenceMatrix = function(arr_x, arr_y)
{
    var matrix = [
        [0, 0],
        [0, 0]
    ];

    // xの分散を求める
    matrix[0][0] = this.dispersion(arr_x);
    matrix[0][1] = this.convariance(arr_x, arr_y);
    matrix[1][0] = this.dispersion(arr_y);
    matrix[1][1] = this.convariance(arr_x, arr_y);

    return matrix;
};


$(function() {
    Calc = new Calc();
    var x = [12, 20, 24, 26, 33];
    var y = [3, 6, 7, 10, 14];

    console.log(Calc.varianceConvenceMatrix(x, y));
});