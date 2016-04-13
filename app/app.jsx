var React = require('react');
var ReactDOM = require('react-dom');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var History = ReactRouter.History;
var hashHistory = ReactRouter.hashHistory;
var Link = ReactRouter.Link;

var Header = require('./components/Header/header.jsx');
var Board  = require('./components/Board/board.jsx');

var Top = React.createClass({
    render: function() {
        return (
            <div>
                <br />
                <br />
                <div className="nav uk-width-1-1 uk-container-center uk-container">
                    <Board />
                    <Board />
                    <Board />
                    <br />
                    <Board />
                    <Board />
                    <Board />
                </div>
            </div>
        )
    }
});

var PmaTop = React.createClass({
    render: function() {
        return (
            <div>
                <p>これはPMAのページです</p>
            </div>
        );
    }
});

var Main = React.createClass({
    render: function() {
        return (
            <div className="container">
                <Header />
                <ReactCSSTransitionGroup className="main" component="div" transitionName="contents" transitionEnterTimeout={500} transitionLeaveTimeout={800}>
                {React.cloneElement(this.props.children, {
                    key: this.props.location.pathname
                })}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
});

var Routes = (
    <Route path="/" component={Main}>
        <IndexRoute component={Top} />
        <Route path="/top" component={Top} />
        <Route path="/pma" component={PmaTop} />
    </Route>
);

ReactDOM.render(
    <Router history={hashHistory}>{Routes}</Router>,
    document.getElementById('app')
);

