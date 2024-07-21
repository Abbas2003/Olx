// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaYW_zC_04rR6E_AmfQIMDqCrl36Dc0Og",
  authDomain: "olx-101.firebaseapp.com",
  databaseURL: "https://olx-101-default-rtdb.firebaseio.com",
  projectId: "olx-101",
  storageBucket: "olx-101.appspot.com",
  messagingSenderId: "706985243495",
  appId: "1:706985243495:web:2c2ddaf46bc1ebcc8075c2",
  measurementId: "G-5X6X7KJX5B"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();
const auth = getAuth()


var email = document.getElementById("email")
var password = document.getElementById("password")
var thanksMsg = document.getElementById("thanksMsg")

window.login = function(){
  if(!email.value && !password.value){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please fill out all the fields',
  });  
} else {

  var obj = {
    email: email.value,
    password: password.value
  }
  console.log(obj)

  signInWithEmailAndPassword(auth, obj.email, obj.password)
    .then(function (res) {
      console.log(res)
      var id = res.user.uid;
      var reference = ref(db, `users/${id}`)
      onValue(reference, function (data) {
        var obj = data.val();
        console.log(obj);
        thanksMsg.innerHTML += `<p class="fw-bold text-success fs-4 mt-2 mb-0 pb-0 text-center">You are successfully login.<p/>`
        Swal.fire({
          icon: 'success',
          title: 'Loged In!',
          text: 'You have successfully log in!',
      })
      .then(function(){
        window.location.assign('../pages/main/main.html')
      })
      })
    })
    .catch(function (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid email or password',
    });
    })

    
  }
}

