import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
// Redux
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../redux/actions/userActions';
// MUI
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import Tooltip from '@material-ui/core/Tooltip';


const styles = (theme) => ({
    paper: {
        padding: 20
      },
    profile: {
    '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
        }
    },
    '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%',
    },
    '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
        verticalAlign: 'middle'
        },
        '& a': {
        color: theme.palette.primary.main
        }
    },
    '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
    },
    '& svg.button': {
        '&:hover': {
        cursor: 'pointer'
        }
    }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    }
})

class Profile extends Component {
    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    };

    handleEditPicture = () => {
        const fileInput = document.getElementById('imageUpload')
        fileInput.click();
    }
    
    handleLogout = () => {
        this.props.logoutUser();
    }

    render() {
        const { classes, user: { credentials: { handle, createdAt, imageUrl, bio, link, location }, loading, authenticated }} = this.props;

        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image"  />
                        <input type="file" id="imageUpload" onChange={this.handleImageChange} hidden="hidden"/>
                        <Tooltip title="Change your avatar" placement="top">
                            <IconButton onClick={this.handleEditPicture} className="button">
                                <EditIcon color="primary" />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <hr/>
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/users/${handle}`} color="secondary" variant="h5">
                            @{handle}
                        </MuiLink>
                    <hr/>
                    {bio && <Typography variant="body2">{bio}</Typography>}
                    <hr/>
                    {location && (
                        <p>
                            <LocationOn color="secondary"/><span>{location}</span>
                        </p>
                    )}
                    {link && (
                        <p>
                            <LinkIcon color="secondary"/>
                            <a href={link} target="_blank" rel="noopener noreferrer">
                                {' '}{link}
                            </a>
                        </p>
                    )}
                    {createdAt && (
                        <p>
                            <CalendarToday color="secondary"/>
                            <span> Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                        </p>
                    )}
                    </div>
                    <Tooltip title="Logout" placement="top">
                        <IconButton onClick={this.handleLogout} className="button">
                            <KeyboardReturn color="secondary" />
                        </IconButton>
                    </Tooltip>
                    <EditDetails></EditDetails>
                </div>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                    No profile found, please login.
                </Typography>
                <div className={classes.buttons}>
                    <Button variant="contained" color="primary" component={Link} to="/login">Login</Button>
                    <Button variant="contained" color="secondary" component={Link} to="/signup">Signup</Button>
                </div>
            </Paper>
        )) : (<CircularProgress />)

        return profileMarkup
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    logoutUser,
    uploadImage
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
