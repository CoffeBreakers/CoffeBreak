import React from 'react';

import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import {
  deepOrange300,
  purple500,
} from 'material-ui/styles/colors';
import {
  Redirect,
} from 'react-router-dom'

//import snackbar that appears from the bottom. 
import ProfileSnackBar from './ProfileChildren/ProfileSnackBar';
export default class ProfilePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
          snackOpen: false
        };
  };

  componentDidMount()
  {
    //console.log(JSON.stringify(this.props, null, 2));
  }
//TODO: add a list of toggles that keeps track of what categories that the user wants to experience. 
  handleToggle(event, state)
  {
    this.props.preferenceToggle(state);
  }

  handleSavePreferences(event)
  {
    event.preventDefault();
    //console.log("saving preferences");
    this.props.savePreferences();
    this.props.displayArticles();
  }

// <Toggle onToggle={(event) => this.handleChange(event, 'encode')} style={styles.toggle} label="Encode" labelPosition="right" />
// handleChange(event, state) { console.log(state, event.target.value); this.setState({ [state]: event.target.value }); }

  render() {
    if (!this.props.user.user_name)
    {
      return (
        <Redirect to={{
        pathname: '/',
        }}/>
      )
    }
      return (
      <div>
        <List>
            <ListItem primaryText={this.props.user.user_name}
                      leftAvatar={(this.props.user.photo)?
                                  <Avatar 
                                  src={this.props.user.photo} 
                                  style={avatarStyle}
                                  />
                                  :
                                  <Avatar
                                  color={deepOrange300}
                                  backgroundColor={purple500}
                                  size={30}
                                  style={avatarStyle}
                                  >
                                    {this.props.user.user_name[0]}
                                  </Avatar>}/>
            
        </List>
        <Divider />
        <List>
            <Subheader>Your Preferences</Subheader>
           
            <ListItem primaryText="World News" rightToggle={<Toggle 
                defaultToggled={this.props.user['world']}
                onToggle={(event) => this.handleToggle(event, 'world')}
                />} />
            <hr/>
            <ListItem primaryText="National News" rightToggle={<Toggle 
              defaultToggled={this.props.user['national']}
              onToggle={(event) => this.handleToggle(event, 'national')}/>} />
            <hr/>
            <ListItem primaryText="Politics" rightToggle={<Toggle 
              defaultToggled={this.props.user['politics']}
              onToggle={(event) => this.handleToggle(event, 'politics')}/>} />
            <hr/>
            <ListItem primaryText="Technology" rightToggle={<Toggle 
              defaultToggled={this.props.user['technology']}
              onToggle={(event) => this.handleToggle(event, 'technology')}/>} />
            <hr/>
            <ListItem primaryText="Science" rightToggle={<Toggle 
              defaultToggled={this.props.user['science']}
              onToggle={(event) => this.handleToggle(event, 'science')}/>} />
            <hr/>
            <ListItem primaryText="Business" rightToggle={<Toggle 
              defaultToggled={this.props.user['business']}
              onToggle={(event) => this.handleToggle(event, 'business')}/>} />
            <hr/>
            <ListItem primaryText="Sports" rightToggle={<Toggle 
              defaultToggled={this.props.user['sports']}
              onToggle={(event) => this.handleToggle(event, 'sports')}/>} />
            <hr/>
            <ListItem primaryText="Entertainment" rightToggle={<Toggle 
              defaultToggled={this.props.user['entertainment']}
              onToggle={(event) => this.handleToggle(event, 'entertainment')}/>} />
            <hr/>
        </List>
        <RaisedButton label="Save Preferences" primary={true} style={style} onClick={(event) => this.handleSavePreferences(event)}/>
        <ProfileSnackBar snackOpen={this.props.snackOpen} closeSnack={this.props.closeSnack}/>
    </div>
      )
  }

}

const style = {
  margin: 15,
};

const avatarStyle = {margin: 'auto'};