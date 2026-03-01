// The Public CORS Proxy + Your Stream URL
const proxy = 'https://cors-anywhere.herokuapp.com';
const targetUrl = 'https://airtelapp.shemaroo.com';
const streamUrl = proxy + targetUrl;

const video = document.getElementById('video');

if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(streamUrl);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function() {
        video.play();
    });
} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = streamUrl;
}

