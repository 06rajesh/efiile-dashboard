/**
 * Created by Rajesh on 11/20/18.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Layout from '../layout';

import {getDbNodeList, createNewDB, deleteDBbyID} from '../../actions/dbNodeActions';
import DBItem from './dbitem';
import NewDbForm from './newDbForm';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
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
    button: {
        margin: theme.spacing.unit * 0.5,
        float: 'right'
    }
});

class DBList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dblist: [],
            selected: null,
            open: false,
            newModal: false,
            newDb: {}
        };

        this.fetchAllDb = this.fetchAllDb.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDeleteRequest = this.handleDeleteRequest.bind(this);
        this.renderConfirmModal = this.renderConfirmModal.bind(this);
        this.renderAddNewListItem = this.renderAddNewListItem.bind(this);
        this.onItemClick = this.onItemClick.bind(this);
        this.createNewDatabase = this.createNewDatabase.bind(this);
    }

    componentDidMount(){
        this.fetchAllDb();
    }

    fetchAllDb(){
        getDbNodeList().then((response) => {
            this.setState({
                dblist: response.data
            });
        });
    }

    createNewDatabase(params){
        this.handleClose();
        createNewDB(params).then((response) => {
            if(response.success){
                this.fetchAllDb();
            }
        })
    }

    handleDeleteRequest(){
        deleteDBbyID({id: this.state.selected._id}).then((response) => {
            if(response.success){
                this.fetchAllDb();
            }
        });
        this.handleClose();
    }

    handleClose(){
        this.setState({ open: false, newModal: false });
    }

    onItemClick(itemIndex){
        this.setState({
            selected: this.state.dblist[itemIndex],
        }, () => {
            this.setState({open: true});
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

        let listItems = this.state.dblist.map((item, index) => {
            return(
                <DBItem item={item} key={index} position={index} onItemClick={this.onItemClick}/>
            );
        });

        return(
            <Layout title="Database Listing" pageIcon="dns">
                {this.renderAddModal()}
                {this.renderConfirmModal()}
                <List>
                    {this.renderAddNewListItem()}
                    {listItems}
                </List>
            </Layout>
        )
    }

}

DBList.propTypes = {
    classes : PropTypes.object.isRequired
};

export default withStyles(styles)(DBList);
