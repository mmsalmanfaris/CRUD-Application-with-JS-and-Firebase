import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, push, onValue, remove, set } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

const dbSetting = {
    databaseURL: "https://crud-js-firebase-9a04b-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(dbSetting); /*Firebase Database Connection*/
const database = getDatabase(app);
const userListInDb = ref(database, "users");

const userId = document.querySelector("#Id");    /*Assign User Details form ID*/
const userName = document.querySelector("#name");
const userAge = document.querySelector("#age");
const userCity = document.querySelector("#city"); 
const frm = document.querySelector("#frm");
const tblBody = document.querySelector("#tblBody");

frm.addEventListener("submit", event => {
    event.preventDefault();


    if(!userName.value.trim() || !userAge.value.trim() || !userCity.value.trim()){ /*Check User Input Details*/
        window.alert("Please fill in all details");
        return;
    }


    if(userId.value) {           /*Update User Details*/
        set(ref(database, "users/" + userId.value), {
            name: userName.value.trim(),
            age: userAge.value.trim(),
            city: userCity.value.trim()
        });
        clearInput(); 
        return;
    }


    const newUser = {  /*Add new User Details*/
        name: userName.value.trim(),
        age: userAge.value.trim(),
        city: userCity.value.trim()
    };

    push(userListInDb, newUser);
    clearInput(); 
});

function clearInput() { /*Clear INput Details*/
    userId.value = ""; 
    userName.value = "";
    userAge.value = "";
    userCity.value = "";
}

onValue(userListInDb, function (data) { /*Display User Details in Table*/
    tblBody.innerHTML = ""; 

    if(data.exists()) {
        let usersArray = Object.entries(data.val());
        for(let i = 0; i < usersArray.length; i++) {
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
                    <button class="btn btn-primary me-2 btn-edit" ><i class="bi bi-pencil-square btn-edit" data-id=${userId}></i></button>
                    <button class="btn btn-danger btn-delete"><i class="bi bi-trash3 btn-delete" data-id=${userId}></i></button>
                </td>
            </tr>
            `;
        }
    } else {
        tblBody.innerHTML = "<tr><td colspan='5'>Data Not Found!!</td></tr>";
    }
});

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-edit")) {  /*Edit User Details*/
        const userId = e.target.dataset.id; 
        const tableRow = e.target.closest("tr").children; 

        Id.value = userId;
        userName.value = tableRow[1].textContent;
        userAge.value = tableRow[2].textContent;
        userCity.value = tableRow[3].textContent;

    } else if (e.target.classList.contains("btn-delete")) { /*Delete User Details*/
        if (confirm("Are you sure to delete the user?")) {
            const userId = e.target.dataset.id;
            const userRef = ref(database, `users/${userId}`);
            remove(userRef);  
        }
    }
});
