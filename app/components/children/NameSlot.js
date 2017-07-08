// Include React
var React = require("react");

// Creating the Results component
var Results = React.createClass({

  // Here we describe this component's render method
  render: function() {
        return (
                (this.props.user_name != undefined || this.props.user_name != null) ? <span style={styles.title}>Welcome to your coffeebreak, {this.props.user_name} </span> :
                <span style={styles.title}>Hello Stranger, Welcome to Coffeebreak!</span>
        );
  }
});

const styles = {
  title: {
    cursor: 'pointer',
  },
};

// Export the component back for use in other files
module.exports = Results;
