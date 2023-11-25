const video = document.querySelector('#video');
const play = document.querySelector('#play');
const stop= document.querySelector('#stop');
const progress = document.querySelector('#progress');
const timestamp = document.querySelector('#timestamp');




// !!! In HTML5, video element have the properties of paused and methods of play() and pause().!!!
const toggleVideoStatus = ()=>{
    if(video.paused){
        video.play();
    } else{
        video.pause();
    }
}


const updatePlayIcon =  ()=>{
    if(video.paused){
        play.innerHTML = ` <i class="bi bi-pause-fill"></i>`
    } 
    else{
        play.innerHTML = ` <i class="bi bi-play-fill"></i>`
    }
    
}



const updateProgress = ()=>{
    progress.value = (video.currentTime / video.duration) *100;


    //Get minutes
    let mins = Math.floor(video.currentTime / 60);
    if(mins < 10){
        mins = '0' + mins;
    }

    let seconds = Math.floor(video.currentTime % 60);
    if(seconds < 10){
        seconds = '0' + seconds;
    }
    timestamp.innerHTML = `${mins}:${seconds}`;
}



// TO stop the video, set the currentTime property to O and then pause the video
const stopVideo = ()=>{
    video.currentTime = 0;
    video.pause();

}


const setVideoProgress = ()=>{
    video.currentTime = (+ progress.value*video.duration)/100;
}

// Event listeners

video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);




play.addEventListener("click", toggleVideoStatus);

stop.addEventListener("click", stopVideo);
progress.addEventListener("change", setVideoProgress);