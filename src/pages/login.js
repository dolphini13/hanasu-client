import React, { Component } from 'react'
import PropTypes from 'prop-types';
import AppLogo from '../images/logo.png';
import { Link } from 'react-router-dom';
// MUI
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
// Redux
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';


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

class login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
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
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history);
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
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email" name="email" type="email" label="Email" className={classes.textField} 
                            value={this.state.email} onChange={this.handleChange} helperText={errors.email} error={errors.email ? true: false} fullWidth/>
                        <TextField id="password" name="password" type="password" label="Password" className={classes.textField} 
                            value={this.state.password} onChange={this.handleChange} helperText={errors.password} error={errors.password ? true: false} fullWidth/>
                        {errors.general && (
                            <Typography variant="body2" className={classes.errorMsg}>
                                {errors.general}
                            </Typography>
                        )}    
                        <Button type="submit" variant="contained" color="secondary" className={classes.button} disabled={loading}>Log In
                            {loading && <CircularProgress size={30} className={classes.progress} />}
                        </Button>
                        <br></br>
                        <small> Don't have an account? Sign up <Link to="/signup">here</Link>!</small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui
});

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));
