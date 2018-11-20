/**
 * Created by Rajesh on 11/20/18.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Layout from '../layout';

import { withStyles } from '@material-ui/core/styles';
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

        let secondaryText = () => {
            return(
                <Typography variant="body1">
                    <Icon className={classes.listIcons}>get_app</Icon> {item.dbHost}{item.dbPort ? `:${item.dbPort}` : ''}
                    &emsp;
                    <Icon className={classes.listIcons}>check_circle</Icon> Enabled
                </Typography>
            )
        };

        return(
            <div className={classes.listContainer}>
                <ListItem >
                    <Avatar>
                        <Icon>dns</Icon>
                    </Avatar>
                    <ListItemText primary={item.title} secondary={secondaryText()} />
                    <ListItemSecondaryAction>
                        <IconButton aria-label="Comments" onClick={() => onItemClick(position)}>
                            <Icon>delete</Icon>
                        </IconButton>
                        <IconButton aria-label="Down" onClick={() => this.setState({open : !this.state.open})}>
                            <Icon>keyboard_arrow_down</Icon>
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




