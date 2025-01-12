export const contactUs = async (data) => {
    return axiosInstance.post("api/users/contactus", data);
  };