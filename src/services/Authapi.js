const BASEURL = "http://127.0.0.1:8000/";
const localdata = localStorage.getItem("user");
const userData = JSON.parse(localdata);

export async function loginUser(credencials) {
  const res = await fetch(`${BASEURL}login/`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(credencials),
  });
  const data = await res.json();
  // console.log(data);

  return data;
}

export async function getCurrentUser() {
  const res = await fetch(`${BASEURL}user/${userData.user}`);
  const data = await res.json();

  //   console.log(data.token);
  return data;
}
