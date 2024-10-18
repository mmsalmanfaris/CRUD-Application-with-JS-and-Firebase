import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, push, onValue, remove, set } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

const dbSetting = {
    databaseURL: "https://crud-js-firebase-9a04b-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

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
        name: userName.value.trim(),
        age: userage.value.trim(),
        city: usercity.value.trim()
    };

    push(userListInDb, newUser);
    clearInput();
})

function clearInput(){
    userName.value = "";
    userage.value = "";
    usercity.value = "";
}

onValue(userListInDb, function (data){

    tblBody.innerHTML = "";

    if(data.exists()){
        let usersArray = Object.entries(data.val());
        console.log(usersArray);
        for(let i = 0; i < usersArray.length; i++){
            let currentUser = usersArray[i];
            let userId = currentUser[0];
            let userData = currentUser[1];

            tblBody.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${userData.name}</td>
                <td>${userData.age}</td>
                <td>${userData.city}</td>
                <td>
                    <button class="btn btn-primary me-2"><i class="bi bi-pencil-square" data-id=${userId}></i></button>
                    <button class="btn btn-danger"><i class="bi bi-trash3" data-id=${userId}></i></button>
                </td>
            </tr>
            `;
        }
    }
    else{
        tblBody.innerHTML = "<tr><td colspan='5'>Data Not Found!!</td></tr>";
    }
})