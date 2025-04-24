
 export const setToken = (token: string) => {
  localStorage.setItem("token", token);
  localStorage.setItem("lastLoginTime", new Date().getDate().toString());
};

export const getToken = () => {
  const now = new Date(Date.now()).getTime();
  const timeAllowed = 1000 * 60 * 30;
  const lastLoginTime = localStorage.getItem("lastLoginTime");
  const token = localStorage.getItem("token");
  if (lastLoginTime && token && now - parseInt(lastLoginTime) < timeAllowed) {
    return token;
  }
  return null;
};
export   const deleteToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("lastLoginTime");
};