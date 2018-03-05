import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { getIdeas } from '../actions/actions';
import Header from '../components/Header';

class Main extends Component {
  constructor() {
    super();
    this.renderideas = this.renderideas.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
    this.state = {
      title: '',
      description: '',
      open: false,
    };
  }

  componentDidMount() {
    this.props.getIdeas();
  }

  onRowClick(rowNumber) {
    const { title, description } = this.props.ideas[rowNumber];
    this.setState({
      title,
      description,
      open: true,
    });
  }

  handleDialogClose() {
    this.setState({
      open: false,
    });
  }

  renderideas() {
    const { ideas } = this.props;
    return ideas.map(idea => (
      <TableRow key={idea.id} >
        <TableRowColumn width="15%">{idea.title}</TableRowColumn>
        <TableRowColumn width="85%">{idea.description}</TableRowColumn>
      </TableRow>
    ));
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
          title={this.state.title}
          actions={dialogActions}
          open={this.state.open}
          onRequestClose={this.handleDialogClose}
        >
          {this.state.description}
        </Dialog>
        {this.props.loading ? <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%' }} /> : null}
        <Link to="/add" href="/add">
          <FloatingActionButton style={{ position: 'absolute', top: '85vh', left: '92vw' }} >
            <ContentAdd />
          </FloatingActionButton>
        </Link>
        <Table height="80vh" onCellClick={this.onRowClick}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn
                width="15%"
                tooltip="The name of the idea"
              >Title
              </TableHeaderColumn>
              <TableHeaderColumn
                width="85%"
                tooltip="A brief description of the idea"
              >Description
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} >
            {this.renderideas()}
          </TableBody>
        </Table>
      </div>

    );
  }
}

Main.propTypes = {
  loading: PropTypes.bool.isRequired,
  ideas: PropTypes.array.isRequired,
  getIdeas: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ideas: state.ideas,
  loading: state.loading,
});

const mapDispatchToProps = dispatch => ({ getIdeas: () => dispatch(getIdeas()) });

export default connect(mapStateToProps, mapDispatchToProps)(Main);
