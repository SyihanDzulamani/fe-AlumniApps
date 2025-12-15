export const registerAlumni = async (data) => {
  return fetch("http://localhost:3000/inputAlumni", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};
