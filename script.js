const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* ---------- PLAY / PAUSE ---------- */
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

/* ---------- PROGRESS BAR ---------- */
function handleProgress() {
  if (!video.duration) return;
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

/* ---------- SEEK ---------- */
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

/* ---------- SKIP ---------- */
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

/* ---------- RANGE CONTROLS ---------- */
function handleRangeUpdate() {
  video[this.name] = this.value;
}

/* ---------- ERROR HANDLING ---------- */
video.addEventListener('error', () => {
  const errorMsg = document.createElement('p');
  errorMsg.style.color = 'white';
  errorMsg.style.textAlign = 'center';
  errorMsg.textContent = 'Video failed to load.';
  player.appendChild(errorMsg);
});

/* ---------- EVENTS ---------- */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(btn => btn.addEventListener('click', skip));

ranges.forEach(range => {
  range.addEventListener('change', handleRangeUpdate);
  range.addEventListener('mousemove', handleRangeUpdate);
});

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
