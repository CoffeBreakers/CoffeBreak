import React from 'react';


export default class PopoverExampleSimple extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
          user_name: "Login Name", 
          password: "*****"
        };
  };

  changeUserName(event) {
    this.setState({ user_name: event.target.value });
  }

  changePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit() {
      console.log("submitting " + user_name + " password: " + password);
  }


  render() {
      return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Login</h3>
        </div>
        <div className="panel-body text-center">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">

              <input
                value={this.state.user_name}
                type="text"
                className="form-control text-center"
                id="userName"
                onChange={this.changeUserName}
                required
              />
              <input
                value={this.state.password}
                type="password"
                className="form-control text-center"
                id="password"
                onChange={this.changePassword}
                required
              />
              
              <br />
              <button
                className="btn btn-primary"
                type="submit"
              >
                Submit
              </button>
              
            </div>
          </form>
        </div>
      </div>
      )
  }

}