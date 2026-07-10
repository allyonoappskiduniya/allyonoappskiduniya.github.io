// YonoAppsKiDuniya ALL FIX SCRIPT

const searchInput=document.getElementById("searchInput");
const gamesContainer=document.getElementById("gamesContainer");
const visitorBox=document.getElementById("visitors");
const winnerPopup=document.getElementById("winner-popup");

const slides=document.querySelectorAll(".slide");
let currentSlide=0;

function showSlide(i){
slides.forEach(s=>s.classList.remove("active"));
if(slides[i]) slides[i].classList.add("active");
}

if(slides.length){
showSlide(0);
setInterval(()=>{
currentSlide=(currentSlide+1)%slides.length;
showSlide(currentSlide);
},3000);
}

if(visitorBox){
let visitors=1256;
visitorBox.innerText=visitors;
setInterval(()=>{
visitors+=Math.floor(Math.random()*5)+1;
visitorBox.innerText=visitors;
},5000);
}

async function loadGames(){

if(!gamesContainer)return;

try{

const snapshot=await window.getDocs(
window.collection(window.db,"games")
);

document.querySelectorAll(".firebase-game")
.forEach(c=>c.remove());

snapshot.forEach(doc=>{

const game=doc.data();

let image=game.image || "images/logo.png";

if(!image.includes("images/")){
image="images/"+image;
}

const card=document.createElement("div");

card.className="game-card firebase-game";

card.innerHTML=`
<img src="${image}" onerror="this.src='images/logo.png'">
<h3>${game.name || "Game"}</h3>
<div class="rating">${game.rating || "⭐⭐⭐⭐⭐"}</div>
<a href="${game.link || '#'}" target="_blank" class="install-btn">
📲 INSTALL APP
</a>
`;

gamesContainer.appendChild(card);

});

updateGameCount();

}catch(e){
console.log("Firebase Error:",e);
}

}

function updateGameCount(){

const box=document.getElementById("gameCount");

if(box){
box.innerText=document.querySelectorAll(".game-card").length+
" Trusted Games Available";
}

}

if(searchInput){

searchInput.addEventListener("keyup",function(){

let value=this.value.toLowerCase();

document.querySelectorAll(".game-card").forEach(card=>{

let name=card.querySelector("h3")?.innerText.toLowerCase() || "";

card.style.display=name.includes(value)?"block":"none";

});

});

}

const winners=[
"Rahul won ₹520",
"Aman won ₹860",
"Sunny won ₹2000"
];

function showWinner(){

if(!winnerPopup)return;

winnerPopup.innerHTML="🎉 "+winners[Math.floor(Math.random()*winners.length)];
winnerPopup.style.display="block";

setTimeout(()=>{
winnerPopup.style.display="none";
},3000);

}

setInterval(showWinner,8000);

window.addEventListener("DOMContentLoaded",()=>{
loadGames();
updateGameCount();
});

console.log("✅ Script Loaded");
