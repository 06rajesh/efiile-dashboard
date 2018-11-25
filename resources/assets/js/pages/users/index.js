/**
 * Created by Rajesh on 11/21/18.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Layout from '../layout';

import {getUsersList, createNewUser, deleteUserById} from '../../actions/usersActions';
import ConfirmModal from '../../components/confirmModal';
import Pagination from '../../components/pagination';
import NewUserForm from './newUserForm';

import { withStyles } from '@material-ui/core/styles';
import Green from '@material-ui/core/colors/green';
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
    },
    activeColor: {
        color: Green[600]
    },
    centerText: {
        textAlign: 'center'
    }
});

class Users extends Component{
    constructor(props){
        super(props);
        this.state = {
            limit: 10,
            offset: 0,
            users: [],
            addModal: false,
            error: '',
            showConfirmModal: false,
            selected: null
        };

        this.getAllUsers = this.getAllUsers.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.renderAddModal = this.renderAddModal.bind(this);
        this.handleNewUserRequest = this.handleNewUserRequest.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.showDeleteConfirmDialogue = this.showDeleteConfirmDialogue.bind(this);
    }

    componentDidMount(){
        this.getAllUsers(this.state.limit, 0);
    }

    getAllUsers(limit=10, offset=0){
        getUsersList(limit, offset).then((response) => {
            this.setState({
                users: response.data,
                limit: limit,
                offset: offset
            });
        });
    }

    deleteUser(){
        let {selected, limit, offset} = this.state;

        deleteUserById({id : selected._id}).then((response) => {
            if(response.success){
                this.getAllUsers(limit, offset);
            }else{
                this.setState({
                    error: response.message
                });
            }
            this.handleClose();
        });

    }

    showDeleteConfirmDialogue(params){
        this.setState({
            selected: params,
            showConfirmModal: true
        });
    }

    handleNewUserRequest(params){
        this.handleClose();
        createNewUser(params).then((response) => {
            if(response.success){
                this.getAllUsers(this.state.limit, this.state.offset);
            }else{
                this.setState({
                    error: response.message
                });
            }
        })
    }

    handleClose(){
        this.setState({
            addModal        : false,
            showConfirmModal: false,
            selected        : null
        });
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
                            <IconButton className={`${classes.tableIcon}` + (row.canAddDB ? ` ${classes.activeColor}` : ``)}>
                                <Icon>{row.canAddDB ? 'check_box' : 'check_box_outline_blank'}</Icon>
                            </IconButton>
                        </TableCell>
                        <TableCell>
                            <IconButton className={`${classes.tableIcon}` + (row.canAddUser ? ` ${classes.activeColor}` : ``)}>
                                <Icon>{row.canAddUser ? 'check_box' : 'check_box_outline_blank'}</Icon>
                            </IconButton>
                        </TableCell>
                        <TableCell>
                            <IconButton className={`${classes.tableIcon}` + (row.canAddKey ? ` ${classes.activeColor}` : ``)}>
                                <Icon>{row.canAddKey ? 'check_box' : 'check_box_outline_blank'}</Icon>
                            </IconButton>
                        </TableCell>
                        <TableCell numeric>
                            <IconButton className={classes.tableIcon} onClick={() => this.showDeleteConfirmDialogue(row)}>
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
                    <ConfirmModal
                        message="Do You Really want to Delete selected User?"
                        active={this.state.showConfirmModal}
                        onClose={this.handleClose} onSubmit={this.deleteUser}
                    />
                    <Grid item xs={12} className={classes.gridStyles}>
                        <Paper>
                            <Table className={classes.table} padding="dense">
                                <TableHead>
                                    <TableRow>
                                        <TableCell padding="dense"/>
                                        <TableCell>Username</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell padding="none" className={classes.centerText}>Database</TableCell>
                                        <TableCell padding="none" className={classes.centerText}>User</TableCell>
                                        <TableCell padding="none" className={classes.centerText}>Api Key</TableCell>
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
                        <Pagination limit={this.state.limit} offset={this.state.offset} itemList={this.state.users} fetchAction={this.getAllUsers.bind(this)}/>
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
