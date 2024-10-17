import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, push, onValue, remove, set } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

const dbSetting = {
    dataBaseUrl: "https://crud-js-firebase-9a04b-default-rtdb.asia-southeast1.firebasedatabase.app/",
}

const app = initializeApp(dbSetting);
const database = getDatabase(app);
const userListInDb = ref(database, "users");

const userId = document.querySelector("#id");
const userName = document.querySelector("#name");
const userage = document.querySelector("#age");
const usercity = document.querySelector("#city");
const frm = document.querySelector("#frm");
const tblBody = document.querySelector("#tblBody");

frm.addEventListener("submit", event => {
    event.preventDefault();

    if(userId.value){

        return;
    }

    if(!userName.value.trim() || !userage.value.trim() || !usercity.value.trim()){
        window.alert("Please fill the details");
        return;
    }


    const newUser = {
        name: userName.trim(),
        age: userage.trim(),
        city: usercity.trim()
    };

    push(userListInDb, newUser);

})