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
    tabContainer: {
        backgroundColor: '#efefef',
        marginBottom: '3px'
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
};

const pages = [
    {
        label: 'Database',
        url: 'dblist'
    },
    {
        label: 'Users',
        url: 'users'
    }
];

class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0
        };

        this.onTabClick = this.onTabClick.bind(this);
    }

    logOutClick(){
        window.location.href = '/logout';
    }

    componentWillReceiveProps(nextProps){
       // console.log(nextProps);
    }

    onTabClick(index){
        this.setState({
            currentPage: index
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
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.logOutClick}>
                        <Icon>exit_to_app</Icon>
                    </IconButton>
                </Paper>
                <Paper square elevation={1} className={classes.tabContainer}>
                    <Tabs value={this.state.currentPage} style={{maxWidth: '750px', margin: '0 auto'}}>
                        {
                            pages.map((page, index) => {
                                return(
                                    <Tab key={index} onClick={(event) => this.onTabClick(index)} label={page.label}/>
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
