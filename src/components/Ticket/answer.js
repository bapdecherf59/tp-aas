import React from 'react';

import { AuthUserContext } from '../Session';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';

class TicketAnswerPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            listeClient: [],
            formData: {
                comment: "",
                author: JSON.parse(localStorage.getItem('user')).email,
                idTicket: props.match.params.id,
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const fb = this.props.firebase;
        const { listeClient } = this.state;
        fb.getUsers().on('value', snapshot => {
            const users = fb.reformatage(snapshot);
            users.forEach(user => {
                if (user.typeCompte === "client") {
                    listeClient.push(user);
                }
                this.setState(listeClient);
            });
        });
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { formData } = this.state;
        this.setState({formData: {...formData, [name]: value}});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.firebase.setTicket(this.state.formData);
    }

    render() {
        const { comment } = this.state.formData;
        return (this.props.match.params.id !== 'add') && (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Commentaire : </label>
                    <textarea name="comment" onChange={this.handleChange} required value={comment} /><br/>
                    <input type="submit" value="Lâche un com' le bro'"/>
                </form>
            </div>
        )
    }
}

export default withFirebase(TicketAnswerPage);