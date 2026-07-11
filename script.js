// ================= SLIDER =================

let slides = document.querySelectorAll(".slide");
let slideIndex = 0;


function showSlide(){

    slides.forEach(function(slide){
        slide.classList.remove("active");
    });


    if(slides.length > 0){

        slides[slideIndex].classList.add("active");

        slideIndex++;

        if(slideIndex >= slides.length){
            slideIndex = 0;
        }

    }

}


if(slides.length > 0){

    setInterval(showSlide,3000);

}



// ================= SEARCH =================

let searchInput = document.getElementById("searchInput");


if(searchInput){

searchInput.addEventListener("keyup",function(){

    let value = this.value.toLowerCase();


    let games = document.querySelectorAll(".game-card");


    games.forEach(function(game){

        let name = game.querySelector("h3").innerText.toLowerCase();


        if(name.includes(value)){

            game.style.display="block";

        }else{

            game.style.display="none";

        }

    });


});

}
// ================= WINNER POPUP =================

let winnerPopup = document.getElementById("winner-popup");


let winners = [
    "Rahul won ₹500",
    "Amit won ₹1000",
    "Vijay won ₹300",
    "Sahil won ₹750",
    "Rohan won ₹200"
];


function showWinner(){

    if(winnerPopup){

        let randomWinner = winners[
            Math.floor(Math.random() * winners.length)
        ];


        winnerPopup.innerHTML =
        "🏆 " + randomWinner;


        winnerPopup.style.display="block";


        setTimeout(function(){

            winnerPopup.style.display="none";

        },3000);

    }

}



setInterval(showWinner,8000);
