import React, { Component } from 'react'
import AppLogo from '../images/logo.png';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// MUI
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
// Redux
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';


const styles = {
    form: {
        textAlign: 'center'
      },
      image: {
          margin: '15px auto 15px auto',
          height: 50
      },
      pageTitle: {
          margin: '10px auto 10px auto'
      },
      textField: {
          margin: '10px auto 10px auto'
      },
      button: {
          margin: '20px auto 10px auto',
          position: 'relative'
      },
      errorMsg: {
          color: "red",
          fontSize: '0.8rem'
      },
      progress: {
          position: 'absolute'
      }
};

class signup extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.ui.errors) {
            this.setState({ errors: nextProps.ui.errors })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirm_pass: this.state.confirmPassword,
            handle: this.state.handle
        }
        this.props.signupUser(newUserData, this.props.history);
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const { classes, ui: { loading } } = this.props;
        const { errors } = this.state;

        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppLogo} alt="Hanasu" className={classes.image}/>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Sign Up
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email" name="email" type="email" label="Email" className={classes.textField} 
                            value={this.state.email} onChange={this.handleChange} helperText={errors.email} error={errors.email ? true: false} fullWidth/>
                        <TextField id="password" name="password" type="password" label="Password" className={classes.textField} 
                            value={this.state.password} onChange={this.handleChange} helperText={errors.password} error={errors.password ? true: false} fullWidth/>
                        <TextField id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password" className={classes.textField} 
                            value={this.state.confirmPassword} onChange={this.handleChange} helperText={errors.confirmPassword} error={errors.confirmPassword ? true: false} fullWidth/>
                        <TextField id="handle" name="handle" type="text" label="Handle" className={classes.textField} 
                            value={this.state.handle} onChange={this.handleChange} helperText={errors.handle} error={errors.handle ? true: false} fullWidth/>
                        {errors.general && (
                            <Typography variant="body2" className={classes.errorMsg}>
                                {errors.general}
                            </Typography>
                        )}    
                        <Button type="submit" variant="contained" color="secondary" className={classes.button} disabled={loading}>Log In
                            {loading && <CircularProgress size={30} className={classes.progress} />}
                        </Button>
                        <br></br>
                        <small> Have an account? Log In <Link to="/login">here</Link>!</small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui
});

export default connect(mapStateToProps, { signupUser })(withStyles(styles)(signup));
