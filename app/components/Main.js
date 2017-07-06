// Include React
var React = require("react");

// Here we include all of the sub-components
var ArticlesChildren = require("./children/ArticlesChildren");



// Helper Function
var helpers = require("./utils/helpers.js");
// This is the main component.
var Main = React.createClass({

  //3 states to save in main component: the search term for articles, the list of results, and the list of saved articles. 

  // Here we set a generic state associated with the number of clicks
  getInitialState: function() {
    var articles = []
    for(var i = 0; i < 9; i++)
    {
      var temp = {title: "test", url: "test.com", date: "2017-01-01", category: "test-category"}
      articles.push(temp);
    }
    return { user: {}, articles: articles};
  },

  //componentDidMount will run when the components load. This code will be run to get saved articles. 
  componentDidMount: function() 
  {
    //first time the component rendered
    //We get the saved articles, then set results array with the response data which should be a list of all articles. 
    helpers.getUser().then(function(response)
    {
      console.log("getting user");
      if(response.data !== this.state.history)
      {
        console.log(response);
        this.setState({user: response.data});
      }
    }.bind(this));
  },


  // Here we describe this component's render method
  render: function() {
    return (
      <div className="container">

        <div className="row">

          <nav className="navbar navbar-default">
            <div className="container-fluid">
              
              <div className="navbar-header">
                <a className="navbar-brand" href="#">CoffeeBreak</a>
              </div>

              
              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                
                <h4 className="navbar-text">Welcome to your coffeebreak, {this.state.user.user_name} </h4>
                <ul className="nav navbar-nav navbar-right">
                  <li><a href="/auth/google">Login</a></li>
                </ul>
              </div>
            </div>
          </nav>

          <div className = "jumbotron">
            <ArticlesChildren articles={this.state.articles} />
          </div>

          <div className = "row">
            
          </div>

        </div>

      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
