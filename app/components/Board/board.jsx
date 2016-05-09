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
                <img src="img/graph_pca.png" />
                <h3>Principal Component Analysis</h3>
                <p>A controversial European Union plan to stem the flow of refugees began April 4 with the deportation of more than 200 people from Greek islands to Turkey..</p>
                <Link to="/pma" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}></Link> {/* クリックできる範囲をdiv全体にするためにcssで調整&文字は書かない */}
            </div>
        )
    }
});

module.exports = Board;
