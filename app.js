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
Calc.prototype.variance = function(arr)
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


// 分散共分散行列を求める
Calc.prototype.varianceConvenceMatrix = function(arr)
{
    var matrix = []; // 分散共分散を格納する配列
    var n = arr.length; // 次元数（変数の数）
    for (var i=0; i < n; i++) {
        matrix[i] = [];
        for (var j=0; j < n; j++) {
            if (i == j) {
                matrix[i][j] = this.variance(arr[i]);
            } else {
                matrix[i][j] = this.convariance(arr[i], arr[j]);
            }
        }
    }

    return matrix;
};

// 与えられた行列から固有値を算出する（ヤコビ法）
Calc.prototype.jacobi = function(arr)
{
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
            return {eigenValue: arr, eigenVector: arr_x};
        }
    }
};


// 与えられた固有値と固有ベクトルから主成分得点を算出する
Calc.prototype.getPCScore = function(data, arr) {
    var eigenValue = data.eigenValue;
    var eigenVector = data.eigenVector;

    // 第一主成分得点
    var pc1 = function(x, y, z, _x, _y, _z) {
        return eigenVector[0][0]*(x - _x) + eigenVector[1][0]*(y - _y) + eigenVector[2][0]*(z - _z);
    };

    // 第二主成分得点
    var pc2 = function(x, y, z, _x, _y, _z) {
        return eigenVector[0][1]*(x - _x) + eigenVector[1][1]*(y - _y) + eigenVector[2][1]*(z - _z);
    };

    // 第三主成分得点
    var pc3 = function(x, y, z, _x, _y, _z) {
        return eigenVector[0][2]*(x - _x) + eigenVector[1][2]*(y - _y) + eigenVector[2][2]*(z - _z);
    };

    var PCScore = [];
    var _x = this.average(arr[0]);
    var _y = this.average(arr[1]);
    var _z = this.average(arr[2]);
    var sampleCount = arr[0].length; // サンプル数
    for (var i = 0; i < sampleCount; i++) {
        var scores = [
            pc1(arr[0][i], arr[1][i], arr[2][i], _x, _y, _z),
            pc2(arr[0][i], arr[1][i], arr[2][i], _x, _y, _z),
            pc3(arr[0][i], arr[1][i], arr[2][i], _x, _y, _z)
        ];

        PCScore.push(scores);
    }

    return PCScore;
};


$(function() {
    //Calc = new Calc();
    //var x = [147.5, 160.5, 160.7, 160.2, 154.5, 154.1, 170.0, 171.2, 157.5, 155.7];
    //var y = [68.0,  75.5,  77.0,  86.0,  73.0,  73.0,  75.0,  80.0,  73.0,  77.5];
    //var z = [37.0,  54.0,  49.3,  64.0,  47.5,  44.0,  49.5,  58.0,  42.0,  52.0];
    //var arr = [x, y, z];
    //var PCScore = Calc.getPCScore(Calc.jacobi(Calc.varianceConvenceMatrix(arr)), arr);
});