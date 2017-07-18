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

export default class ProfilePage extends React.Component {

  constructor(props) {
    super(props);

    
  };

  componentDidMount()
  {
    console.log(JSON.stringify(this.props.user, null, 2));
  }
//TODO: add a list of toggles that keeps track of what categories that the user wants to experience. 
  handleToggle(event, state)
  {
    console.log("toggled: " + state);
    this.props.preferenceToggle(state, event.target.value);
  }

  handleSavePreferences(event)
  {
    event.preventDefault();
    console.log("saving preferences");
  }

// <Toggle onToggle={(event) => this.handleChange(event, 'encode')} style={styles.toggle} label="Encode" labelPosition="right" />
// handleChange(event, state) { console.log(state, event.target.value); this.setState({ [state]: event.target.value }); }

  render() {
      return (
      <div>
        <List>
            <ListItem primaryText={this.props.user.user_name}
                      leftAvatar={<Avatar src={this.props.user.photo} />}/>
            
        </List>
        <Divider />
        <List>
            <Subheader>Your Preferences</Subheader>
            
            <ListItem primaryText="World News" rightToggle={<Toggle 
                defaultToggled={this.props.user['world_news']}
                onToggle={(event) => this.handleToggle(event, 'world_news')}
                />} />
            <hr/>
            <ListItem primaryText="Politics" rightToggle={<Toggle 
              defaultToggled={this.props.user['politics']}
              onToggle={(event) => this.handleToggle(event, 'politics')}/>} />
            <hr/>
            <ListItem primaryText="Science" rightToggle={<Toggle 
              defaultToggled={this.props.user['science']}
              onToggle={(event) => this.handleToggle(event, 'science')}/>} />
            <hr/>
            <ListItem primaryText="Movies" rightToggle={<Toggle 
              defaultToggled={this.props.user['movies']}
              onToggle={(event) => this.handleToggle(event, 'movies')}/>} />
            <hr/>
            <ListItem primaryText="Business" rightToggle={<Toggle 
              defaultToggled={this.props.user['business']}
              onToggle={(event) => this.handleToggle(event, 'business')}/>} />
            <hr/>
            <ListItem primaryText="Arts" rightToggle={<Toggle 
              defaultToggled={this.props.user['arts']}
              onToggle={(event) => this.handleToggle(event, 'arts')}/>} />
            <hr/>
            <ListItem primaryText="Travel" rightToggle={<Toggle 
              defaultToggled={this.props.user['travel']}
              onToggle={(event) => this.handleToggle(event, 'travel')}/>} />
            <hr/>
            <ListItem primaryText="Sports" rightToggle={<Toggle 
              defaultToggled={this.props.user['sports']}
              onToggle={(event) => this.handleToggle(event, 'sports')}/>} />
            <hr/>
            <ListItem primaryText="Fashion" rightToggle={<Toggle 
              defaultToggled={this.props.user['fashion']}
              onToggle={(event) => this.handleToggle(event, 'fashion')}/>} />
            <hr/>
        </List>
        <RaisedButton label="Save Preferences" primary={true} style={style} onClick={(event) => this.handleSavePreferences(event)}/>
    </div>
      )
  }

}

const style = {
  margin: 15,
};
