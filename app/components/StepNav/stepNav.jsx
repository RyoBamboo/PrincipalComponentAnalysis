var React = require('react');

var StepNav = React.createClass({
    render: function() {
        return (
            <div className="stepnav">
                <div className="step"><p className="number">1</p></div>
                <div className="line"></div>
                <div className="step"><p className="number">2</p></div>
                <div className="line"></div>
                <div className="step"><p className="number">3</p></div>
                <div className="line"></div>
                <div className="step"><p className="number">4</p></div>
            </div>
        );
    }
});

module.exports = StepNav;
