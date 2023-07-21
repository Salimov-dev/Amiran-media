import httpService from "../../../shared/redux/services/http-service";
const noteEndpoint = "note/";

const noteService = {
  get: async () => {
    const { data } = await httpService.get(noteEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(noteEndpoint + "create", payload);
    return data;
  },
  remove: async (NoteId) => {
    const { data } = await httpService.delete(noteEndpoint + NoteId);
    return data;
  },
};
export default noteService;
