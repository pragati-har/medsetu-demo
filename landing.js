/* ANIMATED COUNTERS */

const counters=document.querySelectorAll(".counter")

counters.forEach(counter=>{

const target=+counter.getAttribute("data-target")

let count=0

const speed=200
const increment=target/speed

function updateCounter(){

count+=increment

if(count<target){

counter.innerText=Math.ceil(count)

requestAnimationFrame(updateCounter)

}else{

counter.innerText=target

}

}

updateCounter()

})

/* SMOOTH SCROLL FOR NAV LINKS */

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault()

document.querySelector(this.getAttribute("href"))
.scrollIntoView({

behavior:"smooth"

})

})

})

/* NAVBAR SHADOW ON SCROLL */

window.addEventListener("scroll",()=>{

const nav=document.querySelector(".landing-nav")

if(window.scrollY>30){

nav.style.boxShadow="0 4px 20px rgba(0,0,0,0.1)"

}else{

nav.style.boxShadow="none"

}

})

