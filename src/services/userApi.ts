import api from "./api";

export const userApi = {
  /** Update data sekolah user yang sedang login. */
  updateSchoolData: async (data: {
    schoolName: string;
    className: string;
  }) => {
    const response = await api.put("/auth/users", data);
    return response.data;
  },
};
