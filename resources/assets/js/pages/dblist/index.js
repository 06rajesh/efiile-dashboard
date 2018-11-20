/**
 * Created by Rajesh on 11/20/18.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Layout from '../layout';

import {getDbNodeList} from '../../actions/dbNodeActions';
import DBItem from './dbitem';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import List from '@material-ui/core/List';

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
            open: false
        };

        this.handleClose = this.handleClose.bind(this);
        this.renderConfirmModal = this.renderConfirmModal.bind(this);
        this.onItemClick = this.onItemClick.bind(this);
    }

    componentDidMount(){
        getDbNodeList().then((response) => {
            this.setState({
                dblist: response.data
            });
        })
    }

    handleClose(){
        this.setState({ open: false });
    }

    onItemClick(itemIndex){
        this.setState({
            selected: this.state.dblist[itemIndex],
        }, () => {
            this.setState({open: true});
            console.log(this.state.selected.dbHost);
        });
    }

    renderConfirmModal(){
        let {classes} = this.props;

        return(
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
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
                    <Button variant="contained" size="medium" color="secondary" className={classes.button}>
                        Yes
                    </Button>
                </div>
            </Modal>
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
                {this.renderConfirmModal()}
                <List>
                    {listItems}
                </List>
            </Layout>
        )
    }

};

DBList.propTypes = {
    classes : PropTypes.object.isRequired
};

export default withStyles(styles)(DBList);
