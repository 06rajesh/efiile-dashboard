/**
 * Created by Rajesh on 11/20/18.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Layout from '../layout';

import {getDbNodeList, createNewDB, deleteDBbyID, updateDBDoc} from '../../actions/dbNodeActions';
import Pagination from '../../components/pagination';
import DBItem from './dbitem';
import NewDbForm from './newDbForm';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

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
    button: {
        margin: theme.spacing.unit * 0.5,
        float: 'right'
    },
    snackBarError: {
        maxWidth: '100%',
        backgroundColor: theme.palette.error.dark,
    }
});

class DBList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dblist: [],
            limit: 10,
            offset: 0,
            selected: null,
            open: false,
            newModal: false,
            editModal: false,
            newDb: {},
            error: ''
        };

        this.fetchAllDb = this.fetchAllDb.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDeleteRequest = this.handleDeleteRequest.bind(this);
        this.renderConfirmModal = this.renderConfirmModal.bind(this);
        this.renderAddNewListItem = this.renderAddNewListItem.bind(this);
        this.onDeleteItemClick = this.onDeleteItemClick.bind(this);
        this.onEditItemClick = this.onEditItemClick.bind(this);
        this.createNewDatabase = this.createNewDatabase.bind(this);
        this.editCurrentDatabase = this.editCurrentDatabase.bind(this);
    }

    componentDidMount(){
        this.fetchAllDb();
    }

    fetchAllDb(limit=10, offset=0){
        getDbNodeList(limit, offset).then((response) => {
            this.setState({
                dblist: response.data,
                limit: limit,
                offset: offset
            });
        });
    }

    createNewDatabase(params){
        this.handleClose();
        createNewDB(params).then((response) => {
            if(response.success){
                this.fetchAllDb();
            }else{
                this.setState({
                    error: response.message
                });
            }
        })
    }

    editCurrentDatabase(params){
        this.handleClose();
        updateDBDoc(params).then((response) => {
            if(response.success){
                this.fetchAllDb(this.state.limit, this.state.offset);
            }else{
                this.setState({
                    error: response.message
                });
            }
        })
    }

    handleDeleteRequest(){
        let {selected, limit, offset} = this.state;

        deleteDBbyID({id: selected._id}).then((response) => {
            if(response.success){
                this.fetchAllDb(limit, offset);
            }
        });
        this.handleClose();
    }

    handleClose(){
        this.setState({ open: false, newModal: false, editModal: false });
    }

    onDeleteItemClick(itemIndex){
        this.setState({
            selected: this.state.dblist[itemIndex],
        }, () => {
            this.setState({open: true});
        });
    }

    onEditItemClick(itemIndex){
        this.setState({
            selected: this.state.dblist[itemIndex],
        }, () => {
            this.setState({editModal: true});
        });
    }

    renderConfirmModal(){
        let {classes} = this.props;

        return(
            <Modal
                aria-labelledby="confirm-delete-title"
                aria-describedby="confirm-delete-description"
                open={this.state.open}
                onClose={this.handleClose}
            >
                <div className={classes.paper}>
                    {   this.state.selected !== null &&
                        <Typography variant="subtitle1">
                            Do You Really Want to Delele Database Credential of <b>{this.state.selected.dbName}</b> at <b>{this.state.selected.dbHost}</b>
                        </Typography>
                    }
                    <Button variant="contained" size="medium" color="default" className={classes.button} onClick={this.handleClose}>
                        No
                    </Button>
                    <Button variant="contained" size="medium" color="secondary" className={classes.button} onClick={this.handleDeleteRequest}>
                        Yes
                    </Button>
                </div>
            </Modal>
        );
    }

    renderAddModal(){
        let {classes} = this.props;

        return(
            <Modal
                aria-labelledby="new-dbform-title"
                aria-describedby="new-dbform-description"
                open={this.state.newModal}
                onClose={this.handleClose}
            >
                <div className={classes.paper}>
                    <NewDbForm onSubmit={this.createNewDatabase}/>
                </div>
            </Modal>
        );
    }

    renderEditModal(){
        let {classes} = this.props;

        return(
            <Modal
                aria-labelledby="edit-dbform-title"
                aria-describedby="edit-dbform-description"
                open={this.state.editModal}
                onClose={this.handleClose}
            >
                <div className={classes.paper}>
                    <NewDbForm selected = {this.state.selected} type="edit" onSubmit={this.editCurrentDatabase}/>
                </div>
            </Modal>
        );
    }

    renderAddNewListItem(){
        return(
            <ListItem button onClick={() => this.setState({newModal: true})}>
                <Avatar>
                    <Icon>add</Icon>
                </Avatar>
                <ListItemText primary="Add New" />
            </ListItem>
        );
    }

    render(){

        let {classes} = this.props;

        const action = (
            <IconButton color="inherit" size="small" onClick={() => this.setState({error: ''})}>
                <Icon>close</Icon>
            </IconButton>
        );

        let listItems = this.state.dblist.map((item, index) => {
            return(
                <DBItem item={item} key={index} position={index} onDelete={this.onDeleteItemClick} onEdit={this.onEditItemClick}/>
            );
        });

        return(
            <Layout title="Database Listing" pageIcon="dns">
                {this.renderAddModal()}
                {this.renderEditModal()}
                {this.renderConfirmModal()}
                {
                    this.state.error.length > 0 &&
                    <SnackbarContent className={classes.snackBarError} message={this.state.error}
                                     action={action}/>
                }
                <List>
                    {this.renderAddNewListItem()}
                    {listItems}
                </List>
                <Pagination itemList={this.state.dblist} limit={this.state.limit} offset={this.state.offset} fetchAction={this.fetchAllDb.bind(this)}/>
            </Layout>
        )
    }

}

DBList.propTypes = {
    classes : PropTypes.object.isRequired
};

export default withStyles(styles)(DBList);
