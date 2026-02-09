/* Edit this file */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay() {
	const method = video.paused ? 'play' : 'pause';
	video[method]();
}

	function updateButton() {
		toggle.textContent = video.paused ? '►' : '❚ ❚';
	}

	function handleProgress() {
		if(!video.duration) return;
		const percent = (video.curentTime / video.duration) * 100;
		progressBar.style.flexBasis = `${percent}%`;
	}

	function scrub(e) {
		const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
		video.currentTime = scrubTime;
	}

function skip() {
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
	video[this.name] = this.value;
}

video.addEventListener('error', () => {
	const errorMsg = document.createElement('p');
	errorMsg.style.color = 'white';
	errorMsg.style.textAlign = 'center';
	errorMsg.textContent = 'video failed to load.';
	player.appendChild(errorMsg);
});

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(btn => btn.addEventListener('click', skip));

ranges.forEach(range => {
	range.addEventListener('change', handleRangeUpdate);
	range.addEvenatListener('mousemove', handleRangeUpdate);
});

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub (e));
progress.addEventListener('mousedown', () => mousedown = true;
progress.addEventListener('mouseup', () => mousedown = false;