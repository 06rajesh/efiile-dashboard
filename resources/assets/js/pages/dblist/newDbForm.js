/**
 * Created by Rajesh on 11/21/18.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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


class NewDbForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            title: '',
            host: '',
            port: '3306',
            name: '',
            user: '',
            enabled: false,
            password: '',
            confirm: '',
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        let {type, selected} = this.props;

        if(type === 'edit'){
            this.setState({
                id: selected._id,
                title: selected.title ? selected.title : '',
                host : selected.dbHost ? selected.dbHost : '',
                port: selected.dbPort ? selected.dbPort : '',
                name: selected.dbName ? selected.dbName : '',
                user: selected.dbUser ? selected.dbUser : '',
                enabled: selected.enable ? selected.enable : false,
                password: selected.dbPassword ? selected.dbPassword : '',
                confirm: selected.dbPassword ? selected.dbPassword : '',
            });
        }
    }

    handleSubmit(){
        let {title, host, port, name, user, password, confirm} = this.state;
        let error = '';

        if(title.length < 1 || host.length < 1 || port.length < 1 || name.length < 1 || user.length < 1 ){
            error = 'Database Properties can not be empty';
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
                        <Typography variant="h6" align="center">{this.props.type === 'new' ? 'Add New Database' : 'Edit Database'}</Typography>
                    </Grid>
                    {   this.state.error.length > 0 &&
                        <Grid item xs={12} className={classes.gridStyles}>
                            <SnackbarContent className={classes.snackBarError} message={this.state.error}
                                             action={action}/>
                        </Grid>
                    }
                    <Grid item xs={12} className={classes.gridStyles}>
                        <TextField id="title" label="Database Title" type="text" name="title" value={this.state.title} onChange={this.handleChange} margin="normal" variant="outlined" fullWidth/>
                    </Grid>
                    <Grid item xs={6} className={classes.gridStyles}>
                        <TextField id="host" label="Database Host" type="text" name="host" value={this.state.host} onChange={this.handleChange} margin="normal" variant="outlined" fullWidth/>
                    </Grid>
                    <Grid item xs={6} className={classes.gridStyles}>
                        <TextField id="port" label="Database Port" type="text" name="port" value={this.state.port} onChange={this.handleChange} margin="normal" variant="outlined" fullWidth/>
                    </Grid>
                    <Grid item xs={6} className={classes.gridStyles}>
                        <TextField id="name" label="Database Name" type="text" name="name" value={this.state.name} onChange={this.handleChange} margin="normal" variant="outlined" fullWidth/>
                    </Grid>
                    <Grid item xs={6} className={classes.gridStyles}>
                        <TextField id="user" label="Database User" type="text" name="user" value={this.state.user} onChange={this.handleChange} margin="normal" variant="outlined" fullWidth/>
                    </Grid>
                    <Grid item xs={6} className={classes.gridStyles}>
                        <TextField id="password" label="Database Password" type="password" name="password" value={this.state.password} onChange={this.handleChange} margin="normal" variant="outlined" fullWidth/>
                    </Grid>
                    <Grid item xs={6} className={classes.gridStyles}>
                        <TextField id="confirm" label="Confirm Password" type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} margin="normal" variant="outlined" fullWidth/>
                    </Grid>
                    {/*<Grid item xs={4}>*/}
                        {/*<Button variant="outlined" color="default" size="small" fullWidth>*/}
                            {/*Check Connection*/}
                        {/*</Button>*/}
                    {/*</Grid>*/}
                    <Grid item xs={3}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="primary"
                                    checked={this.state.enabled}
                                    onChange={() => this.setState({enabled: !this.state.enabled})}
                                />
                            }
                            label="Enabled"
                        />
                    </Grid>
                    <Grid item xs={5}/>
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

NewDbForm.propTypes = {
    classes  : PropTypes.object.isRequired,
    onSubmit : PropTypes.func,
    type     : PropTypes.oneOf(['edit', 'new']),
    selected : PropTypes.object
};

NewDbForm.defaultProps = {
    type: 'new'
};

export default withStyles(styles)(NewDbForm);
