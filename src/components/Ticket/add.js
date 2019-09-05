import React from 'react';

import { AuthUserContext } from '../Session';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';

class TicketAddPage extends React.Component {

	constructor(props) {
	    super(props);

	    this.state = {
	    	listeClient: [],
			formData: {
		    	statut: "new",
				titre: "Titre",
				description: "Description",
				username: "",
				comments: []
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
		this.setState({ formData: {...formData, [name]: value }});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.firebase.addTicket(this.state.formData);
	}

	render() {
		const { statut, listeClient, titre, description } = this.state;
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<label>Statut : </label>
			        <select name="statut" onChange={this.handleChange} defaultValue={statut}>
			          <option value="new">Nouveau</option>
			          <option value="open">Ouvert</option>
			          <option value="closed">Fermé</option>
			         </select><br/>
		        	<label>Client : </label>
		        	{
		        		(listeClient.length > 0) ?
		        			<select name="username" onChange={this.handleChange} defaultValue="client">
				        		{
				        			listeClient.map(client =>
				          				<option value={`${client.nom} ${client.prenom}`} key={client.id}>{client.nom} {client.prenom}</option>
				        			)
				        		}
		         			</select>
			        	: <p>Pas de client.</p>
		        	}<br/>
					<label>Titre : </label><input type="text" name="titre" onChange={this.handleChange} required value={this.state.prenomClient} /><br/>
					<label>Description : </label><input type="text" name="description" onChange={this.handleChange} required value={this.state.prenomClient} /><br/>

					<input type="submit" value="Ajouter"/>
				</form>
			</div>
		)
	}
}

export default withFirebase(TicketAddPage);