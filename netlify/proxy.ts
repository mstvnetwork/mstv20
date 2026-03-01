export default async (request: Request) => {
  const url = new URL(request.url).searchParams.get("url");

  if (!url) {
    return new Response("Missing URL", { status: 400 });
  }

  try {
    const response = await fetch(url);
    const proxiedResponse = new Response(response.body, response);
    
    // Allow hls.js to read the video chunks
    proxiedResponse.headers.set("Access-Control-Allow-Origin", "*");
    proxiedResponse.headers.set("Content-Type", "application/vnd.apple.mpegurl");
    
    return proxiedResponse;
  } catch (err) {
    return new Response("Proxy Error", { status: 500 });
  }
};
