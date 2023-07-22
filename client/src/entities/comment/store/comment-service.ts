import httpService from "../../../shared/redux/services/http-service";
const commentEndpoint = "comment";

const commentService = {
  createComment: async (payload) => {
    const { data } = await httpService.post(commentEndpoint, payload);
    return data;
  },
  getComments: async (noteId) => {
    const { data } = await httpService.get(commentEndpoint, {
      params: {
        orderBy: "noteId",
        equalTo: `${noteId}`,
      },
    });
    return data;
  },
  removeComment: async (commentId) => {
    const { data } = await httpService.delete(commentEndpoint + commentId);
    return data;
  },
};
export default commentService;
