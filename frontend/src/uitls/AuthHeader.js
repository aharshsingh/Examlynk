export const AuthHeader = () => {
    const token = localStorage.getItem('UserToken');
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };
  