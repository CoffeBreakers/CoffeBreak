// Include React
var React = require("react");

//import materialUI components
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more'
import NavigationClose from 'material-ui/svg-icons/navigation/close';
// Here we include all of the sub-components
var ArticlesChildren = require("./children/ArticlesChildren");
var NameSlot = require("./children/NameSlot");


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
      var temp = {title: "test"+i, url: "test.com", date: "2017-01-01", category: "test-category", img: "http://lorempixel.com/200/200"}
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
          <AppBar
            title= {<NameSlot/>}
            iconElementLeft={<IconButton><NavigationExpandMore /></IconButton>}
            iconElementRight={<FlatButton label="Login" href="/auth/google"/>}
          />  {/* end appbar */}
  
          <div className = "jumbotron">
            <ArticlesChildren articles={this.state.articles} />
          </div> {/* end jumbotron */}

          <div className = "row">
            
          </div>

        </div> {/* end jumbotron */}

      </div> //end Container
    );
  }
});

const styles = {
  title: {
    cursor: 'pointer',
  },
};



// Export the component back for use in other files
module.exports = Main;
