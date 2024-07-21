// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import {
  getDatabase,
  ref,
  onValue,
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
var desc = document.getElementById("desc")
var location = document.getElementById("location")
const id = localStorage.getItem('p-Id')
var obj = {};

function displayProduct(){
    console.log("Product Id: "+id)
    var reference = ref(db, `product/${id}`)
    onValue(reference, function(data){
        obj = data.val()
        console.log(obj)

        productName.innerHTML = obj.productName
        price.innerHTML = obj.price + " $"
        imgURL.src = obj.imgURL
        desc.innerHTML = obj.desc
        location.innerHTML = obj.location
    })
}

displayProduct()