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

// 与えられた行列から固有値を算出する（ヤコビ法）
Calc.prototype.jacobi = function(arr)
{
    arr = [
        [10, -4, -6],
        [-4, 10, -6],
        [-6, -6, 12]
    ]; // サンプルデータ

    var eps = Math.pow(10, -10); // 終了条件値
    var _arr = $.extend(true, {}, arr); // 計算用の配列をコピー

    /*----------------------------------------
    * 非対角行列の中から最大値の絶対値を取得する
    *---------------------------------------*/
    var max_v = 0;    // 最大値
    var max_i, max_j; // 最大値のインデックス
    arr.forEach(function(value, i) {
        value.forEach(function(_value, j) {
            if (i != j) {
                if (max_v < Math.abs(_value)) {
                    max_v = Math.abs(_value);
                    max_i = i;
                    max_j = j;
                }
            }
        });
    });

    /*----------------------------------------
    * 回転行列を算出する
    *---------------------------------------*/
    // sinとconを算出する
    var alpha = (arr[max_i][max_i]-arr[max_j][max_j])/2;
    var beta = -arr[max_i][max_j];
    var gamma = Math.abs(alpha)/Math.sqrt(alpha*alpha + beta*beta);
    var sin = Math.sqrt((1-gamma)/2);
    var cos = Math.sqrt((1+gamma)/2);
    if (alpha * beta < 0) {
        sin = -sin; // sign(alpha * beta)の性質を反映（alpha * betaが負の時、sinも負）
    }

    for (var i = 0; i < arr.length; i++) {

        if (i == max_i) {
            for (var j = 0; j < arr.length; j++) {
                if (j == max_i) {
                    _arr[max_i][max_i] = (cos*cos*arr[max_i][max_i])-(cos*sin*arr[max_i][max_j])-(sin*cos*arr[max_i][max_j])+(sin*sin*arr[max_j][max_j]);
                } else if (j == max_j) {
                    _arr[max_i][max_j] = 0;
                } else {
                    _arr[max_i][j] = cos*arr[max_i][j]-sin*arr[max_j][j];
                }
            }
        } else {
            for (var j = 0; j < arr.length; j++) {
                if (j == max_i) {
                    _arr[i][max_i] = cos*arr[max_i][i]-sin*arr[max_j][j]; // TODO:ここ怪しい
                } else if (j == max_j) {
                    _arr[i][max_j] = sin*arr[i][max_i]+cos*arr[j][max_i]; // TODO:ここ怪しい
                } else {
                    _arr[i][j] = arr[i][j];
                }
            }
        }

    }

    console.log(_arr);

};


$(function() {
    Calc = new Calc();
    var x = [12, 20, 24, 26, 33];
    var y = [3, 6, 7, 10, 14];

    console.log(Calc.jacobi(Calc.varianceConvenceMatrix(x, y)));
});