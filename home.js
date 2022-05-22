if( JSON.parse(localStorage.getItem("registerationstate"))[0]!==true || localStorage.getItem("registerationstate") ===null )
{
    window.location.href="login.html"
}else
{
    let welcomeuser =     JSON.parse(localStorage.getItem("registerationstate"))[1]
    document.querySelector("var").innerHTML=welcomeuser
}

function logout ()
{
    localStorage.setItem("registerationstate",JSON.stringify([false]))
    window.location.href="login.html"
}

document.getElementById("logout").addEventListener("click",()=>{
    logout()
})
