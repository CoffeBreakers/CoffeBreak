// Include React
var React = require("react");

//import materialUI components
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import ActionHome from 'material-ui/svg-icons/action/home';
// Here we include all of the sub-components
import ArticlesChildren from "./children/ArticlesChildren";
import Avatar from "./children/AppbarChildren/Avatar";
import PopoverMenu from "./children/AppbarChildren/PopoverMenu";
import LoginPage from "./children/LoginPage";
import ProfilePage from "./children/ProfilePage";
var NameSlot = require("./children/NameSlot");

//Adding React Router Stuff
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { browserHistory } from 'react-router'

// Helper Function
var helpers = require("./utils/helpers.js");
// This is the main component.
var Main = React.createClass({

  //3 states to save in main component: the search term for articles, the list of results, and the list of saved articles. 

  // Here we set a generic state associated with the number of clicks
  getInitialState: function() {
    
    var articles = []
    // var articleText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vulputate sapien tellus, a maximus libero ornare nec. Cras sed tincidunt mauris. Mauris ac tempor mi. Cras aliquet neque vel sapien viverra, id porttitor diam bibendum. Vivamus aliquam eleifend mi pellentesque rutrum. Nunc posuere, velit et rhoncus tincidunt, mi nisl vulputate neque, vel eleifend nunc eros a quam. Morbi interdum semper elit, dapibus ullamcorper orci suscipit nec. Aenean vel egestas enim, vel fermentum mauris. Nullam eu sapien rhoncus, feugiat nibh quis, efficitur nisl. Donec et pharetra ante. Nullam finibus velit vitae nulla pretium, et eleifend nisi gravida. Morbi luctus iaculis ipsum. Maecenas eu nibh tempus, cursus massa id, vulputate mauris. "
    // for(var i = 0; i < 9; i++)
    // {
    //   var temp = {title: "test"+i, url: "test.com", date: "2017-01-01", category: "test-category", img: "http://lorempixel.com/500/500", text: articleText}
    //   articles.push(temp);
    // }

    return { user: {}, articles: articles, displayArticles: [], popoverExpanded: false, snackOpen: false};
  },

  //componentDidMount will run when the components load. This code will be run to get saved articles. 
  componentDidMount: function() 
  {
    //first time the component rendered
    //We get the saved articles, then set results array with the response data which should be a list of all articles. 
    this.getUser();
    this.getArticles();
    
  },

  
  expandPopover: function(event){
    // console.log("expanding popover");
    //console.log(event.currentTarget);
    event.preventDefault();
    this.setState({popoverExpanded: true});
    this.setState({popoverAnchor: event.currentTarget});
    //console.log(this.state.popoverAnchor);
  },

  compressPopover: function(){
    // console.log("exiting popover");
    this.setState({popoverExpanded: false});
  },

  contextTypes: {
    router: React.PropTypes.object
  },

  logOut: function(){
    //this.props.history.push("/");
    helpers.logoutUser().then(function(response)
    {
      this.setState({user: {}});
      this.compressPopover();
      this.displayArticles();
    }.bind(this));
  },

  loginLocal: function(user){
    helpers.loginLocalUser(user).then(function(response)
    {
      this.getUser();
    }.bind(this));
  },
  

  createAccount: function(user){
    helpers.createUser(user).then(function(response)
    {
      this.getUser();
    }.bind(this));
  },

  changePreferences: function(preferences){
    helpers.updatePreferences(preferences).then(function(response)
    {
      console.log("Changing preferences");
    }.bind(this));
  },

  getUser: function()
  {
    helpers.getUser().then(function(response)
    {
      console.log("getting user");
      if(response.data !== this.state.history)
      {
        //console.log(response);
        if(response.data === null || response.data === undefined)
        {
          this.setState({user: {}});
        }
        else
        {
          console.log(JSON.stringify(response.data));
          this.setState({user: response.data});
        }
      }
    }.bind(this));
  },

  preferenceToggle: function(prefName)
  {
    this.state.user[prefName] = !this.state.user[prefName];
  },

  savePreferences: function()
  {
    helpers.updatePreferences(this.state.user).then(function(response)
    {
      console.log(response);
      this.setState({snackOpen: true});
    }.bind(this));
  },

  getArticles: function()
  {
    helpers.getArticles().then(function(response)
    {
      //console.log(response);
      var articlesList = response.data;
      articlesList.forEach(function(element)
      {
         if(element.img === null || element.img === undefined)
         {
           element.img = "http://lorempixel.com/500/500";
         }
      });
      this.setState({articles: articlesList});
      this.displayArticles();
    }.bind(this));
  },

  displayArticles: function()
  {
    var tempArticlesArray = []
    var category;
    if(this.state.user.user_name === undefined)
    {
      this.setState({'displayArticles': this.state.articles.slice(0)});
    }
    else
    {
      for(var i = 0; i < this.state.articles.length; i++)
      {
       // console.log(this.state.articles[i].category);
        //make books, travel, and movies fit under entertainment category. 
        if (this.state.articles[i].category === 'books' || this.state.articles[i].category === 'travel' || this.state.articles[i].category === 'movies')
        {
          category = 'entertainment';
        }
        else
        {
          category = this.state.articles[i].category; 
        }
        if(this.state.user[category]) //the user's preferences include the category that the article was in. 
        {
          tempArticlesArray.push(this.state.articles[i]);
        }
        
      }
      this.setState({'displayArticles': tempArticlesArray.slice(0)});
    }
  },
  
  closeSnack()
  {
    //console.log("signal received to close modal")
    this.setState({snackOpen: false});
  },

  // Here we describe this component's render method
  render: function() {
    return (
      <div className="container">

          <AppBar
            title= {<NameSlot user_name={this.state.user.user_name} />}
            iconElementLeft={<IconButton
              iconStyle={styles.mediumIcon}
              style={styles.medium}
              containerElement={<Link to="/"/>}
            >
              <ActionHome />
            </IconButton>}
            iconElementRight={(Object.keys(this.state.user).length > 0) ? 
              <Avatar user={this.state.user} expandPopover={this.expandPopover}/> : 
              <FlatButton label="Login" containerElement={<Link to="/login"/>} />}
            iconStyleRight={{"margin": "0 auto"}}
          />  {/* end appbar */}
          
          <div className = "jumbotron">

            <Route exact path="/" component={() => <ArticlesChildren articles={this.state.displayArticles}/>}/>
            <Route path="/login" component={() => <LoginPage loginLocalUser={this.loginLocal} createAccount={this.createAccount} user={this.state.user}/>} />
            <Route path="/profile" component={() => <ProfilePage user={this.state.user} preferenceToggle={this.preferenceToggle}
              savePreferences={this.savePreferences} displayArticles={this.displayArticles} snackOpen={this.state.snackOpen} closeSnack={() => this.closeSnack()}/>}/>
          </div> {/* end jumbotron */}


        {/*The popover menu from clicking on the expand button on the appbar*/}
        <PopoverMenu popoverExpanded={this.state.popoverExpanded} popoverAnchor={this.state.popoverAnchor} compressPopover={() => this.compressPopover()} logOut={() => this.logOut()}/>
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
