import React from 'react'
import axios from 'axios'
import SelectBox from 'react-select'
import { Button, Form, Label, Input, Col } from 'reactstrap'


class TaskForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          name: '',
          userIds: [],
          isCompleted: false
        }
    }
    handleChange=(e) =>{
            this.setState({
                [e.target.id] : e.target.value
            })
        
    }


    componentDidMount = async () => {
        const a = this.props

        if(this.props.isEdit){
            const id = this.props.match.params.id
            const task = await axios.get(`http://localhost:3010/task/${id}`,{
                headers:{'x-auth':localStorage.getItem('token')}
            })

            if(task && task.data?._id){
                const b = (this.props.users||[]).filter(c=>task.data.userId===c._id).map(c=>({label:c.username,value:c._id}))

                this.setState({name:task.data.name,isCompleted:task.data.isCompleted,userIds:b})
            }
        }
        
    }
    
    handleClick = e => {
        e.preventDefault()

    }

  handleSubmit = async (e) =>{

        e.preventDefault()
        if(this.props.isEdit){
            const formData = {
                name: this.state.name,
                isCompleted:this.state.isCompleted,  
                userIds:(this.state.userIds||[]).map(c=>c.value)
            }
            console.log(formData)
           const response =  await axios.post(`http://localhost:3010/task/${this.props.match.params.id}`, formData,{
               headers:{ 'x-auth':localStorage.getItem('token')}
            })
            if(response && response.data){
                this.props.history.push('/tasklist')
            } 
        }else{
        const formData = {
            name: this.state.name,
            userIds:(this.state.userIds||[]).map(c=>c.value)
        }
        console.log(formData)
       const response =  await axios.post('http://localhost:3010/task', formData,{
           headers:{ 'x-auth':localStorage.getItem('token')}
        })
        if(response && response.data){
            this.props.addTask([...this.props.tasks,response.data])
            this.props.history.push('/tasklist')
        }}
    } 
  
  onChangeUserIds=(val)=>{
this.setState({userIds:val})
  }
  

    render(){
        return(
            <div>
                <Form onSubmit= {this.handleSubmit}>
                <Col md={6}>
                               <h2><Label htmlFor='task'>Task</Label></h2> 
                                <Input 
                                type='text'
                                id='name' 
                                name='name'
                                value={this.state.name}  
                                onChange={this.handleChange} 
                                placeholder='enter task'/>
                     </Col>
                     {this.props.currentUser && (this.props.currentUser.role?.name||'').toLowerCase()==='manager'?(
                         <SelectBox
                         options={(this.props.users||[]).map(c=>({label:c.username,value:c._id}))}
                         value={this.state.userIds}
                         isMulti
                         onChange={this.onChangeUserIds}
                         />
                     ):null}
                    
                    <Button className="btn btn-primary" type="submit" onClick={this.handleSubmit} value = "Add">{this.props.isEdit?'update':'add'}</Button>
                </Form>   
            </div>
        )
    }
}



export default TaskForm