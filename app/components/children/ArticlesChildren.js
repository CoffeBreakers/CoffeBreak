// Include React
var React = require("react");

// Creating the Results component
var Results = React.createClass({

  // Here we describe this component's render method
  render: function() {
    return (
        <div>
            {this.props.articles.map(function(article, i){
                return <div className="col-sm-4">
                      <a href={article.url}><p>{article.title}</p></a>
                      <p>Published on: {article.date}</p>
                      <p>Category: {article.category}</p>
                      </div>;
            })}
        </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Results;
