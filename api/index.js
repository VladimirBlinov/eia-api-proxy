export default {
  async fetch(request, env) {

    const url = new URL(request.url);

    const cleanPath = url.pathname.replace(/^\/api/, '');
    
    // Заменяем адрес воркера на адрес API EIA
    //var targetUrl = "https://api.eia.gov" + url.pathname + url.search;
    var targetUrl = `https://www.eia.gov${cleanPath}${url.search}`;

    console.log(`[Request]: Path: ${url.pathname}`);
    console.log(`[Request]: Search: ${url.search}, SearchEnc: ${decodeURIComponent(url.search)}`);
    console.log(`[Request]: SearchEnc: ${decodeURIComponent(url.search)}`);
    console.log(`[Request]: targetUrl: ${targetUrl}`);

    const newRequest = new Request(targetUrl, {
      method: request.method,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/121.0.0.0",
        "Accept": "application/json",
      },
    });

    const response = await fetch(newRequest);
    console.log(`[Response]: status: ${response.status}`);
    
    const buffer = await response.arrayBuffer();

    // Логируем только если нужно, преобразуя кусочек байтов в текст
    const preview = new TextDecoder().decode(buffer.slice(-1000));
    console.log("Response Data Preview:", preview);

    var resp = new TextDecoder().decode(buffer);

    return new Response(JSON.stringify(resp), {
      headers: {
        'Content-Type': 'application/json',
      }
    });



  },
};
