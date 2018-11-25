/**
 * Created by Rajesh on 11/21/18.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({
    avatarStyle: {
        margin: '20px auto 5px',
        width: '70px',
        height: '70px'
    },
    avatarIconStyle: {
        fontSize: '60px'
    },
    addNewCardStyle: {
        minHeight: '243px'
    }
});

class UserItem extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        let {classes, user, type} = this.props;

        let userCard =  () => (
            <Grid item xs={4}>
                <Card>
                    <Avatar className={classes.avatarStyle} sizes="large">
                        <Icon className={classes.avatarIconStyle}>person</Icon>
                    </Avatar>
                    <CardContent>
                        <Typography variant="h5" component="h2" align="center">
                            {user.username}
                        </Typography>
                        <Typography variant="caption" align="center">
                            {user.email}
                        </Typography>
                        {/*<Typography variant="subtitle2" align="center">*/}
                            {/*Level: {user.level}*/}
                        {/*</Typography>*/}
                    </CardContent>
                    <CardActions>
                        <Button size="small">Delete</Button>
                    </CardActions>
                </Card>
            </Grid>
        );

        let addNewCard = () => (
            <Grid item xs={4}>
                <Card>
                    <CardActionArea className={classes.addNewCardStyle} onClick={() => this.props.onClick()}>
                        <Avatar className={classes.avatarStyle} sizes="large">
                            <Icon className={classes.avatarIconStyle}>add</Icon>
                        </Avatar>
                        <CardContent>
                            <Typography variant="h5" component="h2" align="center">
                                Add New
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        );

        if(type === 'AddNew')
            return addNewCard();
        else
            return userCard()
    }
}

UserItem.propTypes = {
    classes : PropTypes.object.isRequired,
    user: PropTypes.object,
    type: PropTypes.oneOf(['User', 'AddNew']),
    onClick:PropTypes.func,
    position: PropTypes.number
};

UserItem.defaultProps = {
    type: 'User'
};


export default withStyles(styles)(UserItem);
