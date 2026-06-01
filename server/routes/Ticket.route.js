import express from "express";

import {
  createTicket,
  getCustomerTickets,
  getAllTickets,
  getSingleTicket,
  replyTicket,
  updateTicketStatus,
  customerReply
} from "../controllers/Ticket.controller.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

import {
  authorizeRoles,
} from "../middleware/roleMiddleware.js";
import { uploadTicketFiles } from "../middleware/upload.js";

const router = express.Router();



// CUSTOMER
router.post(
  "/create",
  protect,
  authorizeRoles("customer"),
    uploadTicketFiles.array("attachments", 5),
  createTicket
);

router.get(
  "/my-tickets",
  protect,
  authorizeRoles("customer"),
  getCustomerTickets
);



// ADMIN + SUPPORT
router.get(
  "/all",
  protect,
  authorizeRoles(
    "admin",
    "support"
  ),
  getAllTickets
);



// COMMON
router.get(
  "/:id",
  protect,
  getSingleTicket
);

router.post(
  "/reply/:id",
  protect,
  replyTicket
);



// ADMIN + SUPPORT STATUS UPDATE
router.put(
  "/status/:id",
  protect,
  authorizeRoles(
    "admin",
    "support"
  ),
  updateTicketStatus
);

router.put(
  "/customer-reply/:id",
  protect,
  customerReply
);
export default router;