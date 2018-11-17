/**
 * Created by talha on 11/13/18.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: '100%',
        backgrondColor: '#fafafa'
    },
    paper : {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        maxWidth: '350px'
    }
});

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            classes : props.classes
        }
    }

    render(){
        let {classes} = this.state;

        return(
            <Grid container className={classes.root} direction="row" justify="center" alignItems="center">
                <Paper className={classes.paper} elevation={5}>
                    <Typography variant="h5" component="h3">
                        This is a sheet of paper.
                    </Typography>
                    <Typography component="p">
                        Paper can be used to build surface or other elements for your application.
                    </Typography>
                </Paper>
            </Grid>
        )
    }

}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);