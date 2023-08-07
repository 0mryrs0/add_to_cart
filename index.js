import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSetting = {
    databaseURL: "https://playground-5af5e-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSetting);
const database = getDatabase(app);
const itemInDB = ref(database, "item");

const inputFieldEl = document.getElementById("input-field");
const addButtonnEl = document.getElementById("add-button");
const itemEl = document.getElementById("shopping-list");

addButtonnEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value;
    push(itemInDB, inputValue);
    console.log(`${inputValue} added to database`);
    clearInputBox();
})

onValue(itemInDB, function(snapshot) {

    if (snapshot.exists()) {
        let itemArray = Object.entries(snapshot.val());
        let currentItemID = Object.keys(snapshot.val());
        let currentItemValue = Object.values(snapshot.val());
        console.log(currentItemID);
        console.log(currentItemValue);

        clearItemsEl();

        for (let i = 0; i < itemArray.length; i++) {
            addItemToShoppingList(itemArray[i]);
        }
    }
    else {
        itemEl.innerHTML = "You haven't add any items here";

        }
    
})

function clearItemsEl() {
    itemEl.innerHTML = "";
}

function clearInputBox() {
    inputFieldEl.value = "";
}

function addItemToShoppingList(item) {
/*     itemEl.innerHTML += `
    <li>
        ${item}
    </li>` */

    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li");
    newEl.textContent = itemValue;

    newEl.addEventListener("dblclick", function() {
        let locationOfItemInDb = ref(database, `item/${itemID}`)
        remove(locationOfItemInDb);

    })

    
    itemEl.append(newEl);


}

