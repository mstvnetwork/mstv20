export default async (request, context) => {
  const url = new URL(request.url).searchParams.get("url");
  if (!url) return new Response("Missing URL", { status: 400 });

  // Fetch the stream while "faking" the Tulnit identity
  const response = await fetch(url, {
    headers: {
      "Referer": "https://tulnit.com",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
  });

  // Create a new response that allows YOUR website to see the data (CORS)
  const newResponse = new Response(response.body, response);
  newResponse.headers.set("Access-Control-Allow-Origin", "*");
  newResponse.headers.set("Content-Type", "application/vnd.apple.mpegurl");
  
  return newResponse;
};

export const config = { path: "/proxy" };
