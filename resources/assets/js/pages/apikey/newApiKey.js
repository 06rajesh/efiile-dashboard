/**
 * Created by Rajesh on 11/24/18.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import md5 from 'md5';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    gridStyles: {
        paddingTop: '0!important',
        paddingBottom: '0!important'
    },
    snackBarError: {
        backgroundColor: theme.palette.error.dark,
    }
});

class NewApiKey extends Component{

    constructor(props){
        super(props);

        this.state = {
            key: '',
            enabled: false,
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGenerateKey = this.handleGenerateKey.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleGenerateKey(){
        let generateString = new Date() + 'eFileSecretByRajesh';
        this.setState({
            key: md5(generateString.replace(/ /g, ''))
        });
    }

    handleSubmit(){
        if(this.state.key.length > 0 && this.props.onSubmit){
            this.props.onSubmit(this.state);
        }
    }

    render(){
        let {classes} = this.props;

        return(
            <form onSubmit={this.handleSubmit}>
                <Grid container spacing={24}>
                    <Grid item xs={12} className={classes.gridStyles}>
                        <Typography variant="h6" align="center">Add New Key</Typography>
                    </Grid>
                    <Grid item xs={9} className={classes.gridStyles}>
                        <TextField id="key" label="Generate API key" type="text" name="key"
                                   value={this.state.key}
                                   margin="none" fullWidth/>
                    </Grid>
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
                    <Grid item xs={3}/>
                    <Grid item xs={5}>
                        <Button variant="contained" color="default" fullWidth onClick={this.handleGenerateKey}>
                            Generate New key
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" color="primary" fullWidth onClick={this.handleSubmit}>
                            Save Key
                        </Button>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

NewApiKey.propTypes = {
    classes: PropTypes.object.isRequired,
    onSubmit: PropTypes.func
};

export default withStyles(styles)(NewApiKey);