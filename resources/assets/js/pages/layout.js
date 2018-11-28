/**
 * Created by Rajesh on 11/13/18.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { Link, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import {CurrentUser} from '../reducers/currentUser';

const styles = theme => ({
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
    tabContainer: {
        backgroundColor: '#efefef',
        marginBottom: '3px'
    },
    profileMenu: {
        position: 'absolute',
        width: '200px',
        top: 50,
        right: theme.spacing.unit * 3,
        padding: theme.spacing.unit
    },
    profileMenuContent: {
        padding: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        borderRadius: theme.shape.borderRadius,
        background: '#f5f5f5'
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
        padding: '50px 0px',
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
});

const pages = [
    {
        label: 'Database',
        url: 'dblist'
    },
    {
        label: 'Users',
        url: 'users'
    },
    {
        label: 'Api Key',
        url: 'api-key'
    }
];

class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 'dblist',
            openMenu: false
        };

        this.onTabClick = this.onTabClick.bind(this);
    }

    logOutClick(){
        CurrentUser.logOut();
        window.location.href = '/logout';
    }

    componentDidMount(){
        CurrentUser.loggedIn = true;
        CurrentUser.fetchUser();

        let selectedPage = this.props.location.pathname == "/" ? 'dblist' : this.props.location.pathname.slice(1);
        this.setState({
            currentPage: selectedPage
        });
    }

    onTabClick(index){
        this.setState({
            currentPage: pages[index].url
        }, () => {
            this.props.history.push(pages[index].url)
        });
    }

    render(){

        const {classes, children, title} = this.props;

        return(
            <div>
                <Paper square component="header" elevation={2} className={classes.root}>
                    <Link to='/' className={classes.titleStyle}>
                        <Typography variant="h4" className={classes.titleStyle} align="center">
                            Efile Admin Dashboard
                        </Typography>
                    </Link>

                    <ClickAwayListener onClickAway={() => this.setState({openMenu: false})}>
                        <div>
                            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={() => this.setState({openMenu: !this.state.openMenu})}>
                                <Icon>person</Icon>
                            </IconButton>
                            {this.state.openMenu ? (
                                    <Paper className={classes.profileMenu}>
                                        <div className={classes.profileMenuContent}>
                                            <Avatar className={classes.avatarStyle}>
                                                <Icon>person</Icon>
                                            </Avatar>
                                            <Typography variant='h6' align="center">
                                                {CurrentUser.user.username}
                                            </Typography>
                                            <Typography variant='caption' align="center">
                                                {CurrentUser.user.email}
                                            </Typography>
                                        </div>
                                        <Button size="small" variant="contained" color="secondary" fullWidth onClick={this.logOutClick}>
                                            <Icon>exit_to_app</Icon> Log Out
                                        </Button>
                                    </Paper>
                                ) : null}
                        </div>
                    </ClickAwayListener>
                </Paper>
                <Paper square elevation={1} className={classes.tabContainer}>
                    <Tabs value={this.state.currentPage} style={{maxWidth: '750px', margin: '0 auto'}}>
                        {
                            pages.map((page, index) => {
                                return(
                                    <Tab key={index} value={page.url} onClick={(event) => this.onTabClick(index)} label={page.label}/>
                                );
                            })
                        }
                    </Tabs>
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

let routerLayout = withRouter(Layout);

export default withStyles(styles)(routerLayout);
