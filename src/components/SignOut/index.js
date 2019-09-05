import React from 'react';

import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';

const signOut = (props) => {
    localStorage.clear();
    props.firebase.doSignOut();
    window.location.pathname = '/home';
};

const SignOutButton = ( props ) => (
  <button type="button" onClick={() => signOut(props)}>
    Sign Out
  </button>
);

export default withRouter(withFirebase(SignOutButton));
