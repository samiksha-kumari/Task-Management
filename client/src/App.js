import React from 'react'
import {BrowserRouter,Route,Switch} from "react-router-dom"
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Logout from './components/Logout'
import TaskForm from './components/Task/TaskForm'
import TaskList from './components/Task/TaskList'
import './App.css';
import {Navbar , Nav, Button } from 'react-bootstrap'
import axios from 'axios'

function App(props) {
  const [users,setUsers] = React.useState([])
  const [currentUser,setCurrentUser] = React.useState(null)
  const [tasks,addTask] = React.useState([])


  React.useEffect(async()=>{
    if(localStorage.getItem('token') && !currentUser ){
      const res = await axios.get('http://localhost:3010/user/by-token',{
        headers:{'x-auth':localStorage.getItem('token')}
      })
  setCurrentUser(res.data)
  const ress = await axios.get('http://localhost:3010/task',{
    headers:{'x-auth':localStorage.getItem('token')}
  })
  addTask(ress.data)
  const resss = await fetch('http://localhost:3010/user')
  const users = await resss.json()

setUsers(users)
  }
    
},[])

React.useEffect(async()=>{
  if(currentUser && currentUser._id){
    const res = await axios.get('http://localhost:3010/task',{
      headers:{'x-auth':localStorage.getItem('token')}
    })
addTask(res.data)
  }else{
    addTask([])
  }
 

},[currentUser])

  return (
      <BrowserRouter>
      <div>
       {/* {  */}
        {/* //  Object.keys(users).length == 0 ? ( */}
          <div>
          <Navbar bg="dark" variant="dark" >
          <Navbar.Brand href={"/"} style={{color:'white'}}>Task Management</Navbar.Brand>
          <Nav className="ml-auto">
          <Nav.Link href={"/"} style={{color:'white'}}>Home</Nav.Link>
          {!currentUser ? <Nav.Link href={"/user/register"} style={{color:'white'}}>Register</Nav.Link>:null}
         {!currentUser? <Nav.Link href={"/user/login"} style={{color:'white'}}>Login</Nav.Link>:null}

         {currentUser && currentUser._id ? <Nav.Link href={"/tasklist"} style={{color:'white'}}>Task List</Nav.Link>:null}


         
         {currentUser && currentUser._id ? <Nav.Link href={"/task"} style={{color:'white'}}>Task</Nav.Link>:null}

          {currentUser && currentUser._id ? <Nav.Item  style={{color:'white', marginLeft: '150vh'}}><Button onClick={()=>{localStorage.removeItem('token')
        setCurrentUser(null)
       window.location.replace('http://localhost:3000/user/login')}}>Logout</Button></Nav.Item>:null}
          </Nav>

          </Navbar>
          </div>
          {/* ) : ( */}
            <div>
            {/* <Navbar bg="dark" variant="dark" >
          <Navbar.Brand href={"/"} style={{color:'white'}}>Task Management</Navbar.Brand>
          <Nav className="ml-auto">
          <Nav.Link href={"/"} style={{color:'white'}}>Home</Nav.Link>
          <Nav.Link href={"/task"} style={{color:'white'}}>Task</Nav.Link>
          </Nav>
          </Navbar> */}
          </div>
          {/* )  */}
          
       
    {/* } */}
             <Switch>
                    <Route path="/" component={Home} exact={true}/>
                    <Route path="/user/register" component={Register} />
                    <Route path="/user/login" render={(props)=><Login {...props} setCurrentUser={setCurrentUser}/>} />
                    <Route path="/tasklist" render={(props)=><TaskList {...props} addTask={addTask} tasks={tasks} users={users} currentUser={currentUser}/>} />
                    <Route path="/task" exact={true} render={(props)=><TaskForm {...props} addTask={addTask} tasks={tasks} users={users} currentUser={currentUser}/>} />

                    <Route path="/task/:id" render={(props)=><TaskForm {...props} isEdit={true} addTask={addTask} tasks={tasks} users={users} currentUser={currentUser}/>} />
                   
                    <Route path="/user/logout" render={(props)=><Logout {...props} currentUser={currentUser}/>}/>
            </Switch>
            </div>
        </BrowserRouter>
  )
}

export default App;

