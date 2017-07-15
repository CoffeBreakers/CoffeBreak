import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

export default class LoginPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
          user_name: "", 
          password: ""
        };
  };

  changeUserName(event, newValue) {
    this.setState({ user_name: event.target.value });
  }

  changePassword(event, newValue) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
      console.log("submitting " + this.state.user_name + " password: " + this.state.password);
    this.props.loginLocalUser({user_name: this.state.user_name, password: this.state.password});
  }

  goToGoogle(event) {
      event.preventDefault();
      window.location = '/auth/google';
  }

  handleCreateLocalAccount(event) {
    event.preventDefault();
    console.log("creating new Account with username: " + this.state.user_name + " password: " + this.state.password);
    this.props.createAccount({user_name: this.state.user_name, password: this.state.password});
  }


  render() {
      return (
        <div>
          <TextField
          hintText="Enter your Username"
          floatingLabelText="Username"
          onChange = {(event,newValue) => this.changeUserName(event, newValue)}
          />
          <br/>
          <TextField
            type="password"
            hintText="Enter your Password"
            floatingLabelText="Password"
            onChange = {(event,newValue) => this.changePassword(event, newValue)}
            />
          <br/>
          <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleSubmit(event)}/>
          <RaisedButton label="Create Account" primary={true} style={style} onClick={(event) => this.handleCreateLocalAccount(event)}/>
          <Divider />
          <RaisedButton label="Sign in to Google" primary={true} style={style} onClick={(event) => this.goToGoogle(event)}/>
        </div>
      )
  }

}

const style = {
  margin: 15,
};

