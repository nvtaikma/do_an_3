let getID = (id) =>{
    return document.getElementById(id);
}
const Data = {
    userName: "admin",
    password: "12"
}
const userName = getID('userName');
const password = getID('password');


function handleLogin(){
    console.log("userName", userName.value);
    if(userName.value === Data.userName && password.value === Data.password){
        alert("Login successful");
        return window.location.href = "./main_control/index.html";
    }else{
        alert("Login failed");
    }

}