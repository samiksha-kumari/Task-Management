import React from "react";

import {Button} from 'reactstrap'

class Logout extends React.Component {
    state = {

    }

    
    handleSubmit = (e) => {
        e.preventDefault()
       debugger
            localStorage.removeItem('token')
        this.props.setCurrentUser(null)
        this.props.history.push('/user/login')
    }

    render(){
        return (
            <div className="container form-group">
 <Button className="btn btn-primary" type="submit" onClick={this.handleSubmit} value = "logout">Logout</Button>        </div>
        )
    }
    
} 



export default Logout;