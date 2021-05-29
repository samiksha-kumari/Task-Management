import React from 'react'
import axios from 'axios'


class Login extends React.Component{
          constructor(props){
              super(props)
              this.state={
                  email:'',
                  password:''
              }
          }

          handleSubmit=(e)=>{
            e.preventDefault()
            const loginData={
                email:this.state.email,
                password:this.state.password
            }
            axios.post('http://localhost:3010/user/login', loginData)
                 .then(response => {
                     console.log(response, 'data')
                     if(response && response.data && response.data.token){
                        this.props.setCurrentUser(response.data)
                        localStorage.setItem('token',response.data.token)
                         this.setState({
                             email: '',
                             password: ''
                         }, () => {
                             this.props.history.push('/tasklist')
                         })
                     }else {
                         window.alert('validation error')
                     }
                 })
                 .catch(err => {
                     window.alert('something went wrong', err)
                 })
          }

          handleChange =(e)=>{
           this.setState({
               [e.target.name]:e.target.value
           })
          }

    render(){
        return(
            <div className="fluid-container" style={{height:"600px", width: "100%"}}>
            <div className="row pt-5" style={{height: "400px", width:"100%"}}>
                <div className="col-sm-4"></div>
                <div className="col-sm-4" style={{backgroundColor: "red",backgroundImage:`linear-gradient(#add8e6,#808080,#90EE90)`}}>
                    <div className="container">
                        <h1 className="text-center pt-1">LOGIN</h1><br/>
                        <form onSubmit={this.handleSubmit}>
                            <div className="container form-group">
                                <input type="text" name="email" placeholder="Enter Email" className="form-control" onChange={this.handleChange} value={this.state.email} />
                            </div>
                            <div className="container form-group">
                                <input type="password" name="password" placeholder="Enter Password" className="form-control" value={this.state.password} onChange={this.handleChange}/>
                            </div>
                            <div className="container form-group">
                                <input type="checkbox"/> Remember me <br/><br/>
                                <input type="submit" value="Login" className="form-control btn btn-primary"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div> 
        </div>
        )
    }
}
export default Login