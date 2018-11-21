/**
 * Created by Rajesh on 11/20/18.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';


import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Collapse from '@material-ui/core/Collapse';

const styles = {
    listIcons: {
        fontSize: '1.1em',
        position: 'relative',
        top: '3px'
    },
    listContainer: {
        borderBottom: '1px solid #f1f1f1'
    },
    enabledClass: {
        color: green[600]
    },
    disabledClass: {
        color: 'rgba(0,0,0,0.6)'
    }
};

class DbItem extends Component {

    constructor(props){
        super(props);

        this.state = {
            open: false
        };
    }

    render(){

        let {item, classes, onItemClick, position} = this.props;

        let enabledProp = (item) => {
            let typeClass = item.enable ? classes.enabledClass : classes.disabledClass;
            let iconString = item.enable ? 'check_circle_outline' : 'highlight_off';
            return(
                <Typography variant="body1" color="inherit" className={typeClass}>
                    <Icon className={classes.listIcons}>{iconString}</Icon> {item.enable ? 'Enabled' : 'Disabled' }
                </Typography>
            );
        };

        let hostText = item.dbHost + ":" + (item.dbPort ? item.dbPort : '');

        return(
            <div className={classes.listContainer}>
                <ListItem >
                    <Avatar>
                        <Icon>dns</Icon>
                    </Avatar>
                    <ListItemText primary={item.title} secondary={hostText}/>
                    <ListItemText secondary={enabledProp(item)}/>
                    <ListItemSecondaryAction>
                        <IconButton aria-label="Comments" onClick={() => onItemClick(position)}>
                            <Icon>delete</Icon>
                        </IconButton>
                        <IconButton aria-label="Down" onClick={() => this.setState({open : !this.state.open})}>
                            <Icon>{this.state.open ? 'keyboard_arrow_up':'keyboard_arrow_down'}</Icon>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem>
                            <ListItemText inset secondary={`name: ${item.dbName}`} />
                            <ListItemText inset secondary={`user: ${item.dbUser}`} />
                            <ListItemText inset secondary={`password : ${item.dbPassword}`} />
                        </ListItem>
                    </List>
                </Collapse>
            </div>
        );
    }
};

DbItem.propTypes = {
    item: PropTypes.object,
    position: PropTypes.number,
    classes : PropTypes.object.isRequired,
    onItemClick: PropTypes.func
};

export default withStyles(styles)(DbItem);




