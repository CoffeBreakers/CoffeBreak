import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';

export default class ProfileSnackBar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
      //console.log(this.props.open);
    return (
      <div>
        <Snackbar
          open={this.props.snackOpen}
          message="Your preferences have been saved"
          autoHideDuration={4000}
          onRequestClose={this.props.closeSnack}
        />
      </div>
    );
  }
}