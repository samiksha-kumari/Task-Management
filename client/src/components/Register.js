import React from 'react';  
import SelectBox from 'react-select'
import axios from 'axios'

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            role: null,
            allRoles:[],
            errorMessage:''
        }
    } 
    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async componentDidMount(){
        const res = await fetch('http://localhost:3010/role') 
        const data = await res.json()
        this.setState({allRoles:(data||[]).map(c=>({label:c.name,value:c._id}))})
    }

    handleSubmit = (e) => {
        e.preventDefault()

        if(!(this.state.role||{}).value) this.setState({errorMessage:'Role is required'})

        const registerData = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            role: (this.state.role||{}).value
        }
        console.log(registerData)
        axios.post('http://localhost:3010/user/register', registerData)
            .then(response => {
                if(response.data._id){
                    // console.log(response.data._id)
                    this.setState({
                        username: '',
                        email: '',
                        password: '',
                        role: ''
                    }, () => {
                        this.props.history.push('/user/login')
                    })
                }else {
                    window.alert('validation error, check your fields')
                }
            })
            .catch(err => {
                window.alert('something went wrong')
            })
    }
    onRoleChange=(val)=>{
        this.setState({role:val,errorMessage:val?'':this.state.errorMessage})
    }

    render(){
        return(
            <div className="fluid-container" style={{height:"600px", width: "100%"}}>
            <div className="row pt-5" style={{height: "400px", width:"100%"}}>
                <div className="col-sm-4"></div>
                <div className="col-sm-4" style={{backgroundColor: "red",backgroundImage:`linear-gradient(#add8e6,#808080,#90EE90)`}}>
                    <div className="container">
                        {/* <img src={images} alt="img" height="200px" width="200px" className="mx-auto d-block rounded-circle"></img> */}
                        <h1 className="text-center pt-1">REGISTER</h1><br/>
                        <form onSubmit={this.handleSubmit}>
                            <div className="container form-group">
                                <input type="text" name="username" placeholder="Enter Username" className="form-control" onChange={this.handleChange} value={this.state.username} />
                            </div>
                            <div className="container form-group">
                                <input type="text" name="email" placeholder="Enter Email" className="form-control" onChange={this.handleChange} value={this.state.email} />
                            </div>
                            <div className="container form-group">
                                <input type="password" name="password" placeholder="Enter Password" className="form-control" value={this.state.password} onChange={this.handleChange}/>
                            </div>
                            <div className="container form-group">
                                <SelectBox options={this.state.allRoles} value={this.state.role} onChange={this.onRoleChange}/>
                            </div>
                            <div className="container form-group">
                                <input type="submit" value="Register" className="form-control btn btn-primary"/>
                            </div>
                            <div className="container form-group">
                                <span style={{color:'red'}}>{this.state.errorMessage}</span>
                                                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-sm-4"></div>
            </div>
        </div>
        )
    }
}

export default Register