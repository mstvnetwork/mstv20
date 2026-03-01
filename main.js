// This URL uses your working Netlify proxy path
const streamUrl = '/shemaroo/smil:shemarootvadp.smil/playlist.m3u8&id=2092&type=mp4';

// Target the video element in your index.html
const video = document.getElementById('video');

function initPlayer() {
    if (Hls.isSupported()) {
        const hls = new Hls({
            // Enables cross-domain credentials if Shemaroo requires cookies
            xhrSetup: function (xhr) {
                xhr.withCredentials = false;
            }
        });
        
        hls.loadSource(streamUrl);
        hls.attachMedia(video);
        
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            console.log("Stream manifest loaded via Proxy. Playing...");
            video.play().catch(e => console.error("Autoplay blocked:", e));
        });

        hls.on(Hls.Events.ERROR, function (event, data) {
            if (data.fatal) {
                console.error("HLS Error:", data.type);
                hls.recoverMediaError();
            }
        });
    } 
    // Native support for Safari/iOS
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = streamUrl;
        video.addEventListener('loadedmetadata', function () {
            video.play();
        });
    }
}

// Start the player
if (video) {
    initPlayer();
} else {
    console.error("Could not find <video id='video'> in your index.html");
}

