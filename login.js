"use strict";



function getdata()
{
    return {
        email:document.getElementById("email").value ,
        password:document.getElementById("password").value
    }
}
function validate (user)
{
       if(user.email==="" || user.password==="")
       {
           return "empty"
       }else 
       { 
             let storeddata = (localStorage.getItem("storeddata")===null) ? "no users exist , create an account first" : JSON.parse(localStorage.getItem("storeddata"))
             if (storeddata === "no users exist , create an account first")
             {
                 return "no users"
             }else
             {
                 let users = JSON.parse(localStorage.getItem("storeddata"));
                 const searchresult = users.find((storeduser)=>{
                       if(storeduser.email===user.email)
                       {
                           return true;
                       }
                 })
                 if(searchresult === undefined)
                 {
                     return "non existing";
                 }else
                 {
                     if (searchresult.password===user.password)
                     {
                         return ["accepted",searchresult.name];
                     }else
                     {
                         return "wrongpassword";
                     }
                 }
             }
       }
}

function action (validation,username)
{
    switch(validation)
    {
        case"empty":
            alert("all inputs are required");
            break;
        
        case"no users" :
        case"non existing":
            alert("account not found , create an account first")
            break;
        
        case"wrongpassword":
        
            alert("wrong email or password")
            break;
        
        case"accepted":
        
             localStorage.setItem("registerationstate",JSON.stringify([true,username]))
            window.location.href="home.html"
            break;
        
    }
}
















document.getElementById("login").addEventListener("click",()=>{
    if (validate(getdata()) instanceof Array)
    {
        action(...validate(getdata()))
    }else
    {
        action (validate(getdata()))
    }
   
})




document.getElementById("gosignup").addEventListener("click",()=>{
    window.location.href="signup.html";
})