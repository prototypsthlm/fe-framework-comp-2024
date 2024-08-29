import Main from './main';

// this is a server component, so the items are fetched server-side on load
export default async function Home() {
  const backendBaseUrl = "http://localhost:5247";
  const res = await fetch(`${backendBaseUrl}/Home/ListItems`);
  const items = await res.json();

  return (
    <Main defaultItems={items} backendBaseUrl={backendBaseUrl} />
  );
}
