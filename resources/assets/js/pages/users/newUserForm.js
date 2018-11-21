/**
 * Created by Rajesh on 11/21/18.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
    gridStyles: {
        paddingTop: '0!important',
        paddingBottom: '0!important'
    },
    snackBarError: {
        backgroundColor: theme.palette.error.dark,
    }
});


class NewUserForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            user: '',
            email: '',
            level: 0,
            password: '',
            confirm: '',
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(){
        let {user, email, password, confirm} = this.state;
        let error = '';

        if(user.length < 1 || email.length < 1 ){
            error = 'User Info can not be empty';
        }else if(password.length < 4){
            error= 'Minimum Password Length is 6';
        }else if(password !== confirm){
            error = 'Password and Confirm password Mismatch';
        }

        if(error.length > 0){
            this.setState({
                error : error
            });
        }else if(this.props.onSubmit){
            this.props.onSubmit(this.state);
        }

    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        let {classes} = this.props;

        const action = (
            <IconButton color="inherit" size="small" onClick={() => this.setState({error: ''})}>
                <Icon>close</Icon>
            </IconButton>
        );

        return(
            <form onSubmit={this.handleSubmit}>
                <Grid container spacing={24}>
                    <Grid item xs={12} className={classes.gridStyles}>
                        <Typography variant="h6" align="center">Add New User</Typography>
                    </Grid>
                    {   this.state.error.length > 0 &&
                    <Grid item xs={12} className={classes.gridStyles}>
                        <SnackbarContent className={classes.snackBarError} message={this.state.error}
                                         action={action}/>
                    </Grid>
                    }
                    <Grid item xs={12} className={classes.gridStyles}>
                        <TextField id="email" label="User Email" type="email" name="email" value={this.state.email} onChange={this.handleChange} margin="normal" variant="outlined" fullWidth/>
                    </Grid>
                    <Grid item xs={6} className={classes.gridStyles}>
                        <TextField id="user" label="Username" type="text" name="user" value={this.state.user} onChange={this.handleChange} margin="normal" variant="outlined" fullWidth/>
                    </Grid>
                    <Grid item xs={6} className={classes.gridStyles}>
                        <TextField id="level" label="User Level" type="number" name="level" value={this.state.level} onChange={this.handleChange} margin="normal" variant="outlined" fullWidth/>
                    </Grid>
                    <Grid item xs={6} className={classes.gridStyles}>
                        <TextField id="password" label="Password" type="password" name="password" value={this.state.password} onChange={this.handleChange} margin="normal" variant="outlined" fullWidth/>
                    </Grid>
                    <Grid item xs={6} className={classes.gridStyles}>
                        <TextField id="confirm" label="Confirm Password" type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} margin="normal" variant="outlined" fullWidth/>
                    </Grid>
                    <Grid item xs={8}/>
                    <Grid item xs={4}>
                        <Button variant="contained" color="primary" fullWidth onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        );
    }

}

NewUserForm.propTypes = {
    classes : PropTypes.object.isRequired,
    onSubmit : PropTypes.func
};

export default withStyles(styles)(NewUserForm);

