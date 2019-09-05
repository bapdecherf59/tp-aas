import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nom: '',
      prenom: '',
      email: '',
      password: '',
      typeCompte: 'client',
      error: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const {email, password} = this.state;
    const { history } = this.props;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        this.props.firebase.addUser(this.state);
          const fb = this.props.firebase;
          fb.getUsers().on('value', snapshot => {
              const users = fb.reformatage(snapshot);
              users.forEach(user => {
                  if (user.email === email) {
                      localStorage.setItem('user', JSON.stringify(user));
                  }
              })
          });
        history.push('/home');
      })
      .catch(error => this.setState({ error }));

    event.preventDefault();
  };

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      nom,
      prenom,
      email,
      password,
      typeCompte,
      error,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="nom"
          value={nom}
          onChange={this.handleChange}
          type="text"
          placeholder="Nom"
          required
        />
        <input
          name="prenom"
          value={prenom}
          onChange={this.handleChange}
          type="text"
          placeholder="Prénom"
          required
        />
        <input
          name="email"
          value={email}
          onChange={this.handleChange}
          type="text"
          placeholder="Email Address"
          required
        />
        <input
          name="password"
          value={password}
          onChange={this.handleChange}
          type="password"
          placeholder="Password"
          required
        />
        <select name="typeCompte" onChange={this.handleChange} defaultValue="client">
          <option value="client">Client</option>
          <option value="entreprise">Entreprise</option>
         </select>
        <button type="submit">
          Inscription
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Pas de compte ? <Link to={ROUTES.SIGN_UP}>Inscription</Link>
  </p>
);
const SignUpForm = withRouter(withFirebase(SignUpFormBase));
export default SignUpPage;
export { SignUpForm, SignUpLink };