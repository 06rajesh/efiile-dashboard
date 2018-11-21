/**
 * Created by Rajesh on 11/21/18.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Layout from '../layout';

import {getUsersList, createNewUser} from '../../actions/usersActions';
import UserItem from './userItem';
import NewUserForm from './newUserForm';

import { withStyles } from '@material-ui/core/styles';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 65,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
    },
    snackBarError: {
        maxWidth: '100%',
        backgroundColor: theme.palette.error.dark,
    }
});

class Users extends Component{
    constructor(props){
        super(props);
        this.state = {
            users: [],
            addModal: false,
            error: ''
        };

        this.getAllUsers = this.getAllUsers.bind(this);
        this.renderAddModal = this.renderAddModal.bind(this);
        this.handleNewUserRequest = this.handleNewUserRequest.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount(){
        this.getAllUsers();
    }

    getAllUsers(){
        getUsersList().then((response) => {
            this.setState({
                users: response.data
            });
        });
    }

    handleNewUserRequest(params){
        this.handleClose();
        createNewUser(params).then((response) => {
            if(response.success){
                this.getAllUsers();
            }else{
                this.setState({
                    error: response.message
                });
            }
        })
    }

    handleClose(){
        this.setState({addModal: false});
    }

    renderAddModal(){
        let {classes} = this.props;

        return(
            <Modal
                aria-labelledby="new-dbform-title"
                aria-describedby="new-dbform-description"
                open={this.state.addModal}
                onClose={this.handleClose}
            >
                <div className={classes.paper}>
                    <NewUserForm onSubmit={this.handleNewUserRequest}/>
                </div>
            </Modal>
        );
    }

    render(){

        let {classes} = this.props;

        const action = (
            <IconButton color="inherit" size="small" onClick={() => this.setState({error: ''})}>
                <Icon>close</Icon>
            </IconButton>
        );

        let userItems = this.state.users.map((item, index) => {
            return(
                <UserItem user={item} position={index} key={index}/>
            );
        });

        return(
            <Layout title="Users List" pageIcon="supervisor_account">
                {this.renderAddModal()}
                <Grid container spacing={24}>
                    {
                        this.state.error.length > 0 &&
                        <Grid item xs={12} className={classes.gridStyles}>
                            <SnackbarContent className={classes.snackBarError} message={this.state.error}
                                             action={action}/>
                        </Grid>
                    }
                    <UserItem type="AddNew" onClick={() => this.setState({addModal: true})}/>
                    {userItems}
                </Grid>
            </Layout>
        )
    }
}

Users.propTypes = {
    classes : PropTypes.object.isRequired
};

export default withStyles(styles)(Users);
