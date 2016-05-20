var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var StepLink = React.createClass({
    getInitialState() {
        return {step: 0};
    },
    nextStep: function() {
        var stepCount = this.state.step;
        if (stepCount > 2) { return ''; }

        var lines = $('.line');
        var targetLink = lines[stepCount];
        $(targetLink).addClass('show');

        var steps = $('.step');
        var targetStep = steps[stepCount];
        console.log(stepCount+1);
        $(targetStep).html("<img class='checked' src='img/check.png'>");

        stepCount = stepCount + 1;
        this.setState({step: stepCount});
    },
    prevStep: function() {
        var stepCount = this.state.step;
        console.log(stepCount);
        if (stepCount < 0) { return ''; }

        stepCount = stepCount-1;

        var lines = $('.line');
        var targetLink = lines[stepCount];
        $(targetLink).removeClass('show');

        var steps = $('.step');
        var targetStep = steps[stepCount];
        $(targetStep).html("<p class='number'>"+ (stepCount + 1) +"</p>");

        this.setState({step: stepCount});
    },
    render: function() {
        return (
                <ul className="steplink">
                    <li>
                        <Link to="/pma" className="btn-next" onClick={this.prevStep}>prev</Link>
                    </li>
                    <li>
                        <Link to="/pma" className="btn-next" onClick={this.nextStep}>next</Link>
                    </li>
                </ul>
        );
    }
});

module.exports = StepLink;
