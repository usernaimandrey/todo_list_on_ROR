const extractAuthToken = () => {
  const user = JSON.parse(localStorage.getItem('userData'));
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
};

export default extractAuthToken;