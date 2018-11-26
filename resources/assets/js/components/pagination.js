/**
 * Created by Rajesh on 11/25/18.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    gridStyle: {
        marginTop: theme.spacing.unit * 0.5
    }
});

class Pagination extends Component{
    render(){
        let {classes, limit, offset, itemList, fetchAction} = this.props;

        return(
            <Grid container spacing={24} className={classes.gridStyle}>
                <Grid item xs={6} container direction="row" justify="flex-start" alignItems="center">
                    <Typography gutterBottom>
                        Showing from {offset + 1} - {offset + itemList.length} results
                    </Typography>
                </Grid>
                <Grid item xs={6} container direction="row" justify="flex-end" alignItems="center">
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
                </Grid>
            </Grid>
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
