// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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
const db = getDatabase()
const auth = getAuth()


var name = document.getElementById("name")
var email = document.getElementById("email")
var password = document.getElementById("password")

window.signup = function(){
  if(name.value && email.value && password.value){

    var obj = {
      name: name.value,
      email: email.value,
      password: password.value
    }
    console.log(obj)
    
    createUserWithEmailAndPassword(auth, obj.email, obj.password)
    .then(function (res) {
      console.log(res.user)
      obj.id = res.user.uid;
      
      var reference = ref(db, `users/${obj.id}`)
      set(reference, obj)
      .then(function (dbRes) {
        console.log("Data sended to DB successfully", dbRes)
      })
      .catch(function (dbErr) {
        console.log("DB Error", dbErr)
      })
      
      successMsg.innerHTML += `<p class="fw-bold text-success fs-4 mt-2 mb-0 pb-0">Thanks ${obj.name}. You have successfully signed-up.<p/>`
      
    })
    .catch(function (err) {
      console.log(err)
    })

    Swal.fire({
      icon: 'success',
      title: 'Signed Up!',
      text: 'You have successfully signed up!',
  });

    window.location.assign('../../index.html')

  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please fill out all fields!',
  });
  }

}
  