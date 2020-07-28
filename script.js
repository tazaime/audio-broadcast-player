const audio = document.getElementById('radioplayer');
const play = document.getElementById('play');
const vol = document.getElementById('vol');
const volumeFader = document.getElementById('fader');

volRecovery();

// Play and Pause Audio
function toggleAudioStatus() {
  if (audio.paused) {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
    audio.setAttribute(
      'src',
      'https://broadcast.wssr.stream/radio/8000/radio.mp3'
    );
    audio.setAttribute('type', 'audio/mpeg');
    audio.play();
  } else {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
    audio.pause();
    audio.setAttribute('src', '');
  }
}

// Change Volume Icon Based on Fader Input Location
function volIconToggle() {
  if (volumeFader.value == 0) {
    vol.innerHTML = '<i class="fa fa-volume-off fa-2x"></i>';
    audio.muted = true;
  } else if (volumeFader.value < 40) {
    vol.innerHTML = '<i class="fa fa-volume-down fa-2x"></i>';
    audio.muted = false;
  } else {
    vol.innerHTML = '<i class="fa fa-volume-up fa-2x"></i>';
    audio.muted = false;
  }
}

// Volume Fader Set
function setVolumeFader() {
  // Volume Memory on Page Reload
  vol_serialized = JSON.stringify(audio.volume);
  localStorage.setItem('volMemory', vol_serialized);
  // Set Fader
  audio.volume = volumeFader.value / 100;
  volIconToggle();
}

// Volume Memory on Page Reload
function volRecovery() {
  if (localStorage.volMemory == undefined) {
    audio.volume = 0.5;
  } else {
    audio.volume = JSON.parse(localStorage.getItem('volMemory'));
  }
  volumeFader.value = audio.volume * 100;
  volIconToggle();
}

// Volume Mute
function toggleVolume() {
  cachedVolume = localStorage.volMemory * 100;
  if (audio.muted) {
    audio.muted = false;
    volumeFader.value = cachedVolume;
    if (volumeFader.value < 40) {
      vol.innerHTML = '<i class="fa fa-volume-down fa-2x"></i>';
    } else {
      vol.innerHTML = '<i class="fa fa-volume-up fa-2x"></i>';
    }
  } else {
    audio.muted = true;
    cachedVolume = volumeFader.value;
    vol.innerHTML = '<i class="fa fa-volume-off fa-2x"></i>';
    volumeFader.value = 0;
  }
  // Toggle Volume From Fader Manually Positioned to 0 Mute
  if (audio.muted === false && localStorage.volMemory == '0') {
    audio.muted = false;
    audio.volume = 0.5;
    cachedVolume = 50;
    volumeFader.value = 50;
    localStorage.volMemory = 0.5;
  }
}

// else if ((localStorage.volMemory = '0')) {
//   toggleVolumeOnMute();
// }

// function toggleVolumeOnMute() {
//   audio.volume = 0.5;
//   volumeFader.value = '50';
//   localStorage.setItem('volMemory', vol_serialized);
// }

// Event Listeners
// audio.addEventListener('click', toggleAudioStatus);
play.addEventListener('click', toggleAudioStatus);
volumeFader.addEventListener('mousemove', setVolumeFader);
volumeFader.addEventListener('change', setVolumeFader);
vol.addEventListener('click', toggleVolume);
