console.log("Music Learning App Loaded");
// OPEN / CLOSE SETTINGS PANEL
function openSettings() {
  document.getElementById('settingsPanel').style.display = 'block';
}
function closeSettings() {
  document.getElementById('settingsPanel').style.display = 'none';
}

// THEME SWITCH
function changeTheme(theme) {
  if(theme === 'dark') {
    document.body.style.backgroundColor = '#111';
    document.body.style.color = '#eee';
  } else {
    document.body.style.backgroundColor = '#eef4ff';
    document.body.style.color = '#000';
  }
  localStorage.setItem('theme', theme);
}

// FONT SIZE
function changeFontSize(size) {
  document.body.style.fontSize = size + 'px';
  localStorage.setItem('fontSize', size);
}

// AUDIO VOLUME
function changeVolume(vol) {
  const audio = document.getElementById('lessonAudio');
  audio.volume = vol;
  localStorage.setItem('volume', vol);
}

// KEYBOARD TOGGLE
function toggleKeyboard(show) {
  const keyboard = document.getElementById('pianoKeyboard');
  keyboard.style.display = show ? 'flex' : 'none';
  localStorage.setItem('keyboardVisible', show);
}

// PIANO NOTES
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const notes = {
  "C4": 261.63, "C#4": 277.18, "D4": 293.66, "D#4": 311.13, "E4": 329.63,
  "F4": 349.23, "F#4": 369.99, "G4": 392.00, "G#4": 415.30,
  "A4": 440.00, "A#4": 466.16, "B4": 493.88, "C5": 523.25
};

function playNote(note) {
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscillator.type = 'sine';
  oscillator.frequency.value = notes[note];
  gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.5);
}

// Piano key click
document.querySelectorAll('#pianoKeyboard .key').forEach(key => {
  key.addEventListener('click', () => {
    const note = key.getAttribute('data-note');
    playNote(note);
  });
});

// LOAD SETTINGS ON PAGE LOAD
window.onload = function() {
  // Theme
  let theme = localStorage.getItem('theme') || 'light';
  changeTheme(theme);
  document.getElementById('themeSelect').value = theme;

  // Font Size
  let fontSize = localStorage.getItem('fontSize') || 16;
  changeFontSize(fontSize);
  document.getElementById('fontSizeSlider').value = fontSize;

  // Volume
  let volume = localStorage.getItem('volume') || 0.5;
  changeVolume(volume);
  document.getElementById('volumeSlider').value = volume;

  // Keyboard visibility
  let keyboardVisible = localStorage.getItem('keyboardVisible');
  if(keyboardVisible === null) keyboardVisible = true;
  else keyboardVisible = keyboardVisible === 'true';
  toggleKeyboard(keyboardVisible);
  document.getElementById('keyboardToggle').checked = keyboardVisible;
};
