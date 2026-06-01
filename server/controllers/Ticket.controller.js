
import TicketModel from "../models/TicketModel.js";
import UserModel from "../models/User.model.js";
const generateTicketId = () => {
  return (
    "TKT-" +
    Math.floor(
      100000 + Math.random() * 900000
    )
  );
};



// ===================================
// CREATE TICKET
// ===================================

// export const createTicket = async (
//   req,
//   res
// ) => {

//   try {

//     const {
//       subject,
//       department,
//       priority,
//       message,
//     } = req.body;

//     if (
//       !subject ||
//       !department ||
//       !message
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields required",
//       });
//     }

//     const ticket =
//       await TicketModel.create({

//         ticketId: generateTicketId(),

//         customer: req.user.id,

//         subject,
//         department,
//         priority,
//         message,

//       });

//     return res.status(201).json({
//       success: true,
//       message:
//         "Ticket created successfully",
//       ticket,
//     });

//   } catch (error) {

//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: "Ticket creation failed",
//     });
//   }
// };
// ===================================
// CREATE TICKET
// ===================================

export const createTicket = async (
  req,
  res
) => {
  try {

    const {
      subject,
      department,
      priority,
      message,
    } = req.body;

    // ==========================
    // VALIDATION
    // ==========================

    if (!subject?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Subject is required",
      });
    }

    if (!department) {
      return res.status(400).json({
        success: false,
        message: "Department is required",
      });
    }

    if (!message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    // ==========================
    // ATTACHMENTS
    // ==========================

    let attachments = [];

    if (req.files?.length > 0) {

      attachments = req.files.map(
        (file) => ({
          fileName: file.originalname,

          fileUrl:
            `/uploads/tickets/${file.filename}`,

          fileType: file.mimetype,

          fileSize: file.size,
        })
      );

    }

    // ==========================
    // CREATE TICKET
    // ==========================

    const ticket =
      await TicketModel.create({

        ticketId: generateTicketId(),

        customer: req.user.id,

        subject: subject.trim(),

        department,

        priority:
          priority || "Medium",

        message: message.trim(),

        attachments,

      });

    // ==========================
    // POPULATE CUSTOMER
    // ==========================

    const populatedTicket =
      await TicketModel.findById(
        ticket._id
      )
        .populate(
          "customer",
          "name email"
        );

    // ==========================
    // RESPONSE
    // ==========================

    return res.status(201).json({
      success: true,

      message:
        "Support ticket created successfully",

      ticket: populatedTicket,
    });

  } catch (error) {

    console.error(
      "CREATE TICKET ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to create support ticket",
    });
  }
};


// ===================================
// CUSTOMER TICKETS
// ===================================

// export const getCustomerTickets =
//   async (req, res) => {

//     try {

//       const tickets =
//         await TicketModel.find({
//           customer: req.user.id,
//         }).sort({ createdAt: -1 });


//       return res.status(200).json({
//         success: true,
//         tickets,
//       });

//     } catch (error) {

//       return res.status(500).json({
//         success: false,
//         message: "Failed to fetch tickets",
//       });
//     }
//   };

export const getCustomerTickets = async (req, res) => {
  try {

    const tickets = await TicketModel.find({
      customer: req.user.id,
    })
      .populate(
        "customer",
        "name email phone profileImage"
      )
      .populate(
        "assignedTo",
        "name email"
      )
      .populate(
        "replies.sender",
        "name email"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      tickets,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Failed to fetch tickets",
    });

  }
};

// ===================================
// ALL TICKETS (ADMIN/SUPPORT)
// ===================================

export const getAllTickets =
  async (req, res) => {

    try {

      const tickets =
        await TicketModel.find()
          .populate(
            "customer",
            "name email"
          )
          .populate(
            "assignedTo",
            "name email"
          )
          .sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        tickets,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: "Failed to fetch tickets",
      });
    }
  };



// ===================================
// SINGLE TICKET
// ===================================

export const getSingleTicket =
  async (req, res) => {

    try {

      const ticket =
        await TicketModel.findById(
          req.params.id
        )
          .populate(
            "customer",
            "name email"
          )
          .populate(
            "replies.sender",
            "name role"
          );

      if (!ticket) {
        return res.status(404).json({
          success: false,
          message: "Ticket not found",
        });
      }

      return res.status(200).json({
        success: true,
        ticket,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: "Failed",
      });
    }
  };



