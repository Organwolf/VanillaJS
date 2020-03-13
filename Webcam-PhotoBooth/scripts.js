const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(localMediaStream => {
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch(err => {
            console.log("Error: ", err);
        });
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    console.log(width, height);
    return setInterval(() => {
        // draw the image starting in the top left corner
        ctx.drawImage(video, 0, 0, width, height);
        // take pixels out
        let pixels = ctx.getImageData(0, 0, width, height);
        // add effect
        ctx.globalAlpha = 0.1;
        // pixels = redEffect(pixels);
        pixels = rgbSplit(pixels);
        // put pixels back
        ctx.putImageData(pixels, 0, 0);
    }, 16);
}


function takePhoto() {
    // play the sound
    snap.currentTime = 0;
    snap.play();

    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    // link.textContent = 'Download Image';
    link.innerHTML = `<img src="${data}" alt="Selfie" />`
    strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
    // do red stuff
    for (let i = 0; i < pixels.data.length; i += 4) {
        // RED
        pixels.data[i + 0] = pixels.data[i + 0] + 100;
        // BLUE
        pixels.data[i + 1] = pixels.data[i + 1] - 50;
        // GREEN
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5;
        // ALPHA
        // pixels.data[i + 3]
    }
    return pixels;
}

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        // RED
        pixels.data[i - 500] = pixels.data[i + 0];
        // BLUE
        pixels.data[i + 200] = pixels.data[i + 1];
        // GREEN
        pixels.data[i + 500] = pixels.data[i + 2];
        // ALPHA
        // pixels.data[i + 3]
    }
    return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);   // add a listener to when the feed is available
