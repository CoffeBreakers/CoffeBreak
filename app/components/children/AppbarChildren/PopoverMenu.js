import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import {
  Link
} from 'react-router-dom'

export default class PopoverMenu extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
      //console.log(this.props.popoverAnchor);
    return (
      <div>
        <Popover
          open={this.props.popoverExpanded}
          anchorEl={this.props.popoverAnchor}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={() => this.props.compressPopover()}
        >
          <Menu>
            <MenuItem primaryText="Profile" containerElement={<Link to="/profile" onTouchTap={this.props.compressPopover}/>}/>
            <MenuItem primaryText="Sign out" onTouchTap={()=> this.props.logOut()}/>
          </Menu>
        </Popover>
      </div>
    );
  }
}