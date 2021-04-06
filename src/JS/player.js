(function() {
  
  const playerContainer = $(".player");
  var video = document.getElementsByTagName('video')[0];
  var volumeControl = document.getElementById('volume');
  
  video.addEventListener('canplaythrough', function () {
    video.volume = volumeControl.value;
  }, false);
  
  $(".player__start").click(e=>{
    e.preventDefault();
  
    if (video.paused) {
      playerContainer.addClass("player--active");
      playerContainer.removeClass("player--paused");
      video.play();
    } else {
      playerContainer.addClass("player--paused");
      playerContainer.removeClass("player--active");
      video.pause();
    }
  });
  
  volumeControl.addEventListener('input', function () {      
    video.volume = volumeControl.value;
  }, false);
  
  $(".player__splash").click(e => {
  playerContainer.addClass("player--active");
  playerContainer.removeClass("player--paused");
  video.play();
  });
  
  $(".player__playback").click(e => {
  const bar = $(e.currentTarget);
  const clickedPosition = e.originalEvent.layerX;
  
  const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
  const newPlaybackPositionSec =
    (video.duration / 100) * newButtonPositionPercent;
  
  $(".player__playback-button").css({
    left: `${newButtonPositionPercent}%`
  });
  
  video.currentTime = newPlaybackPositionSec;
  });
  
  video.addEventListener('timeupdate', function(){
    const completedSec = video.currentTime;
    const completedPercent = (completedSec / video.duration) * 100;
  
    $(".player__playback-button").css({
      left: `${completedPercent}%`
    });
  });
})()