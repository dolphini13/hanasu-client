import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostPost from './PostPost';
// import material ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Notifications from '@material-ui/icons/Notifications';
import Tooltip from '@material-ui/core/Tooltip';

export class Navbar extends Component {
    render() {
        const { authenticated } = this.props
        return (
            <div>
                <AppBar>
                    <Toolbar className="nav-container">
                        { authenticated ? (
                            <Fragment>
                                <IconButton aria-label="delete">
                                    <Icon className="fa fa-home fa-lg" color="secondary" component={Link} to="/"/>
                                </IconButton>
                                <Tooltip title="Notifications" placement="top">
                                    <IconButton className="button">
                                        <Notifications color="secondary" />
                                    </IconButton>
                                </Tooltip>
                                <PostPost />
                            </Fragment>
                        ) : (
                            <Fragment>
                                <IconButton aria-label="delete">
                                    <Icon className="fa fa-home fa-lg" color="secondary" component={Link} to="/"/>
                                </IconButton>
                                <Button color="inherit" component={Link} to="/login">Login</Button>
                                <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
                            </Fragment>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
})

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
};


export default connect(mapStateToProps)(Navbar);
