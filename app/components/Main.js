// Include React
var React = require("react");

//import materialUI components
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more'
import NavigationClose from 'material-ui/svg-icons/navigation/close';
// Here we include all of the sub-components
import ArticlesChildren from "./children/ArticlesChildren";
var NameSlot = require("./children/NameSlot");


// Helper Function
var helpers = require("./utils/helpers.js");
// This is the main component.
var Main = React.createClass({

  //3 states to save in main component: the search term for articles, the list of results, and the list of saved articles. 

  // Here we set a generic state associated with the number of clicks
  getInitialState: function() {
    var articles = []
    var articleText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vulputate sapien tellus, a maximus libero ornare nec. Cras sed tincidunt mauris. Mauris ac tempor mi. Cras aliquet neque vel sapien viverra, id porttitor diam bibendum. Vivamus aliquam eleifend mi pellentesque rutrum. Nunc posuere, velit et rhoncus tincidunt, mi nisl vulputate neque, vel eleifend nunc eros a quam. Morbi interdum semper elit, dapibus ullamcorper orci suscipit nec. Aenean vel egestas enim, vel fermentum mauris. Nullam eu sapien rhoncus, feugiat nibh quis, efficitur nisl. Donec et pharetra ante. Nullam finibus velit vitae nulla pretium, et eleifend nisi gravida. Morbi luctus iaculis ipsum. Maecenas eu nibh tempus, cursus massa id, vulputate mauris. "
    for(var i = 0; i < 9; i++)
    {
      var temp = {title: "test"+i, url: "test.com", date: "2017-01-01", category: "test-category", img: "http://lorempixel.com/500/500", text: articleText}
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
            title= {<NameSlot user_name={this.state.user.user_name}/>}
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
