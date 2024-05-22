const BASEURL = "http://127.0.0.1:8000/";
const localdata = localStorage.getItem("user");
const userData = JSON.parse(localdata);

// ////////////////////////////////////////////////////////////////////////////

// USER API

// ////////////////////////////////////////////////////////////////////////////

export async function getUsers() {
  const res = await fetch(`${BASEURL}users/`);
  const data = await res.json();

  return data;
}

export async function getUserSites() {
  const res = await fetch(`${BASEURL}sites/${userData.user}`);
  const data = await res.json();

  return data;
}

export async function createUsers(info) {
  const res = await fetch(`${BASEURL}signup/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${userData.token}`,
    },
    body: JSON.stringify(info),
  });
  const data = await res.json();

  return data;
}

export async function updateUsers(info) {
  const res = await fetch(`${BASEURL}edit-user/${info.id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${userData.token}`,
    },
    body: JSON.stringify(info),
  });
  const data = await res.json();

  return data;
}

export async function deleteUsers(info) {
  const res = await fetch(`${BASEURL}edit-user/${info}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${userData.token}`,
    },
  });

  res.message;
}
// ////////////////////////////////////////////////////////////////////////////

// STUDY API

// ////////////////////////////////////////////////////////////////////////////
export async function getStudies() {
  const res = await fetch(`${BASEURL}studies/`);
  const data = await res.json();

  return data;
}

export async function createStudies(info) {
  const res = await fetch(`${BASEURL}create-study/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${userData.token}`,
    },
    body: JSON.stringify(info),
  });
  const data = await res.json();

  return data;
}

export async function updateStudy(info) {
  const res = await fetch(`${BASEURL}edit-study/${info.courseId}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${userData.token}`,
    },
    body: JSON.stringify(info),
  });
  const data = await res.json();

  return data;
}

export async function deleteStudy(info) {
  const res = await fetch(`${BASEURL}edit-study/${info}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${userData.token}`,
    },
  });
  res.message;
}

// ////////////////////////////////////////////////////////////////////////////

// SITE API

// ////////////////////////////////////////////////////////////////////////////

export async function getSites() {
  const res = await fetch(`${BASEURL}site/`);
  const data = await res.json();

  return data;
}

export async function createSites(siteDetails) {
  const res = await fetch(`${BASEURL}create-site/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${userData.token}`,
    },
    body: JSON.stringify(siteDetails),
  });
  const data = await res.json();

  return data;
}

export async function updateSites(siteDetails) {
  const res = await fetch(`${BASEURL}edit-site/${siteDetails.id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${userData.token}`,
    },
    body: JSON.stringify(siteDetails),
  });
  const data = await res.json();

  return data;
}

export async function deleteSites(siteDetails) {
  const res = await fetch(`${BASEURL}edit-site/${siteDetails}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${userData.token}`,
    },
    // body: JSON.stringify(siteDetails),
  });
  res.message;
}

// ////////////////////////////////////////////////////////////////////////////

// MODULE API

// ////////////////////////////////////////////////////////////////////////////

export async function getModules() {
  const res = await fetch(`${BASEURL}module/`);
  const data = await res.json();

  return data;
}

export async function createModules(moduleDetails) {
  const res = await fetch(`${BASEURL}create-module/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${userData.token}`,
    },
    body: JSON.stringify(moduleDetails),
  });
  const data = await res.json();

  return data;
}

export async function updateModules(moduleDetails) {
  const res = await fetch(`${BASEURL}edit-module/${moduleDetails.id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${userData.token}`,
    },
    body: JSON.stringify(moduleDetails),
  });
  const data = await res.json();

  return data;
}

export async function deleteModules(moduleDetails) {
  const res = await fetch(`${BASEURL}edit-module/${moduleDetails}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${userData.token}`,
    },
  });
  res.message;
}

// ////////////////////////////////////////////////////////////////////////////

// video Api

// ////////////////////////////////////////////////////////////////////////////

export async function getVideos() {
  const res = await fetch(`${BASEURL}videos/`);
  const data = await res.json();

  return data;
}

export async function uploadVideos(videoData) {
  const formData = new FormData();

  formData.append("video", videoData.video);
  formData.append("module", videoData.module);

  const res = await fetch(`${BASEURL}videos/`, {
    method: "POST",
    headers: {
      // "content-type": "multipart/form-data",
      Authorization: `Token ${userData.token}`,
    },
    body: formData,
  });
  const data = await res.json();

  return data;
}

export async function updateVideos(video) {
  const res = await fetch(`${BASEURL}video/${video.id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${userData.token}`,
    },
    body: JSON.stringify(video),
  });
  const data = await res.json();

  return data;
}
// ////////////////////////////////////////////////////////////////////////////

// Content Api

// ////////////////////////////////////////////////////////////////////////////
export async function getContents() {
  const res = await fetch(`${BASEURL}content/`);
  const data = await res.json();

  return data;
}

export async function createContents(content) {
  const res = await fetch(`${BASEURL}content/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${userData.token}`,
    },
    body: JSON.stringify(content),
  });
  const data = await res.json();

  return data;
}

// ////////////////////////////////////////////////////////////////////////////

// Image Api

// ////////////////////////////////////////////////////////////////////////////

export async function getImages() {
  const res = await fetch(`${BASEURL}images/`);
  const data = await res.json();

  return data;
}

export async function uplaodImages(imageData) {
  const formData = new FormData();

  formData.append("image", imageData.image);
  formData.append("module", imageData.module);
  const res = await fetch(`${BASEURL}images/`, {
    method: "POST",
    // headers: {
    //   "content-type": "application/json",
    //   Authorization: `Token ${userData.token}`,
    // },
    body: formData,
  });
  const data = await res.json();

  return data;
}

// ////////////////////////////////////////////////////////////////////////////

// Progress Api

// ////////////////////////////////////////////////////////////////////////////

export async function getProgress() {
  const res = await fetch(`${BASEURL}progress/`);
  const data = await res.json();

  return data;
}

export async function createProgress(progressData) {
  const res = await fetch(`${BASEURL}progress/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${userData.token}`,
    },
    body: JSON.stringify(progressData),
  });
  const data = await res.json();

  return data;
}

export async function updateProgress(progressData) {
  const res = await fetch(`${BASEURL}progress/${progressData.id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${userData.token}`,
    },
    body: JSON.stringify(progressData),
  });
  const data = await res.json();

  return data;
}

// ////////////////////////////////////////////////////////////////////////////

// Google Drive Api

// ////////////////////////////////////////////////////////////////////////////

export async function driveApiUpload() {
  const res = await fetch("");
  const data = await res.json();

  return data;
}
