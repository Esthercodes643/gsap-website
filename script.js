// Elements
const hamburger = document.getElementById('hamburger');
const pointerCircle = document.getElementById('pointerCircle');

/* Mouse Position */

let targetX = 0, targetY = 0;

/* Event Listeners */

document.addEventListener('mousemove', handleMouseMove);

/* It changes the position and appearance of the custom pointer based on mouse movement */

function handleMouseMove(e) {
    targetX = e.clientX;
    targetY = e.clientY;

    const rect = hamburger.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    const distance = Math.hypot(offsetX, offsetY);

    // move hamburger slightly based on mouse position
    hamburger.style.transform = distance < 120 ? `translate(${offsetX /4}px, ${offsetY / 4}px)` : `translate(0px, 0px)`;
       
    updatePointerAppearance();
}

/* Update the appearance of the pointer circle based on hover state */

function updatePointerAppearance(){
    const rect = hamburger.getBoundingClientRect();
    const isClose = Math.hypot(targetX - (rect.left + rect.width / 2), targetY - (rect.top + rect.height / 2)) < 65;

    pointerCircle.style.backgroundColor = isClose ? 'var(--white-color)' : '';
    pointerCircle.style.width = pointerCircle.style.height = isClose ? '100px' : '80px';
    
}

/* Smoothly animates the custom pointer to follow the mouse cursor */

function updatePointerCircle(){
    const { left, top, width, height} = pointerCircle.getBoundingClientRect();
    const currentX = left + width /2, currentY = top + height /2;

    pointerCircle.style.left = `${currentX + (targetX - currentX) * 0.6}px`;
    pointerCircle.style.top = `${currentY + (targetY - currentY) * 0.6}px`;

    requestAnimationFrame(updatePointerCircle);
}

//  Initial call to start the animation loop
updatePointerCircle();

