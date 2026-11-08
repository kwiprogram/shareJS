const images = document.querySelectorAll(".img-wrapper > img");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dots = document.querySelectorAll(".dot");

let counter = 0;
nextBtn.addEventListener("click", nextSlide);

function nextSlide(){
    images[counter].style.animation = "nextOut 0.5s forwards";
    if(counter >= images.length - 1){
        counter = 0;
    }else{
        counter++;
    }
    images[counter].style.animation = "nextIn 0.5s forwards";
    pointerDot();
}

prevBtn.addEventListener("click", prevSlide);

function prevSlide(){
    images[counter].style.animation = "prevOut 0.5s forwards";
    if(counter == 0){
        counter = images.length - 1;
    }else{
        counter--;
    }
    images[counter].style.animation = "prevIn 0.5s forwards";
    pointerDot();
}

function autoSliding (){
    deletesInterval = setInterval(()=>{
        nextSlide();
        pointerDot();
    }, 1500)
}

autoSliding();

const slideContainer = document.querySelector(".slide-container");
slideContainer.addEventListener("mouseover", function(){
    clearInterval(deletesInterval);
})
slideContainer.addEventListener("mouseout", function(){
    autoSliding();
})

function pointerDot (){
    for(let i = 0; i < dots.length; i++){
        dots[i].className = dots[i].className.replace("active", "");
    }
    dots[counter].className += " active";
}

dots.forEach((dot)=>{
    dot.addEventListener("click", function(e){
        e.currentTarget.classList.add("active");
        const dotIndex = e.currentTarget.getAttribute("attr");
        if(dotIndex >= counter){
            images[counter].style.animation = "nextOut 0.5s forwards";
            counter = dotIndex;
            images[counter].style.animation = "nextIn 0.5s forwards";
        }else if (dotIndex == counter){
            return;
        }else{
            images[counter].style.animation = "prevOut 0.5s forwards";
            counter = dotIndex;
            images[counter].style.animation = "prevIn 0.5s forwards";
        }
        pointerDot();
    })
})