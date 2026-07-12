// YonoAppsKiDuniya - script.js
const searchInput=document.getElementById("searchInput");
const gamesContainer=document.getElementById("gamesContainer");
const gameCount=document.getElementById("gameCount");
const winnerPopup=document.getElementById("winner-popup");

// Slider
const slides=document.querySelectorAll(".slide");
let currentSlide=0;
function showSlide(i){slides.forEach(s=>s.classList.remove("active"));if(slides.length)slides[i].classList.add("active");}
function nextSlide(){if(!slides.length)return;currentSlide=(currentSlide+1)%slides.length;showSlide(currentSlide);}
if(slides.length){showSlide(0);setInterval(nextSlide,3000);}

// Firebase
async function loadGames(){
 if(!gamesContainer||!window.db)return;
 gamesContainer.innerHTML="";
 let total=0;
 try{
  const snap=await window.getDocs(window.collection(window.db,"games"));
  snap.forEach(d=>{
    total++;
    const g=d.data();
    const card=document.createElement("div");
    card.className="game-card";
    card.innerHTML=`
<div class="game-left"><img src="${g.image}" alt="${g.name}" onerror="this.src='images/logo.png'"></div>
<div class="game-center"><h3>${g.name}</h3><div class="rating">${g.rating||"⭐⭐⭐⭐⭐"}</div><p class="bonus">🎁 Register Bonus Available</p></div>
<div class="game-right"><a href="${g.link}" target="_blank" class="download-btn">DOWNLOAD</a></div>`;
    gamesContainer.appendChild(card);
  });
  if(gameCount)gameCount.textContent=`${total} Trusted Games Available`;
 }catch(e){console.error(e);}
}
if(searchInput){
 searchInput.addEventListener("input",()=>{
  const q=searchInput.value.toLowerCase();
  document.querySelectorAll(".game-card").forEach(c=>{
   c.style.display=c.innerText.toLowerCase().includes(q)?"flex":"none";
  });
 });
}
const winners=["Rahul won ₹520","Aman won ₹860","Sunny won ₹1200","Riya won ₹980"];
function showWinner(){
 if(!winnerPopup)return;
 winnerPopup.textContent="🎉 "+winners[Math.floor(Math.random()*winners.length)];
 winnerPopup.style.display="block";
 setTimeout(()=>winnerPopup.style.display="none",3000);
}
if(winnerPopup)setInterval(showWinner,8000);
document.addEventListener("DOMContentLoaded",loadGames);
window.addEventListener("focus",loadGames);
setInterval(loadGames,15000);
