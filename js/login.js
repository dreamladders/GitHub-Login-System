/*************************************************
 * login.js
 * Login Function
 *************************************************/


async function login(){


const username =
document.getElementById("username").value.trim();


const password =
document.getElementById("password").value;


const message =
document.getElementById("message");



if(!username || !password){

message.innerHTML =
"Please enter username and password.";

return;

}



message.innerHTML =
"Logging in...";



const passwordHash =
await hashPassword(password);



const payload = {


action:"login",


username:username,


passwordHash:passwordHash


};



try{


const response =
await fetch(
API_URL,
{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:
JSON.stringify(payload)

}

);



const result =
await response.json();



if(result.status === true){


localStorage.setItem(
"token",
result.data.token
);


localStorage.setItem(
"username",
result.data.username
);


localStorage.setItem(
"role",
result.data.role
);



if(result.data.role === "Admin"){


window.location.href =
"admin.html";


}

else{


window.location.href =
"dashboard.html";


}



}

else{


message.innerHTML =
result.message;


}



}

catch(error){


message.innerHTML =
"Server connection failed.";


console.log(error);


}



}



// Show / Hide password

function togglePassword(){


const password =
document.getElementById("password");



if(password.type === "password"){

password.type="text";

}

else{

password.type="password";

}


}
