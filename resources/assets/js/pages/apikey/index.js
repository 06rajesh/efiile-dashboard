/**
 * Created by Rajesh on 11/22/18.
 */


import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Layout from '../layout';

import {createNewApiKey, getApiKeyList, deleteById, updateKeyStatus} from '../../actions/apiKeyActions';
import Pagination from '../../components/pagination';
import NewApiKey from './newApiKey';
import ConfirmModal from '../../components/confirmModal';

import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Modal from '@material-ui/core/Modal';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    gridStyles: {
        paddingTop: '0!important',
        paddingBottom: '0!important'
    },
    formContainer: {
        padding: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 4
    },
    labelStyle: {
        width: '100%'
    },
    keyInputStyle: {
        padding: '10px'
    },
    tableIconStyle: {
        width: '30px',
        height: '30px'
    },
    modalContent: {
        position: 'absolute',
        width: theme.spacing.unit * 65,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
    },
    enabledClass: {
        color: green[600]
    },
    disabledClass: {
        color: 'rgba(0,0,0,0.6)'
    },
    tableIcon: {
        padding: '6px'
    },
    paginationContainer: {
        marginTop: '15px',
        textAlign: 'right'
    }
});

class ApiKey extends Component {

    constructor(props) {
        super(props);

        this.state = {
            limit: 10,
            offset: 0,
            keyList: [],
            selected: null,
            newModal: false,
            showDeleteModal: false,
            showEditModal: false
        };

        this.renderNewKeyForm = this.renderNewKeyForm.bind(this);
        this.renderKeyRow = this.renderKeyRow.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.showDeleteConfirmDialogue = this.showDeleteConfirmDialogue.bind(this);
        this.showEditConfirmDialogue = this.showEditConfirmDialogue.bind(this);
        this.deleteApiKey = this.deleteApiKey.bind(this);
        this.toggleEnableKey = this.toggleEnableKey.bind(this);
    }

    componentDidMount(){
        this.fetchApiKey(this.state.limit, 0);
    }

    handleSubmit(params){
        createNewApiKey(params).then((response) => {
            if(response.success){
                this.fetchApiKey(this.state.limit, 0);
                this.handleClose();
            }
        });
    }

    showDeleteConfirmDialogue(params){
        this.setState({
            showDeleteModal: true,
            selected: params
        });
    }

    showEditConfirmDialogue(params){
        this.setState({
            showEditModal: true,
            selected: params
        });
    }

    deleteApiKey(){
        let {selected, limit, offset} = this.state;
        if(selected !== null){
            deleteById({id: selected._id}).then((response) => {
                if(response.success){
                    this.fetchApiKey(limit, offset);
                }
                this.handleClose();
            })
        }
    }

    toggleEnableKey(){
        let {selected, limit, offset} = this.state;
        if(selected !== null){
            let changedKey = {
                id: selected._id,
                enabled: !selected.enable
            };

            updateKeyStatus(changedKey).then((response) => {
                if(response.success){
                    this.fetchApiKey(limit, offset);
                }
                this.handleClose();
            })
        }
    }

    handleClose(){
        this.setState({
            newModal: false,
            showDeleteModal: false,
            showEditModal: false,
            selected: null
        });
    }

    fetchApiKey (limit=10, offset=0) {
        getApiKeyList(limit, offset).then((response) => {
            this.setState({
                keyList: response.data,
                limit: limit,
                offset: offset
            });
        })
    }

    renderNewKeyForm(){
        let {classes} = this.props;
        return(
            <Modal
                aria-labelledby="new-dbform-title"
                aria-describedby="new-dbform-description"
                open={this.state.newModal}
                onClose={this.handleClose}
            >
                <div className={classes.modalContent}>
                    <NewApiKey onSubmit={this.handleSubmit}/>
                </div>
            </Modal>
        );
    }

    renderKeyRow(){
        let {keyList} = this.state;
        let {classes} = this.props;

        if(keyList){
            return keyList.map((row, index) => {
                let typeClass = row.enable ? classes.enabledClass : classes.disabledClass;
                let iconString = row.enable ? 'check_circle_outline' : 'highlight_off';

                return (
                    <TableRow key={index}>
                        <TableCell component="th" padding="dense">
                            <Avatar className={classes.tableIconStyle}><Icon>vpn_key</Icon></Avatar>
                        </TableCell>
                        <TableCell scope="row">
                            {row.key}
                        </TableCell>
                        <TableCell>
                            <IconButton className={classes.tableIcon} onClick={() => this.showEditConfirmDialogue(row)}>
                                <Icon className={typeClass}>{iconString}</Icon>
                            </IconButton>
                        </TableCell>
                        <TableCell numeric padding="none">{ApiKey.timeSince(row.createdAt)}</TableCell>
                        <TableCell numeric>
                            <IconButton className={classes.tableIcon} onClick={() => this.showDeleteConfirmDialogue(row)}>
                                <Icon>delete</Icon>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                );
            });
        }else{
            return(
                <TableRow/>
            );
        }
    }

    render(){

        let {classes} = this.props;


        return(
            <Layout title="Api Key List" pageIcon="vpn_key">
                {this.renderNewKeyForm()}
                <ConfirmModal
                    message="Do You Really Want Delete This Key?"
                    active={this.state.showDeleteModal}
                    onClose={this.handleClose} onSubmit={this.deleteApiKey}
                />
                <ConfirmModal
                    message="Do You Really want to Enable/Disable This Api Key?"
                    active={this.state.showEditModal}
                    onClose={this.handleClose} onSubmit={this.toggleEnableKey}
                />
                <Paper>
                    <Table className={classes.table} padding="dense">
                        <TableHead>
                            <TableRow>
                                <TableCell padding="dense"/>
                                <TableCell>Key</TableCell>
                                <TableCell padding="none">Enabled</TableCell>
                                <TableCell numeric padding="none">Created</TableCell>
                                <TableCell numeric>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow hover onClick={() => this.setState({newModal: true})} style={{cursor: 'pointer'}}>
                                <TableCell component="th" padding="dense">
                                    <Avatar className={classes.tableIconStyle}><Icon>add</Icon></Avatar>
                                </TableCell>
                                <TableCell>Add New Key</TableCell>
                                <TableCell numeric padding="none"/>
                                <TableCell numeric padding="none"/>
                                <TableCell numeric/>
                            </TableRow>
                            {this.renderKeyRow()}
                        </TableBody>
                    </Table>
                </Paper>
                <Pagination limit={this.state.limit} offset={this.state.offset} itemList={this.state.keyList} fetchAction={this.fetchApiKey.bind(this)}/>
            </Layout>
        )
    }

}


// return time ago from date string
ApiKey.timeSince = function (date) {
    date = new Date(date);
    let seconds = Math.floor((new Date() - date) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
        return interval + " year" + (interval > 1 ? "s" : '') + " ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        return interval + " month" + (interval > 1 ? "s" : '') + " ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return interval + " day" + (interval > 1 ? "s" : '') + " ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return interval + " hour" + (interval > 1 ? "s" : '') + " ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " min"+ (interval > 1 ? "s" : '') + " ago";
    }
    return Math.floor(seconds) + " secs ago";
};

ApiKey.propTypes = {
    classes : PropTypes.object.isRequired
};

export default withStyles(styles)(ApiKey);
