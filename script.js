let shakeCount = 0;
let lastX = null;
let lastY = null;
let lastZ = null;
const threshold = 15; // 振る強さの閾値
const minShakeDuration = 300; // 最小振動の持続時間（ミリ秒）
let lastShakeTime = 0; // 最後に振った時間

function handleMotion(event) {
    const { x, y, z } = event.accelerationIncludingGravity;

    if (lastX !== null && lastY !== null && lastZ !== null) {
        const deltaX = Math.abs(x - lastX);
        const deltaY = Math.abs(y - lastY);
        const deltaZ = Math.abs(z - lastZ);

        // 振動の強さが閾値を超えている場合にカウント
        if ((deltaX > threshold || deltaY > threshold || deltaZ > threshold)) {
            const currentTime = Date.now();
            if (currentTime - lastShakeTime > minShakeDuration) {
                shakeCount++;
                document.getElementById('shakeCount').innerText = shakeCount;
                lastShakeTime = currentTime;
            }
        }
    }

    lastX = x;
    lastY = y;
    lastZ = z;
}

function requestDeviceMotionPermission() {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    enableMotion();
                } else {
                    console.log("モーションセンサーの使用が許可されませんでした");
                }
            })
            .catch(console.error);
    } else {
        // iOS 13未満のデバイスまたは他のデバイスの場合、直接イベントリスナーを追加
        enableMotion();
    }
}

// モーションセンサーを有効にする
function enableMotion() {
    window.addEventListener('devicemotion', handleMotion);
}

// 画面タップでモーションセンサーを有効にする
document.addEventListener('click', () => {
    if (!motionEnabled) {
        console.log("タップでモーションセンサーを開始");
        requestDeviceMotionPermission();
    }
});

// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', () => {
    // 初期メッセージ
    document.body.innerHTML += '<p>画面をタップしてセンサーを有効にしてください。</p>';
    const button = document.createElement('button');
    button.innerText = 'モーションセンサーを有効にする';
    button.addEventListener('click', requestDeviceMotionPermission);
    document.body.appendChild(button);
});
