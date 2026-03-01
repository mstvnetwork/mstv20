// The proxied URL pointing to your Netlify redirect
const streamUrl = '/shemaroo/smil:shemarootvadp.smil/playlist.m3u8&id=2092&type=mp4';

const video = document.getElementById('video'); // Make sure your index.html has <video id="video"></video>

if (Hls.isSupported()) {
    const hls = new Hls({
        xhrSetup: function (xhr, url) {
            xhr.withCredentials = false; // Required for some proxied streams
        }
    });
    hls.loadSource(streamUrl);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play();
    });
} 
// For Safari/iOS which has native HLS support
else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = streamUrl;
    video.addEventListener('loadedmetadata', function () {
        video.play();
    });
}

