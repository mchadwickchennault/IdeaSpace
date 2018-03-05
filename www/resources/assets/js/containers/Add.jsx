import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';

import Header from '../components/Header';
import { postIdea, ideaSaved } from '../actions/actions';

const style = { margin: '1.5vw' };
const paperStyle = {
  ...style,
  height: '20vw',
  width: '50vw',
};
class Add extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.state = {
      title: '',
      description: '',
      titleError: '',
      descError: '',
      open: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dupTitle) {
      this.setState({
        open: true,
      });
    }
  }

  handleChange(event) {
    const { target } = event;
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  handleDialogClose() {
    this.setState({
      open: false,
    });
    this.props.resetProps();
  }

  handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    const { title, description } = this.state;

    this.setState({
      titleError: title ? '' : 'A title is required',
      descError: description ? '' : 'A description is required',
    });

    if (!title || !description) return;

    const body = {
      title,
      description,
    };
    this.props.postIdea(body, this.props.history);
  }

  render() {
    const dialogActions = [
      <RaisedButton
        label="OK"
        primary
        keyboardFocused
        onClick={this.handleDialogClose}
      />,
    ];
    return (
      <div>
        <Header />
        <Dialog
          title="Duplicate Title"
          actions={dialogActions}
          open={this.state.open}
          onRequestClose={this.handleDialogClose}
        >
          Every idea must have a unique title
        </Dialog>
        {this.props.loading ? <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%' }} /> : null}
        <Paper style={paperStyle}>
          <form onSubmit={this.handleSubmit} style={style}>
            <TextField
              name="title"
              hintText="Title"
              onChange={this.handleChange}
              value={this.state.title}
              errorText={this.state.titleError}
              fullWidth
            />
            <br />
            <TextField
              name="description"
              hintText="Description"
              multiLine
              rows={4}
              onChange={this.handleChange}
              value={this.state.description}
              errorText={this.state.descError}
              fullWidth
            />
            <br />
            <div style={{ textAlign: 'right' }}>
              <Link to="/" href="/">
                <RaisedButton label="Cancel" primary style={style} />
              </Link>
              <RaisedButton label="Save" primary style={style} onClick={this.handleSubmit} />
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}

Add.propTypes = {
  postIdea: PropTypes.func.isRequired,
  resetProps: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  dupTitle: PropTypes.bool.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

const mapStateToProps = state => ({
  loading: state.loading,
  dupTitle: state.dupTitle,
});

const mapDispatchToProps = dispatch => ({
  postIdea: (body, history) => dispatch(postIdea(body, history)),
  resetProps: () => dispatch(ideaSaved()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Add);

