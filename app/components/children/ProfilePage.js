import React from 'react';

import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';

export default class ProfilePage extends React.Component {

  constructor(props) {
    super(props);
  };


//TODO: add a list of toggles that keeps track of what categories that the user wants to experience. 

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
            <ListItem primaryText="World News" rightToggle={<Toggle />} />
            <ListItem primaryText="Politics" rightToggle={<Toggle />} />
            <ListItem primaryText="Science" rightToggle={<Toggle />} />
            <ListItem primaryText="Movies" rightToggle={<Toggle />} />
            <ListItem primaryText="Business" rightToggle={<Toggle />} />
            <ListItem primaryText="Arts" rightToggle={<Toggle />} />
            <ListItem primaryText="Travel" rightToggle={<Toggle />} />
            <ListItem primaryText="Sports" rightToggle={<Toggle />} />
            <ListItem primaryText="Fashion" rightToggle={<Toggle />} />
        </List>
    </div>
      )
  }

}

//business arts movies travel world politics science sports fashion