import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthService from '../services/auth.service'

class AuthenticatedRoute extends Component{
    render(){
        console.log("isUserLogIn-AuRouter: "+ AuthService.isUserLogIn())
        if(AuthService.isUserLogIn()){
            return <Route {...this.props}/>
        }else{
            return <Redirect to="/login"/>
        }
      
    }
}

export default AuthenticatedRoute

