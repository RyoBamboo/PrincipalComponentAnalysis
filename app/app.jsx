var React = require('react');
var ReactDOM = require('react-dom');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;

var Header = require('./components/Header/header.jsx');
var Board  = require('./components/Board/board.jsx');
var StepNav  = require('./components/StepNav/stepNav.jsx');

var Top = React.createClass({
    render: function() {
        return (
            <div>
                <div class="boards">
                    <Board />
                    <Board />
                    <Board />
                </div>
                <button className="btn-next">next</button>
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
                <StepNav />
                <Header />
                <ReactCSSTransitionGroup className="main" className="uk-width-1-1" component="div" transitionName="contents" transitionEnterTimeout={500} transitionLeaveTimeout={800}>
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

