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
            <hr/>
            <ListItem primaryText="Politics" rightToggle={<Toggle />} />
            <hr/>
            <ListItem primaryText="Science" rightToggle={<Toggle />} />
            <hr/>
            <ListItem primaryText="Movies" rightToggle={<Toggle />} />
            <hr/>
            <ListItem primaryText="Business" rightToggle={<Toggle />} />
            <hr/>
            <ListItem primaryText="Arts" rightToggle={<Toggle />} />
            <hr/>
            <ListItem primaryText="Travel" rightToggle={<Toggle />} />
            <hr/>
            <ListItem primaryText="Sports" rightToggle={<Toggle />} />
            <hr/>
            <ListItem primaryText="Fashion" rightToggle={<Toggle />} />
            <hr/>
        </List>
        <RaisedButton label="Save Preferences" primary={true} style={style}/>
    </div>
      )
  }

}

const style = {
  margin: 15,
};
