// Do NOT use standard Node.js imports. Deno/Netlify doesn't need them.
export default async (request: Request) => {
  const url = new URL(request.url).searchParams.get("url");

  if (!url) {
    return new Response("Missing URL parameter", { status: 400 });
  }

  try {
    const response = await fetch(url);
    const proxiedResponse = new Response(response.body, response);
    
    // CRITICAL: These headers allow hls.js to read the video
    proxiedResponse.headers.set("Access-Control-Allow-Origin", "*");
    proxiedResponse.headers.set("Content-Type", "application/vnd.apple.mpegurl");
    
    return proxiedResponse;
  } catch (err) {
    return new Response("Edge Proxy Error", { status: 500 });
  }
};
