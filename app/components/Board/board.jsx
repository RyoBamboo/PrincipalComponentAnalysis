var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Board = React.createClass({
    getInitialState: function() {
        return {hovered: false};
    },
    onMouseEnter: function() {
        this.setState({hovered: true});
    },
    onMouseLeave: function() {
        this.setState({hovered: false})
    },
    render: function() {
        console.log(this.state);
        return (
            <div className="board">
                <img src="http://irec.jp/images/upfile/icon-mac01.png" />
                <h3>PrincipalComponentAnalysis</h3>
                <p>This is the most popular units.</p>
                <Link to="/pma" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}></Link> {/* クリックできる範囲をdiv全体にするためにcssで調整&文字は書かない */}
                <button>CREATE NEW PROTOTYPE</button>
            </div>
        )
    }
});

module.exports = Board;
