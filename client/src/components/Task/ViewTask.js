import React from 'react'
import axios from 'axios'


class ViewTask extends React.Component {
    state = {
        name: ''
    }

    componentDidMount = () => {
        axios.get(`http://localhost:3010/task/${this.props.match.params.id}`, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                if (response.data._id) {
                    this.setState({ name: response.data.name})
                }
            })
    }

    render() {

        return (

        <div>
        <h2>show task</h2><hr />
        <h3>{this.state.name}</h3>
    </div>
        )

    }
}

export default ViewTask