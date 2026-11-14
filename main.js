// make the interactive bubble follow the mouse cursor

document.addEventListener('DOMContentLoaded', () => {
    const interBubble = document.querySelector('.interactive');
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
        requestAnimationFrame(() => {
            move();
        });
    }

    window.addEventListener('mousemove', (event) => {
        tgX = event.clientX;
        tgY = event.clientY;
    });

    move();
});


// Duplicate the particles 

const particleContainer = document.getElementById('particle-container');

for (let i = 0; i < 60; i++) {
  const particle = document.createElement('span');
  const size = Math.random();

  particle.className = size < 0.4
    ? 'particle particle--small'
    : size < 0.8
      ? 'particle particle--medium'
      : 'particle particle--large';

  particle.style.left = `${Math.random() * 100}%`;
  particle.style.top = `${Math.random() * 100}%`;
  particle.style.animationDelay = `${(Math.random() * 10).toFixed(2)}s`;
  particle.style.animationDuration = `${(20 + Math.random() * 30).toFixed(2)}s`;

  particleContainer.appendChild(particle);
}

const panel1 = document.getElementById('panel1');
const seaVideo = panel1.querySelector('video');
let panel1Dismissed = false;

const panel2 = document.getElementById('panel2');
const scnVideo = panel2.querySelector('video');
let panel2Dismissed = false;

const panel3 = document.getElementById('panel3');
const thrVideo = panel3.querySelector('video');
let panel3Dismissed = false;

panel1.addEventListener('click', () => {
  panel1Dismissed = true;
  panel1.classList.add('hidden');
  seaVideo.pause();
});

panel2.addEventListener('click', () => {
  panel2Dismissed = true;
  panel2.classList.add('hidden');
  scnVideo.pause();
});

panel3.addEventListener('click', () => {
  panel3Dismissed = true;
  panel3.classList.add('hidden');
  thrVideo.pause();
});

// check the current hour of the day

