const backendBaseUrl = "http://localhost:5247";

export async function load({ fetch }) {
  const res = await fetch(`${backendBaseUrl}/Home/ListItems`);
  const items = await res.json();

  return { items, backendBaseUrl };
}
