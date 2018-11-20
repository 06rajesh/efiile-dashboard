/**
 * Created by Rajesh on 11/13/18.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';

const styles = {
    root: {
        flexGrow: 1,
        padding: '10px',
        backgroundColor: '#03A9F4',
        position: 'relative'
    },
    grow: {
        flexGrow: 1,
    },
    body:{
        padding: '35px 0px',
        maxWidth: '750px',
        margin: '0 auto'
    },
    titleStyle: {
        color: '#ffffff',
        fontWeight: '200',
        textDecoration: 'none'
    },
    menuButton:{
        color: '#ffffff',
        position: 'absolute',
        top: '10%',
        right: '25px'
    },
    pageTitleContainer: {
        padding: '65px 0px',
        background: '#f9f9f9',
        borderBottom: '1px solid #f1f1f1',
        textAlign: 'center'
    },
    pageTitle: {
        fontSize: '45px',
        color: 'rgba(0,0,0,0.6)'
    },
    avatarStyle: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '70px',
        height: '70px'
    },
    pageIconStyle: {
        fontSize: '55px'
    }
};

class Layout extends Component {

    constructor(props) {
        super(props);
    }

    logOutClick(){
        window.location.href = '/logout';
    }

    render(){

        const {classes, children, title} = this.props;

        return(
            <div>
                <Paper square component="header" elevation={1} className={classes.root}>
                    <Link to='/' className={classes.titleStyle}>
                        <Typography variant="h4" className={classes.titleStyle} align="center">
                            Efile Admin Dashboard
                        </Typography>
                    </Link>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.logOutClick}>
                        <Icon>exit_to_app</Icon>
                    </IconButton>
                </Paper>
                <div className={classes.pageTitleContainer}>
                    {this.props.pageIcon  &&
                        <Avatar className={classes.avatarStyle}>
                            <Icon className={classes.pageIconStyle}>{this.props.pageIcon}</Icon>
                        </Avatar>
                    }
                    <Typography variant='h2' align='center' className={classes.pageTitle}>{title}</Typography>
                </div>
                <div className={classes.body}>
                    {children}
                </div>
            </div>
        )
    }

}

Layout.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    pageIcon: PropTypes.string
};

export default withStyles(styles)(Layout);
