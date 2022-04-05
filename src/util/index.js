export const isAdmin = () => {
  const userLoggedIn = JSON.parse(localStorage.getItem("user")) || {};
  return userLoggedIn.type === "admin";
};

export const userLoggedIn = JSON.parse(localStorage.getItem("user")) || {};
