export default async function handler(request, response) {
  const targetRes = await fetch("https://xn----api-3venc0aa9bv5b9g2a.com");
  const data = await targetRes.text();
  response.status(200).send(data);
}
