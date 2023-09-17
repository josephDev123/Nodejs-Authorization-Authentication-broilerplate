export function getCookie(cookieName: string) {
  const cookieString = decodeURIComponent(document.cookie);
  console.log(cookieString);
  const cookies = cookieString.split("; ");

  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    console.log(name, value);
    if (name === cookieName) {
      return value;
    }
  }

  return null; // Cookie not found
}
