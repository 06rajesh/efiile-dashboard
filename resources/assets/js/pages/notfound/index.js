/**
 * Created by talha on 11/13/18.
 */

import React, {Component} from 'react';
import Layout from '../layout';
import Typography from '@material-ui/core/Typography';

class NotFound extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <Layout title="Page Not Found"/>
        )
    }

}

export default NotFound;