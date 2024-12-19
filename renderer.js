const { ipcRenderer } = require('electron');

const $btnStopResume = document.getElementById('stop-resume');
const $btnPlay = document.getElementById('play');
const $btnCloseApp = document.getElementById('close-app');

const $timerDisplay = document.getElementById('timer');
const $btnStopResumeIcon = document.getElementById('stop-resume_icon');
const $btnPlayIcon = document.getElementById('play_icon');

document.addEventListener('DOMContentLoaded', () => {
    const [min, sec] = $timerDisplay.innerText.split(':').map(Number);

    let configuredTime = min * 60 + sec;
    let timeLeft = configuredTime;
    let paused = false;

    const showNotification = (NOTIFICATION_TITLE, NOTIFICATION_BODY) => {
        new window.Notification(
            NOTIFICATION_TITLE,
            {
                body: NOTIFICATION_BODY
            }
        )
        //.onclick = () => { document.getElementById('output').innerText = CLICK_MESSAGE }
    }

    const updateTimerDisplay = () => {
        let min = String(Math.floor(timeLeft / 60)).padStart(2, '0');
        let sec = String(timeLeft % 60).padStart(2, '0');

        if (timeLeft <= 0) {
            min = String(Math.floor(configuredTime / 60)).padStart(2, '0');
            sec = String(configuredTime % 60).padStart(2, '0');
        }

        $timerDisplay.textContent = `${min}:${sec}`;
    }

    let counter;
    const start = () => {
        counter = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(counter);
                showNotification('Timer encerrado', 'Seu timer foi concluído, tire uma pausa.');
            }

            if (!paused && timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
                $btnPlayIcon.src = './resources/icons/restart_alt_24dp.svg'
            }
        }, 1000);
    }

    $btnPlay.addEventListener('click', e => {
        e.preventDefault();
        if(timeLeft > 0 && timeLeft < configuredTime) {
            clearInterval(counter);
            paused = false;
            $btnStopResumeIcon.src = './resources/icons/pause_24dp.svg';
            $btnPlayIcon.src = './resources/icons/play_arrow_24dp.svg';
            timeLeft = configuredTime;
            updateTimerDisplay();
        } else {
            start();
        }
    });

    $btnStopResume.addEventListener('click', e => {
        e.preventDefault();
        if (timeLeft == configuredTime || timeLeft <= 0) return;
        paused = !paused;

        $btnStopResumeIcon.src = paused ? './resources/icons/resume_24dp.svg' : './resources/icons/pause_24dp.svg';
    });


    $btnCloseApp.addEventListener('click', () => {
        ipcRenderer.send('close-app');
    });
    

});
