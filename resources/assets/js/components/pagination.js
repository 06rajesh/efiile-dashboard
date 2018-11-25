/**
 * Created by Rajesh on 11/25/18.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
    paginationContainer: {
        marginTop: theme.spacing.unit * 3,
        textAlign: 'right'
    }
});

class Pagination extends Component{
    render(){
        let {classes, limit, offset, itemList, fetchAction} = this.props;

        return(
            <div className={classes.paginationContainer}>
                <Button size="small"
                        className={classes.button}
                        disabled={offset <= 0}
                        onClick={() => fetchAction(limit, offset - limit)}>
                    <Icon>keyboard_arrow_left</Icon> Previous
                </Button>
                <Button size="small"
                        className={classes.button}
                        disabled={itemList.length < limit}
                        onClick={() => fetchAction(limit, offset + limit)}>
                    Next <Icon>keyboard_arrow_right</Icon>
                </Button>
            </div>
        );
    }
}

Pagination.propTypes = {
    classes     : PropTypes.object.isRequired,
    itemList    : PropTypes.array.isRequired,
    limit       : PropTypes.number.isRequired,
    offset      : PropTypes.number.isRequired,
    fetchAction : PropTypes.func.isRequired
};

export default withStyles(styles)(Pagination);
