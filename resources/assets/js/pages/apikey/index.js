/**
 * Created by Rajesh on 11/22/18.
 */


import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Layout from '../layout';

import {createNewApiKey, getApiKeyList} from '../../actions/apiKeyActions';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    gridStyles: {
        paddingTop: '0!important',
        paddingBottom: '0!important'
    },
});

class ApiKey extends Component {

    constructor(props) {
        super(props);

        this.state = {
            key: '',
            apiList: []
        };

        this.renderNewKeyForm = this.renderNewKeyForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.fetchApiKey(10, 10);
    }

    handleSubmit(){
        if(this.state.key.length > 0){
            createNewApiKey(this.state).then((response) => {
                console.log(response);
            });
        }
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    fetchApiKey (limit=10, offset=0) {
        getApiKeyList(limit, offset).then((response) => {
            this.setState({
                apiList: response.data
            });
        })
    }

    renderNewKeyForm(){
        let {classes} = this.props;
        return(
            <form>
                <Grid container spacing={24}>
                    <Grid item xs={8} className={classes.gridStyles}>
                        <TextField id="key" label="Api Key" type="text" name="key" value={this.state.key} onChange={this.handleChange} margin="normal" variant="outlined" fullWidth/>
                    </Grid>
                    <Grid item xs={4} className={classes.gridStyles}>
                        <Button variant="contained" color="primary" fullWidth onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        );
    }

    renderKeyRow(){
        let {keyList} = this.state;

        if(keyList.length > 0){
            return keyList.map((row, index) => {
                return (
                    <TableRow key={index}>
                        <TableCell component="th" scope="row">
                            {row.key}
                        </TableCell>
                        <TableCell numeric>{row.enabled}</TableCell>
                        <TableCell numeric>{row.createdAt}</TableCell>
                    </TableRow>
                );
            });
        }else{
            return(<TableRow/>);
        }
    }

    render(){

        let {classes} = this.props;


        return(
            <Layout title="Api Key List" pageIcon="vpn_key">
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Key</TableCell>
                                <TableCell numeric>Enabled</TableCell>
                                <TableCell numeric>Created</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.renderKeyRow.bind(this)}
                        </TableBody>
                    </Table>
                </Paper>
            </Layout>
        )
    }

}

ApiKey.propTypes = {
    classes : PropTypes.object.isRequired
};

export default withStyles(styles)(ApiKey);
