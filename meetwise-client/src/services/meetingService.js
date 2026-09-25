import api from "./api";

const meetingService = {
  getMeetings: async () => {
    const response = await api.get("/meetings");
    return response.data;
  },

  getMeeting: async (id) => {
    const response = await api.get(`/meetings/${id}`);
    return response.data;
  },

  createMeeting: async (meetingData) => {
    const response = await api.post("/meetings", meetingData);
    return response.data;
  },
};

export default meetingService;