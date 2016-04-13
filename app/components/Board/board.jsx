var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Board = React.createClass({
    render: function() {
        return (
            <div className="board">
                <img src="http://irec.jp/images/upfile/icon-mac01.png" />
                <h3>PrincipalComponentAnalysis</h3>
                <p>This is the most popular units.</p>
                <Link to="/pma"></Link> {/* クリックできる範囲をdiv全体にするためにcssで調整&文字は書かない */}
                <button>CREATE NEW PROTOTYPE</button>
            </div>
        )
    }
});

module.exports = Board;