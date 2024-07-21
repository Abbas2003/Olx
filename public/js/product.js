// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import {
  getDatabase,
  ref,
  push,
  set,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
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

var productName = document.getElementById("productName")
var price = document.getElementById("price")
var imgURL = document.getElementById("imgURL")
var desc = document.getElementById("floatingTextarea2")
var location = document.getElementById("location")


window.post = function(){
    console.log(productName.value, price.value, imgURL.value, desc.value, location.value)
    if(!productName.value || !price.value || !imgURL.value || !floatingTextarea2.value || !location.value){
        
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Kindly fill out all fields!',
        });

    } else {

        var obj = {
            productName: productName.value,
            price: price.value,
            imgURL: imgURL.value,
            desc: floatingTextarea2.value,
            location: location.value
        }
        console.log(obj)

        obj.id = push(ref(db, 'product')).key
        var reference = ref(db, `product/${obj.id}`)
        set(reference, obj)
        .then(function(){
            console.log('Data sended successfully')
        })
        .catch(function(e){
            alert(e.message)
        })

        productName.value = ""
        price.value = ""
        imgURL.value = ""
        floatingTextarea2.value = ""
        location.value = ""

        Swal.fire({
            icon: 'success',
            title: 'Product added!',
            text: 'Your product has successfully added!',
        });
      
    }
}

