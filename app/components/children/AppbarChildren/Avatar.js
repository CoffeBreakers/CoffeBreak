import React from 'react';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FontIcon from 'material-ui/FontIcon';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

import {
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500,
} from 'material-ui/styles/colors';

const style = {margin: '3 auto'};

const listStyle= {
  "paddingTop": 0,
  "paddingBottom": 0,
  "margin": '3 auto'
}

export default class ArticleModal extends React.Component {
    constructor(props) {
        super(props);
    }

render() {
    return(
    <List style={listStyle}>
      <ListItem
        disabled={false}
        style={{"margin": '3 auto'}}
        leftAvatar={(this.props.user.photo)?
          <Avatar 
          src={this.props.user.photo} 
          style={style}
          />:
          <Avatar
          color={deepOrange300}
          backgroundColor={purple500}
          size={30}
          style={style}
        >
          {this.props.user.user_name[0]}
        </Avatar>
        }
      >
      Account Settings
      </ListItem>
      </List>
  )
}

}
