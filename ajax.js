"use strict;";

let listItems = document.querySelectorAll(".navbar li")
let navLinks = document.querySelectorAll(".navbar li a");
let main = document.querySelector("main");
let home = main.innerHTML;
navLinks.forEach((navLink)=>{
    navLink.addEventListener("click", (event)=>{
        event.preventDefault();
        let listItem = event.target.parentNode;
        refreshActive(listItems);
        listItem.classList.add("active");
        if(event.target.id == "home"){
            main.innerHTML = home;
            return;
        }
        ajaxCall(getFileName(event.target.href));
    });
});
function refreshActive(elementList){
    for(let element of elementList){
        element.classList.remove("active");
    }
}
function ajaxCall(address){
    let guestDoc;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `/${address}`,true);
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState == 4 && xhr.status == 200){
            guestDoc = xhr.responseText;
            let div = document.createElement("div")
            div.innerHTML = guestDoc;
            let switched = div.querySelector("main");
            main.innerHTML = switched.innerHTML;
            console.log(xhr.response);
        }   
    }
    xhr.onerror = ()=>{
        console.log("there was a slight error")
    }
    xhr.send();

}
function getFileName(hrefString){
    let arr = hrefString.split("/");
    return arr[arr.length-1];

}