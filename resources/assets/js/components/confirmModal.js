/**
 * Created by Rajesh on 11/25/18.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
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
    messageStyle: {
        marginBottom: '15px'
    },
    gridStyles: {
        paddingTop: '0!important',
        paddingBottom: '0!important'
    },
});

class ConfirmModal extends Component{
    constructor(props){
        super(props);
        this.renderConfirmForm.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(){
        if(this.props.onClose){
            this.props.onClose();
        }
    }

    renderConfirmForm(){
        let {classes, message, onSubmit} = this.props;

        return(
            <Grid container spacing={24}>
                <Grid item xs={12} className={classes.gridStyles}>
                    <Typography variant="h6">Confirm Action</Typography>
                </Grid>
                <Grid item xs={12} className={classes.gridStyles}>
                    <Typography variant="body1" className={classes.messageStyle}>{message}</Typography>
                </Grid>
                <Grid item xs={6} className={classes.gridStyles}/>
                <Grid item xs={3} className={classes.gridStyles}>
                    <Button variant="contained" color="primary" fullWidth onClick={onSubmit}>
                        Yes
                    </Button>
                </Grid>
                <Grid item xs={3} className={classes.gridStyles}>
                    <Button variant="contained" color="default" fullWidth onClick={this.handleClose}>
                        No
                    </Button>
                </Grid>
            </Grid>
        );
    }

    render(){
        let {classes} = this.props;
        return(
            <Modal
                aria-labelledby="confirm-modal-label"
                aria-describedby="confirm-modal-description"
                open={this.props.active}
                onClose={this.handleClose}
            >
                <div className={classes.modalContent}>
                    {this.renderConfirmForm()}
                </div>
            </Modal>
        );
    }
}

ConfirmModal.propTypes = {
    classes: PropTypes.object.isRequired,
    message: PropTypes.string,
    active: PropTypes.bool,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func
};

ConfirmModal.defaultProps = {
    message: 'Do You want To Confirm Your Action??'
};

export default withStyles(styles)(ConfirmModal);
