const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.database();


exports.helloWorld = functions.https.onRequest((request, response) => {
 

});

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
	// const ref = db.ref(`users/${user.uid}`);
	// ref.once("value").then(snapshot => {
	// 	console.log(snapshot);
	// 	return ref.set({
	// 		"username": snapshot.username,
	// 		"email": 	user.email,
	// 		"delete": 	true, 
	// 	});
	//   })
	// .catch(err => console.log(err));
});


exports.writeToFirestore = functions.firestore
	.document('some/doc')
	.onWrite((change, context) => {
	
});