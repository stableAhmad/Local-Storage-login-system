"use strict";

//I checked if the data exists but i forgot to check if the input is empty  :)

let storage = (localStorage.getItem("storeddata")===null) ? [] : JSON.parse(localStorage.getItem("storeddata"));


let warningState = "none" ;

function getInput()
{
    return {
       name: document.getElementById("name").value,
       email : document.getElementById("email").value,
        password: document.getElementById("password").value
    }
}

function validate (targetobject,existingarray)
{
     let errorcause ;
    
        const result =   existingarray.find((user)=>{
            if(user.name=== targetobject.name)
            {
                errorcause="name"
                return true;
            }else if(user.email=== targetobject.email)
            {
                errorcause ="email"
                return true;
            }
      })
      
      return [(result!==undefined) ? false : true , errorcause] ;
      }


function signUp( targetObject , valid ,errorcause )
{
       if(valid)
       {
           storage.push(targetObject);
           localStorage.setItem("storeddata",JSON.stringify(storage))
          
           success ();
           warningState="none"
        }else
       {
           warningState= warning(errorcause);
       }
}


function warning (errorcause)
{
    let tempinnerHTML = document.getElementById("inputs-container").innerHTML;
    if (tempinnerHTML.includes("success"))
    {
        let targetToBeRemoved = `<p class="success">success</p>`;
         let tempinnerhtml =  document.getElementById("inputs-container").innerHTML.replace(targetToBeRemoved,"");
         tempinnerhtml += `<p class="warningMessage" >User already exists please try different ${errorcause}</p>`;
         document.getElementById("inputs-container").innerHTML = tempinnerhtml;
    } else if(warningState==="none"){
        let warningMessage = `<p class="warningMessage" >User already exists please try different ${errorcause}</p>`
        document.getElementById("inputs-container").innerHTML+=warningMessage ;
        
     }else if (warningState !== errorcause )
     {
         let targetToBeRemoved = `<p class="warningMessage">User already exists please try different ${warningState}</p>`;
         let tempinnerhtml =  document.getElementById("inputs-container").innerHTML.replace(targetToBeRemoved,"");
         tempinnerhtml += `<p class="warningMessage" >User already exists please try different ${errorcause}</p>`;
         document.getElementById("inputs-container").innerHTML = tempinnerhtml;
     }
     return errorcause+"";
    
}

function success ()
{
    
    let tempinnerHTML = document.getElementById("inputs-container").innerHTML;
    if(!tempinnerHTML.includes("success") && warningState==="none" )
    {
        document.getElementById("inputs-container").innerHTML+=`<p class="success">success</p>` ;
    }else if(!tempinnerHTML.includes("success") && warningState!=="none")
    {
        
        let targetToBeRemoved = `<p class="warningMessage">User already exists please try different ${warningState}</p>`;
        let tempinnerhtml =  document.getElementById("inputs-container").innerHTML.replace(targetToBeRemoved,"");
        tempinnerhtml += `<p class="success">success</p>`;
        document.getElementById("inputs-container").innerHTML = tempinnerhtml;
    }
}









//assigning
document.getElementById("signup").addEventListener("click",()=>{
     signUp( getInput() , ...validate(getInput(),storage)  ) 
})

document.getElementById("gosignin").addEventListener("click",()=>{
    window.location.href="login.html"
    
})