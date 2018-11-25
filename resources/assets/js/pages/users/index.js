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
import Avatar from '@material-ui/core/Avatar';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


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
    },
    tableIcon: {
        padding: '6px'
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

    renderKeyRow(){
        let {users} = this.state;
        let {classes} = this.props;

        if(users) {
            return users.map((row, index) => {
                return (
                    <TableRow key={index}>
                        <TableCell component="th" padding="dense">
                            <Avatar className={classes.tableIconStyle}><Icon>person</Icon></Avatar>
                        </TableCell>
                        <TableCell>
                            {row.username}
                        </TableCell>
                        <TableCell>
                            {row.email}
                        </TableCell>
                        <TableCell>
                            <IconButton className={classes.tableIcon}>
                                <Icon>{row.canAddDB ? 'check_box' : 'check_box_outline_blank'}</Icon>
                            </IconButton>
                        </TableCell>
                        <TableCell>
                            <IconButton className={classes.tableIcon}>
                                <Icon>{row.canAddUser ? 'check_box' : 'check_box_outline_blank'}</Icon>
                            </IconButton>
                        </TableCell>
                        <TableCell>
                            <IconButton className={classes.tableIcon}>
                                <Icon>{row.canAddKey ? 'check_box' : 'check_box_outline_blank'}</Icon>
                            </IconButton>
                        </TableCell>
                        <TableCell numeric>
                            <IconButton className={classes.tableIcon}>
                                <Icon>delete</Icon>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                );
            });
        }
    }

    render(){

        let {classes} = this.props;

        const action = (
            <IconButton color="inherit" size="small" onClick={() => this.setState({error: ''})}>
                <Icon>close</Icon>
            </IconButton>
        );

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
                    <Grid item xs={12} className={classes.gridStyles}>
                        <Paper>
                            <Table className={classes.table} padding="dense">
                                <TableHead>
                                    <TableRow>
                                        <TableCell padding="dense"/>
                                        <TableCell>Username</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell padding="none">Database</TableCell>
                                        <TableCell padding="none">User</TableCell>
                                        <TableCell padding="none">Api Key</TableCell>
                                        <TableCell numeric>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow hover onClick={() => this.setState({addModal: true})} style={{cursor: 'pointer'}}>
                                        <TableCell component="th" padding="dense">
                                            <Avatar className={classes.tableIconStyle}><Icon>add</Icon></Avatar>
                                        </TableCell>
                                        <TableCell>Add New </TableCell>
                                        <TableCell/>
                                        <TableCell numeric padding="none"/>
                                        <TableCell numeric padding="none"/>
                                        <TableCell numeric padding="none"/>
                                        <TableCell numeric/>
                                    </TableRow>
                                    {this.renderKeyRow()}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
            </Layout>
        )
    }
}

Users.propTypes = {
    classes : PropTypes.object.isRequired
};

export default withStyles(styles)(Users);
