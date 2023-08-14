(function () {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: 'AIzaSyBr-wdI52o-ZFYhAejLFkuHjSdNivCzemU',
    authDomain: 'courso-f1025.firebaseapp.com',
    databaseURL: 'https://courso-f1025-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'courso-f1025',
    storageBucket: 'courso-f1025.appspot.com',
    messagingSenderId: '391115610498',
    appId: '1:391115610498:web:bf06f109607e253bc9579b',
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // get elements
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const login = document.getElementById('login');
  const signup = document.getElementById('signup');
  const logout = document.getElementById('logout');
  const loggedInStatus = document.getElementById('loggedInStatus');
  const googlelogin = document.getElementById('googlelogin');

  //TODO: Add Google Sign in
  googlelogin.addEventListener('click', e => {
    console.log('google sign in clicked');
    const auth = firebase.auth();
    var provider = new firebase.auth.GoogleAuthProvider();
    const promise = auth.signInWithPopup(provider);
    promise
      .then(result => {
        const user = result.user.email;
        console.log(user, 'is logged in');
      })
      .catch(error => {
        console.log(error);
      });
    // TODO: Use firebase.auth.GoogleAuthProvider() to implement Google sign in
    // Hint: the user email address is in the results user object: result.user.email
  });

  // login
  login.addEventListener('click', e => {
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.catch(e => console.log(e.message));
  });

  // signup
  signup.addEventListener('click', e => {
    // TODO: check for real email
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
    promise.catch(e => console.log(e.message));
  });

  // logout
  logout.addEventListener('click', e => {
    firebase.auth().signOut();
  });

  // login state
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log(firebaseUser);
      loggedInStatus.innerText = `You are logged in using the following email: ${firebaseUser.email}`;
      logout.style.display = 'inline';
      login.style.display = 'none';
      signup.style.display = 'none';
      email.style.display = 'none';
      password.style.display = 'none';
      googlelogin.style.display = 'none';
    } else {
      console.log('User is not logged in');
      loggedInStatus.innerText = 'You are not yet logged in';
      login.style.display = 'inline';
      signup.style.display = 'inline';
      email.style.display = 'inline';
      googlelogin.style.display = 'inline';
      password.style.display = 'inline';
      logout.style.display = 'none';
    }
  });
})();
