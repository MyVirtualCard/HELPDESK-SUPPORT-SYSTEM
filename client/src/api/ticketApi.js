import API from "./axios";

const getToken = () =>
  localStorage.getItem("token");



// ==============================
// CREATE TICKET
// ==============================

export const createTicketApi = async (
  formData
) => {

  const response = await API.post(
    "/tickets/create",
    formData,
    {
      headers: {
        Authorization:
          `Bearer ${getToken()}`,
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};



// ==============================
// GET CUSTOMER TICKETS
// ==============================

export const getMyTicketsApi =
  async () => {

    const response =
      await API.get(
        "/tickets/my-tickets",
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };



// ==============================
// GET SINGLE TICKET
// ==============================

export const getTicketByIdApi =
  async (ticketId) => {

    const response =
      await API.get(
        `/tickets/${ticketId}`,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };



// ==============================
// REPLY TICKET
// ==============================

export const replyTicketApi =
  async (ticketId, message) => {

    const response =
      await API.post(
        `/tickets/reply/${ticketId}`,
        { message },
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };



// ==============================
// REOPEN TICKET
// ==============================

export const reopenTicketApi =
  async (ticketId) => {

    const response =
      await API.put(
        `/tickets/reopen/${ticketId}`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };

  // api/ticketApi.js

export const customerReplyApi = async (
  ticketId,
  message
) => {

  const token =
    localStorage.getItem("token");

  const response = await API.put(
    `/tickets/customer-reply/${ticketId}`,
    { message },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};