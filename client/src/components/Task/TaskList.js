import React from 'react'
import axios from 'axios'
import moment from 'moment'
import SelectBox from 'react-select'
import {Input} from 'reactstrap'


class TaskList extends React.Component {
    state = {
        tasks: [],
        selectedUserIds:[],
        isData: false
    }


    onChangeUserIds = (val)=>{
        if(val && val.length)this.setState({selectedUserIds:val})
        else{this.setState({selectedUserIds:[]})}
    }

    componentDidMount = () => {
        axios.get('http://localhost:3010/task', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
           })
             .then(response => {
                const tasks = response.data
                console.log(tasks, 'task')
                this.setState({ tasks, isData: true })
                console.log(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    removeTask = async (task) => {
       const deletedTask = await axios.delete(`http://localhost:3010/task/${task._id}`, {
           headers: {
               'x-auth': localStorage.getItem('token')
           }
       })
       if(deletedTask && deletedTask.data){
           const tasks = [...this.state.tasks].filter(c => c._id !== task._id)
           this.setState({tasks})
       }
    }

    completeOrIncomplete = async (task) => {
        const res = await axios.post(`http://localhost:3010/task/${task._id}`,{...task,isCompleted:!task.isCompleted},{
            headers:{'x-auth':localStorage.getItem('token')}
        })

        if(res && res.data){
            const tasks = [...this.state.tasks].reduce((acc,val)=>{
                if(val._id===res.data._id){
                    return [...acc,res.data]
                        }else{
                            return[...acc,val]
                        }            },[])
            this.setState({tasks})
        }
        
    }

    showTask = (task) => {
        this.props.history.push(`/task/${task._id}`)

    }


    render() {
        return(
             <div>
                <h2>Tasks</h2>
                <h4>Filter by Users</h4>
                <SelectBox
                options={(this.props.users||[]).map(c=>({label:c.username,value:c._id}))}
                value={this.state.userIds}
                isMulti
                onChange={this.onChangeUserIds}
                />
                {this.state.isData ? (
                <React.Fragment>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Task</th>
                                <th>User Name</th>
                                <th>CreatedAt</th>
                                <th>Action</th>
                               

                            </tr>
                        </thead>
                        <tbody>
                            {this.state.tasks.filter(c=>this.state.selectedUserIds.length ? this.state.selectedUserIds.map(c=>c.value).includes(c.userId._id):true).map((task, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{task.name}</td>
                                        <td>{task.userId.username}</td>
                                        <td>{moment(task.createdAt).format('DD-MM-YYYY')}</td>

                                        <td><button className="btn btn-primary" background-color = "green" onClick={() => { this.showTask(task) }}>Show</button></td>

                                        <td><button className="btn btn-success" background-color = "green" onClick={() => { this.completeOrIncomplete(task) }}>{task.isCompleted ? 'Incomplete':'Complete'}</button></td>

                                        <td><button className="btn btn-danger" background-color = "red" onClick={() => { this.removeTask(task) }}>Remove</button></td>
                                        
                                        
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </React.Fragment>) : (<Input />)}
            </div>
        )
    }
}

export default TaskList