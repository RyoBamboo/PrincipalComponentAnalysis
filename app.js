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
    //arr = [
    //    [10, -4, -6],
    //    [-4, 10, -6],
    //    [-6, -6, 12]
    //]; // サンプルデータ

    arr = [
        [10, 3, 2],
        [3, 5, 1],
        [2, 1, 0]
    ]; // サンプルデータ

    var eps = Math.pow(10, -5); // 終了条件値
    var k = 0; // 繰り返し回数
    var limit = 20;// 最大繰り返し回数

    /*----------------------------------------
    * 計算用の配列をコピー
    *---------------------------------------*/
    var _arr = [];
    for (var i=0; i < arr.length; i++) {
        _arr[i] = [];
        for (var j=0; j < arr.length; j++) {
            _arr[i][j] = arr[i][j];
        }
    }


    /*----------------------------------------
    * 逐次変換行列（固有ベクトル）の初期設定
    *---------------------------------------*/
    var arr_x  = [];
    var _arr_x = [];
    for (var i=0; i < arr.length; i++) {
        arr_x[i]  = [];
        _arr_x[i] = [];
        for (var j=0; j < arr.length; j++) {
            if (i == j) {
                arr_x[i][j]  = 1; // 対角要素は1
                _arr_x[i][j] = 1;
            } else {
                arr_x[i][j]  = 0;
                _arr_x[i][j] = 0;
            }
        }
    }

    while(k < limit) {
        /*----------------------------------------
         * 非対角行列の中から最大値の絶対値を取得する
         *---------------------------------------*/
        var max_v = 0;    // 最大値
        var max_i, max_j; // 最大値のインデックス
        arr.forEach(function (value, i) {
            value.forEach(function (_value, j) {
                if (i != j) {
                    if (max_v < Math.abs(_value)) {
                        max_v = Math.abs(_value);
                        max_i = i;
                        max_j = j;
                    }
                }
            });
        });

        // 終了条件と比較
        if (max_v > eps) {
            /*----------------------------------------
             * 回転行列を算出する
             *---------------------------------------*/
            // sinとconを算出する
            var alpha = (arr[max_i][max_i] - arr[max_j][max_j]) / 2;
            var beta = -arr[max_i][max_j];
            var gamma = Math.abs(alpha) / Math.sqrt(alpha * alpha + beta * beta);
            var sin = Math.sqrt((1 - gamma) / 2);
            var cos = Math.sqrt((1 + gamma) / 2);
            if (alpha * beta < 0) {
                sin = -sin; // sign(alpha * beta)の性質を反映（alpha * betaが負の時、sinも負）
            }

            for (var i = 0; i < arr.length; i++) {

                if (i == max_i) {
                    for (var j = 0; j < arr.length; j++) {
                        if (j == max_i) {
                            _arr[max_i][max_i] = (cos * cos * arr[max_i][max_i]) - (cos * sin * arr[max_i][max_j]) - (sin * cos * arr[max_i][max_j]) + (sin * sin * arr[max_j][max_j]);
                        } else if (j == max_j) {
                            _arr[max_i][max_j] = 0;
                        } else {
                            _arr[max_i][j] = cos * arr[max_i][j] - sin * arr[max_j][j];
                        }
                    }
                } else if (i == max_j) {
                    for (var j = 0; j < arr.length; j++) {
                        if (j == max_i) {
                            _arr[max_j][max_i] = 0;
                        } else if (j == max_j) {
                            _arr[max_j][max_j] = (sin * sin * arr[max_i][max_i]) + (sin * cos * arr[max_i][max_j]) + (cos * sin * arr[max_i][max_j]) + (cos * cos * arr[max_j][max_j]);
                        } else {
                            _arr[max_j][j] = sin * arr[max_i][j] + cos * arr[j][max_j];
                        }
                    }
                } else {
                    for (var j = 0; j < arr.length; j++) {
                        if (j == max_i) {
                            _arr[i][max_i] = cos * arr[max_i][i] - sin * arr[i][max_j];
                        } else if (j == max_j) {
                            _arr[i][max_j] = sin * arr[max_i][i] + cos * arr[i][max_j];
                        } else {
                            _arr[i][j] = arr[i][j];
                        }
                    }
                }
            }

            /*----------------------------------------
             * 逐次変換行列の計算（固有ベクトル）
             *---------------------------------------*/
            for (var i = 0; i < arr_x.length; i++) {
                for (var j = 0; j < arr_x.length; j++) {
                    if (j == max_i) {
                        _arr_x[i][max_i] = (cos * arr_x[i][max_i]) - (sin * arr_x[i][max_j])
                    } else if (j == max_j) {
                        _arr_x[i][max_j] = (sin * arr_x[i][max_i]) + (cos * arr_x[i][max_j]);
                    } else {
                        _arr_x[i][j] = arr_x[i][j];
                    }
                }
            }

            // 計算結果と繰り返し回数を更新
            for (var i=0; i < arr.length; i++) {
                for (var j=0; j < arr.length; j++) {
                    arr[i][j]   = _arr[i][j];
                    arr_x[i][j] = _arr_x[i][j];
                }
            }
            k++;
        } else {
            console.log('固有値='+arr);
            console.log('固有ベクトル'+arr_x);
            return;
        }
    }

};



$(function() {
    Calc = new Calc();
    var x = [12, 20, 24, 26, 33];
    var y = [3, 6, 7, 10, 14];

    console.log(Calc.jacobi(Calc.varianceConvenceMatrix(x, y)));
});