import API from "./axios";


// ============================
// GET TOKEN
// ============================

const getToken = () => {
  return localStorage.getItem("token");
};



// ============================
// COMMON HEADERS
// ============================

const authHeaders = () => {
  return {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  };
};



// ============================
// GET ALL TICKETS
// SUPPORT / ADMIN
// ============================

export const getAllTicketsApi =
async () => {

  const response = await API.get(
    "/tickets/all",
    authHeaders()
  );

  return response.data;
};



// ============================
// GET SINGLE TICKET
// ============================

export const getSingleTicketApi =
async (ticketId) => {

  const response = await API.get(
    `/tickets/${ticketId}`,
    authHeaders()
  );

  return response.data;
};



// ============================
// UPDATE STATUS
// ============================

export const updateTicketStatusApi =
async (ticketId, status) => {

  const response =
  await API.put(

    `/tickets/status/${ticketId}`,

    {
      status
    },

    authHeaders()

  );

  return response.data;
};




// ============================
// REPLY TICKET
// ============================

export const replyTicketApi =
async (ticketId, message) => {

  const response =
  await API.post(

    `/tickets/reply/${ticketId}`,

    {
      message
    },

    authHeaders()

  );

  return response.data;
};




// ============================
// ASSIGN TICKET
// FUTURE
// ============================

export const assignTicketApi =
async (
ticketId,
agentId
) => {

  const response =
  await API.put(

    `/tickets/assign/${ticketId}`,

    {
      agentId
    },

    authHeaders()

  );

  return response.data;
};




// ============================
// DELETE TICKET
// FUTURE
// ============================

export const deleteTicketApi =
async (ticketId) => {

  const response =
  await API.delete(

    `/tickets/${ticketId}`,

    authHeaders()
  );

  return response.data;
};