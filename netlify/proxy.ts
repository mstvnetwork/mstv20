export default async (request: Request) => {
  const url = new URL(request.url).searchParams.get("url");

  if (!url) {
    return new Response("Missing URL parameter", { status: 400 });
  }

  try {
    const response = await fetch(url);
    const newResponse = new Response(response.body, response);
    
    // Required for hls.js to bypass CORS
    newResponse.headers.set("Access-Control-Allow-Origin", "*");
    newResponse.headers.set("Content-Type", "application/vnd.apple.mpegurl");
    
    return newResponse;
  } catch (err) {
    return new Response("Proxy Error", { status: 500 });
  }
};
