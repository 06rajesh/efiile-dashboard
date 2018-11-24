/**
 * Created by Rajesh on 11/22/18.
 */


import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Layout from '../layout';

import {createNewApiKey, getApiKeyList} from '../../actions/apiKeyActions';
import NewApiKey from './newApiKey';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Button from '@material-ui/core/Button';
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
    }
});

class ApiKey extends Component {

    constructor(props) {
        super(props);

        this.state = {
            keyList: [],
            newModal: false
        };

        this.renderNewKeyForm = this.renderNewKeyForm.bind(this);
        this.renderKeyRow = this.renderKeyRow.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount(){
        this.fetchApiKey(10, 0);
    }

    handleSubmit(params){
        createNewApiKey(params).then((response) => {
            if(response.success){
                this.fetchApiKey(10, 0);
                this.handleClose();
            }
        });
    }

    handleClose(){
        this.setState({
            newModal: false
        });
    }

    fetchApiKey (limit=10, offset=0) {
        getApiKeyList(limit, offset).then((response) => {
            this.setState({
                keyList: response.data
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
                        <TableCell component="th">
                            <Avatar className={classes.tableIconStyle}><Icon>vpn_key</Icon></Avatar>
                        </TableCell>
                        <TableCell scope="row">
                            {row.key}
                        </TableCell>
                        <TableCell numeric>
                            <Typography variant="body1" color="inherit">
                                <Icon className={typeClass}>{iconString}</Icon>
                            </Typography>
                        </TableCell>
                        <TableCell numeric>{ApiKey.timeSince(row.createdAt)}</TableCell>
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
                <Paper>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell/>
                                <TableCell>Key</TableCell>
                                <TableCell numeric>Enabled</TableCell>
                                <TableCell numeric>Created</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow hover onClick={() => this.setState({newModal: true})} style={{cursor: 'pointer'}}>
                                <TableCell component="th">
                                    <Avatar className={classes.tableIconStyle}><Icon>add</Icon></Avatar>
                                </TableCell>
                                <TableCell>Add New Key</TableCell>
                                <TableCell numeric/>
                                <TableCell numeric/>
                            </TableRow>
                            {this.renderKeyRow()}
                        </TableBody>
                    </Table>
                </Paper>
            </Layout>
        )
    }

}

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
