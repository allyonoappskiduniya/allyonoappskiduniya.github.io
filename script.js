// ===================================================
// YonoAppsKiDuniya
// script.js
// PART 1
// Firebase Dynamic Games
// ===================================================

const searchInput = document.getElementById("searchInput");
const gamesContainer = document.getElementById("gamesContainer");
const gameCount = document.getElementById("gameCount");
const winnerPopup = document.getElementById("winner-popup");

// ------------------------
// Load Firebase Games
// ------------------------

async function loadGames() {

    if (!gamesContainer) return;

    try {

        const snapshot = await window.getDocs(
            window.collection(window.db, "games")
        );

        // Keep manual cards; only remove old Firebase cards
        document.querySelectorAll(".firebase-game").forEach(e=>e.remove());

        snapshot.forEach((doc) => {

            const game = doc.data();

            const card = document.createElement("div");

            card.className = "game-card firebase-game";

            card.innerHTML = `

<img src="${game.image}"
alt="${game.name}"
onerror="this.src='images/logo.png'">

<h3>${game.name}</h3>

<div class="rating">
${game.rating || "⭐⭐⭐⭐⭐"}
</div>

<a href="${game.link}"
target="_blank"
class="install-btn">

📲 INSTALL APP

</a>

`;

            gamesContainer.appendChild(card);

        });

        updateGameCount();

    } catch (error) {

        console.error("Firebase Error :", error);

    }

}
// ===================================================
// PART 2
// Search + Game Count + Auto Refresh
// ===================================================

// ------------------------
// Update Game Count
// ------------------------

function updateGameCount() {

    if (!gameCount) return;

    const total =
    document.querySelectorAll(".game-card").length;

    gameCount.innerText =
    total + " Trusted Games Available";

}

// ------------------------
// Search Games
// ------------------------

function enableSearch() {

    if (!searchInput) return;

    searchInput.addEventListener("keyup", function () {

        const value =
        this.value.toLowerCase();

        document
        .querySelectorAll(".game-card")
        .forEach(card => {

            const name =
            card.querySelector("h3")
            .innerText
            .toLowerCase();

            if (name.includes(value)) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

}

// ------------------------
// Refresh Firebase Games
// ------------------------

function refreshGames() {

    loadGames();

}

// First Load

window.addEventListener("load", () => {

    setTimeout(() => {

        refreshGames();

    }, 500);

});

// Auto Refresh Every 15 Seconds

setInterval(() => {

    refreshGames();

}, 15000);
// ===================================================
// PART 3
// Slider + Winner Popup + Final Init
// ===================================================

// ------------------------
// Banner Slider
// ------------------------

const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

function showSlide(index){

    slides.forEach(slide=>{
        slide.classList.remove("active");
    });

    if(slides.length>0){
        slides[index].classList.add("active");
    }

}

function nextSlide(){

    if(slides.length===0) return;

    currentSlide++;

    if(currentSlide>=slides.length){
        currentSlide=0;
    }

    showSlide(currentSlide);

}

if(slides.length>0){

    showSlide(0);

    setInterval(nextSlide,3000);

}



// ------------------------
// Winner Popup
// ------------------------

const winners=[

"Rahul won ₹520",
"Aman won ₹860",
"Rohit won ₹1200",
"Vikas won ₹750",
"Sunny won ₹2000",
"Riya won ₹980",
"Ankit won ₹640",
"Pooja won ₹1450"

];

function showWinner(){

    if(!winnerPopup) return;

    const randomWinner=
    winners[Math.floor(Math.random()*winners.length)];

    winnerPopup.innerHTML="🎉 "+randomWinner;

    winnerPopup.style.display="block";

    setTimeout(()=>{

        winnerPopup.style.display="none";

    },3000);

}

setInterval(showWinner,8000);



// ------------------------
// Install Button Animation
// ------------------------

document.addEventListener("click",function(e){

    if(!e.target.classList.contains("install-btn")) return;

    const btn=e.target;

    const oldText=btn.innerHTML;

    btn.innerHTML="⏳ Opening...";

    setTimeout(()=>{

        btn.innerHTML=oldText;

    },1500);

});



// ------------------------
// Final Start
// ------------------------

window.addEventListener("DOMContentLoaded",()=>{

    loadGames();

    enableSearch();

});
