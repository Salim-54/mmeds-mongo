const admin = require('firebase-admin');



export function signup(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    admin.auth().createUser({
            email: email,
            password: password
        })
        .then(userRecord => {
            // Save the user to your MongoDB database here
            // collection.insertOne(userRecord, function(err, result) {
            //     console.log("Inserted new user into the collection");
            // });
            res.send({ message: 'Successfully created new user!', data: userRecord });
        })
        .catch(error => {
            res.send({ error: error.message });
        });
};

export function signIn(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    admin.auth().signInWithEmailAndPassword(email, password)
        .then(userRecord => {
            res.send({ message: 'Successfully signed in!' })
        })
};