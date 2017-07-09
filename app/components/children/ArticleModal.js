import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class ArticleModal extends React.Component {
    constructor(props) {
        super(props);
    }
  
  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={() => this.props.closeModal()}
      />,
    ];

    return (
      <div>
        <Dialog
          title={this.props.article.title}
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={() => this.props.closeModal()}
        >
          {this.props.article.text}
        </Dialog>
      </div>
    );
  }
}