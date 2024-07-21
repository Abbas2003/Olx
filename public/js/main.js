// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import {
  getDatabase,
  ref,
  onValue
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

var card = document.getElementById("card")

var array = [];

function getData(){
  const reference = ref(db, `product`)
  onValue(reference, function(item){
    array = Object.values(item.val())
    console.log(array)
    createCard()
  })
}
getData()


function createCard(){

  for(let i=0; i<array.length; i++){
    var obj = array[i]
    card.innerHTML += `<div class="col-sm-12 col-md-4 col-lg-4">
                        <div class="card product-card mt-2" onclick="getId('${obj.id}')">
                          <img src="${obj.imgURL}" class="card-img-top product-image" alt="Product Image" id="productImg">
                          <div class="card-body">
                            <p class="product-price fw-bold" id="price">$ ${obj.price}</p>
                            <h5 class="card-title mb-3" id="productName">${obj.productName}</h5>
                            <p class="card-text" id="address">${obj.location}</p>
                            <a href="../details/detail.html" class="btn btn-primary">View Details</a>
                          </div>
                        </div>
                      </div>`
  }
}

window.getId = function (id){
  localStorage.setItem('p-Id', id)
}