function updateForCurrentTime() {
  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes();

// change the color scheme of the bubbles based on the time of day

const root = document.documentElement;

const themes = [
  {
    'color-bg1': 'rgb(0, 0, 0)',
    'color-bg2': 'rgb(13, 10, 18)',
    'color1': '10, 10, 5',
    'color2': '20, 0, 10',
    'color3': '5, 5, 10',
    'color4': '10, 5, 10',
    'color5': '20, 15, 5',
    'color-interactive': '0, 0, 0'
  },
  {
    'color-bg1': 'rgb(102, 146, 146)',
    'color-bg2': 'rgb(10, 40, 43)',
    'color1': '0, 70, 85',
    'color2': '30, 38, 50',
    'color3': '220, 220, 145',
    'color4': '85, 100, 97',
    'color5': '30, 40, 40',
    'color-interactive': '200, 40, 15'
  },
  {
    'color-bg1': 'rgb(145, 177, 197)',
    'color-bg2': 'rgb(16, 114, 111)',
    'color1': '210, 240, 250',
    'color2': '245, 185, 55',
    'color3': '250, 255, 225',
    'color4': '60, 115, 115',
    'color5': '235, 170, 40',
    'color-interactive': '245, 85, 45'
  },
  {
    'color-bg1': 'rgb(255, 199, 156)',
    'color-bg2': 'rgb(254, 102, 68)',
    'color1': '210, 240, 250',
    'color2': '245, 185, 55',
    'color3': '235, 170, 25',
    'color4': '235, 25, 95',
    'color5': '245, 185, 55',
    'color-interactive': '150, 170, 210'
  },
  {
    'color-bg1': 'rgb(122, 191, 171)',
    'color-bg2': 'rgb(55, 65, 70)',
    'color1': '100, 175, 185',
    'color2': '245, 135, 5',
    'color3': '220, 175, 180',
    'color4': '165, 110, 15',
    'color5': '200, 165, 100',
    'color-interactive': '100, 140, 200'
  },
  {
    'color-bg1': 'rgb(120, 24, 0)',
    'color-bg2': 'rgb(17, 12, 36)',
    'color1': '50, 45, 25',
    'color2': '50, 90, 85',
    'color3': '90, 5, 10',
    'color4': '25, 10, 90',
    'color5': '105, 40, 10',
    'color-interactive': '55, 15, 20'
  },
  {
    'color-bg1': 'rgb(53, 1, 1)',
    'color-bg2': 'rgb(8, 27, 36)',
    'color1': '30, 90, 90',
    'color2': '0, 35, 30',
    'color3': '50, 75, 75',
    'color4': '15, 25, 40',
    'color5': '5, 35, 80',
    'color-interactive': '105, 60, 20'
  },
  {
    'color-bg1': 'rgb(0, 0, 0)',
    'color-bg2': 'rgb(16, 8, 36)',
    'color1': '60, 60, 70',
    'color2': '60, 30, 175',
    'color3': '30, 40, 60',
    'color4': '40, 45, 65',
    'color5': '25, 50, 120',
    'color-interactive': '40, 10, 125'
  },
];

const themeIndex = hour >= 0 && hour < 3 ? 0 :
                   hour < 6 ? 1 :
                   hour < 9 ? 2 :
                   hour < 12 ? 3 :
                   hour < 15 ? 4 :
                   hour < 18 ? 5 :
                   hour < 21 ? 6 : 7;

applyTheme(themes[themeIndex]);

function applyTheme(theme) {
  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
}    

// show the prticles at night

if (hour >= 21 || hour < 3) {
  particleContainer.classList.remove('hidden');
} else {
  particleContainer.classList.add('hidden');
}

// set a timer for the angels

const angl1 = document.getElementById('angel1');
if (hour === 9 || hour === 14) {
  angl1.classList.remove('hidden');
} else {
  angl1.classList.add('hidden');
}

const angl2 = document.getElementById('angel2');
if (hour === 22 || hour === 1) {
  angl2.classList.remove('hidden');
} else {
  angl2.classList.add('hidden');
}

const angl3 = document.getElementById('angel3');
if (hour === 17 || hour === 13) {
  angl3.classList.remove('hidden');
  if (!angl3.src) {
    angl3.src = angl3.dataset.src;
    angl3.load();
  }
  if (angl3.paused) {
    angl3.play().catch((error) => {
      console.error('Unable to play the angel video:', error);
    });
  }
} else {
  angl3.classList.add('hidden');
  angl3.pause();
}

// set a timer for the poems

const activePoemIndex = Math.floor(hour / 2);

document.querySelectorAll('#poems > div').forEach((poem, index) => {
  poem.classList.toggle('hidden', index !== activePoemIndex);
});

// show panel1 

const shouldShowPanel1 = hour === 12 && !panel1Dismissed;
if (hour !== 12) {
  panel1Dismissed = false;
}

if (shouldShowPanel1) {
  panel1.classList.remove('hidden');
  if (!seaVideo.src) {
    seaVideo.src = seaVideo.dataset.src;
    seaVideo.load();
  }
  if (seaVideo.paused) {
    seaVideo.play().catch((error) => {
      console.error('Unable to play the sea video:', error);
    });
  }
} else {
  panel1.classList.add('hidden');
  seaVideo.pause();
}

// show panel2

const shouldShowPanel2 = hour === 16 && !panel2Dismissed;
if (hour !== 18) {
  panel2Dismissed = false;
}

if (shouldShowPanel2) {
  panel2.classList.remove('hidden');
  if (!scnVideo.src) {
    scnVideo.src = scnVideo.dataset.src;
    scnVideo.load();
  }
  if (scnVideo.paused) {
    scnVideo.play().catch((error) => {
      console.error('Unable to play the sea video:', error);
    });
  }
} else {
  panel2.classList.add('hidden');
  scnVideo.pause();
}

// show panel3 between 18:00 and 20:59

const isPanel3Time = hour >= 18 && hour < 21;
if (!isPanel3Time) {
  panel3Dismissed = false;
}

const shouldShowPanel3 = isPanel3Time && !panel3Dismissed;

if (shouldShowPanel3) {
  panel3.classList.remove('hidden');
  if (!thrVideo.src) {
    thrVideo.src = thrVideo.dataset.src;
    thrVideo.load();
  }
  if (thrVideo.paused) {
    thrVideo.play().catch((error) => {
      console.error('Unable to play the sea video:', error);
    });
  }
} else {
  panel3.classList.add('hidden');
  thrVideo.pause();
}


// set intervall to check the time
}
updateForCurrentTime();
setInterval(updateForCurrentTime, 60000);