// ===================================
// REPLY TICKET
// ===================================

// export const replyTicket =
//   async (req, res) => {

//     try {

//       const { message } = req.body;

//       const ticket =
//         await TicketModel.findById(
//           req.params.id
//         );

//       if (!ticket) {
//         return res.status(404).json({
//           success: false,
//           message: "Ticket not found",
//         });
//       }

//       ticket.replies.push({
//         sender: req.user.id,
//         message,
//         role: req.user.role,
//       });

//       // STATUS AUTO UPDATE
//       if (
//         req.user.role === "customer"
//       ) {
//         ticket.status =
//           "Waiting Customer";
//       } else {
//         ticket.status =
//           "In Progress";
//       }

//       await ticket.save();

//       return res.status(200).json({
//         success: true,
//         message: "Reply added",
//       });

//     } catch (error) {

//       return res.status(500).json({
//         success: false,
//         message: "Reply failed",
//       });
//     }
//   };

// ===================================
// REPLY TICKET
// ===================================

export const replyTicket = async (
  req,
  res
) => {

  try {

    const { message } = req.body;

    if (!message?.trim()) {

      return res.status(400).json({
        success:false,
        message:"Reply message required"
      });

    }

    const ticket =
      await TicketModel.findById(
        req.params.id
      );

    if (!ticket) {

      return res.status(404).json({
        success:false,
        message:"Ticket not found"
      });

    }


    // Add new reply
    ticket.replies.push({

      sender:req.user.id,

      message,

      role:req.user.role,

      createdAt:new Date()

    });



    // Auto status handling
    if(
      req.user.role==="customer"
    ){

      ticket.status =
      "Open";

    }

    if(
      req.user.role==="support" ||
      req.user.role==="admin"
    ){

      ticket.status =
      "In Progress";

    }


    await ticket.save();



    // Return updated populated data
    const updatedTicket =
      await TicketModel.findById(
        ticket._id
      )

      .populate(
        "customer",
        "name email"
      )

      .populate(
        "replies.sender",
        "name role"
      );



    return res.status(200).json({

      success:true,

      message:"Reply added successfully",

      ticket:updatedTicket

    });


  } catch(error){

    console.log(
      "Reply Error:",
      error
    );

    return res.status(500).json({

      success:false,

      message:"Reply failed"

    });

  }

};

// ===================================
// UPDATE STATUS
// ===================================

export const updateTicketStatus =
  async (req, res) => {

    try {

      const { status } = req.body;

      const ticket =
        await TicketModel.findById(
          req.params.id
        );

      if (!ticket) {
        return res.status(404).json({
          success: false,
          message: "Ticket not found",
        });
      }

      ticket.status = status;

      await ticket.save();

      return res.status(200).json({
        success: true,
        message:
          "Status updated successfully",
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: "Status update failed",
      });
    }
  };

  // ===================================
// CUSTOMER REPLY
// ===================================

export const customerReply = async (
  req,
  res
) => {

  try {

    const { message } = req.body;

    if (!message?.trim()) {

      return res.status(400).json({
        success: false,
        message: "Reply message is required",
      });

    }

    const ticket =
      await TicketModel.findById(
        req.params.id
      );

    if (!ticket) {

      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });

    }

    // Customer can reply only to own ticket

    if (
      ticket.customer.toString() !==
      req.user.id
    ) {

      return res.status(403).json({
        success: false,
        message:
          "Unauthorized access to ticket",
      });

    }

    // Add Reply

    ticket.replies.push({

      sender: req.user.id,

      message: message.trim(),

      role: "customer",

      createdAt: new Date(),

    });

    // Re-open ticket if already resolved

    if (
      ticket.status === "Resolved" ||
      ticket.status === "Closed"
    ) {

      ticket.status = "Open";

    }

    await ticket.save();

    const updatedTicket =
      await TicketModel.findById(
        ticket._id
      )
        .populate(
          "customer",
          "name email"
        )
        .populate(
          "replies.sender",
          "name role"
        );

    return res.status(200).json({

      success: true,

      message:
        "Reply sent successfully",

      ticket: updatedTicket,

    });

  } catch (error) {

    console.log(
      "CUSTOMER REPLY ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Failed to send reply",

    });

  }

};