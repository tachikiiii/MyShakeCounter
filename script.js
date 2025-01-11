let shakeCount = 0;
let lastX = null;
let lastY = null;
let lastZ = null;
const threshold = 15; // 振る強さの閾値

window.addEventListener('devicemotion', (event) => {
    const { x, y, z } = event.accelerationIncludingGravity;

    if (lastX !== null && lastY !== null && lastZ !== null) {
        const deltaX = Math.abs(x - lastX);
        const deltaY = Math.abs(y - lastY);
        const deltaZ = Math.abs(z - lastZ);

        if (deltaX > threshold || deltaY > threshold || deltaZ > threshold) {
            shakeCount++;
            document.getElementById('shakeCount').innerText = shakeCount;
        }
    }

    lastX = x;
    lastY = y;
    lastZ = z;
});
