var React = require('react');

var Header = React.createClass({
    render: function() {
        return (
            <header>
                <div className="nav uk-width-1-1 uk-container-center uk-container">
                    <p>Data Mining Kit</p>
                    <h1>Please choose mining type.</h1>
                </div>
            </header>
        )
    }
});

module.exports = Header;