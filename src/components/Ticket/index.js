import React from 'react';

import { AuthUserContext } from '../Session';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import { Link } from 'react-router-dom';

class TicketPage extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = { tickets: [] };
	  }

	componentDidMount() {
		const fb = this.props.firebase;
		fb.getTickets().on('value', snapshot => {
			const tickets = fb.reformatage(snapshot);
			this.setState({
				tickets
			});
		});
	}

	render() {
		const { tickets } = this.state;
		const result = Object.values(tickets);
		const { typeCompte } = JSON.parse(localStorage.getItem('user'));

		return (
			<div>
				{
					(result.length)
					? result.map((item, elt) => (
							<div key={item.id}>
								<ul>
									<li>Statut : { tickets[elt].statut } </li>
									<li>Client : { tickets[elt].username } </li>
									<li>Titre : { tickets[elt].titre } </li>
									<li>Description : { tickets[elt].description } </li>
									{  (tickets[elt].comments) ?
                                        (<li><ul>
                                            { tickets[elt].comments.map(comment =>
                                                <div>
                                                    {console.log(comment)}
                                                    <li>Email entreprise : { comment.author } </li>
                                                    <li>Commentaire : { comment.comment } </li>
                                                </div>
                                            )
                                            }
                                        </ul></li>)
                                        : (<p>Pas de commentaire</p>) }
									{ (typeCompte === "entreprise") && (<li><Link to={ `/ticket/${tickets[elt].id}` }><button>Répondre</button></Link></li>) }
								</ul>
								<hr/>
							</div>
						))
					: <p>Pas de ticket.</p>
				}
			</div>
		)
	}
}

export default withFirebase(TicketPage);