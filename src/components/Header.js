import React from 'react'
import { Link } from 'react-router-dom'
import {withRouter} from 'react-router'


 function Header(){
    return(
        <header>
                
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div><a href="http://awakama.com/cafeland" className="navbar-brand">Awakama.com</a></div>
                        <ul className="navbar-nav">
                           <li className="nav-link">Home</li>
                           <li className="nav-link">InfoSaver</li>
                           <li className="nav-link"><Link to="/searchpage">Search</Link></li>                           
                        </ul>
                        <ul className="navbar-nav navbar-collapse justify-content-end">
                            <li className="nav-link">Login</li>
                            <li className="nav-link">LogOut</li>
                        </ul>
                    </nav>
                    
            </header>
    )
}
export default withRouter(Header)