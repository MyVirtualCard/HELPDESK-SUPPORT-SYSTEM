import React, { useEffect, useRef, useState } from "react";
import {
  Plus,
  Send,
  Ticket,
  Clock3,
  AlertTriangle,
  CheckCircle2,
  MessageSquare,
  User,
  Layers3,
  SendHorizontalIcon,
  ArrowBigDown,
  ArrowDown,
} from "lucide-react";
import { createTicketApi, getMyTicketsApi,customerReplyApi } from "../../../api/ticketApi";
import toast from "react-hot-toast";
import {
LayoutDashboard,
PlusSquare,
BookOpen,
Bell,
LogOut,
Menu,
X
} from "lucide-react";
import socket from "../../../api/socket";
import { Link, useLocation,useNavigate } from "react-router-dom";
const CustomerDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
const [files, setFiles] = useState([]);
const [dragActive, setDragActive] =
useState(false);
const [selectedTicket, setSelectedTicket] = useState(null);
const [showMessagesModal, setShowMessagesModal] =
  useState(false);
const [replyMessage, setReplyMessage] =
  useState("");
const handleFileChange = (e) => {

const selectedFiles =
Array.from(e.target.files);

const validFiles =
selectedFiles.filter(
(file)=>
file.size <=
10 * 1024 * 1024
);

setFiles([
...files,
...validFiles
]);

};
  const [ticketData, setTicketData] = useState({
    subject: "",
    category: "Technical Support",
    priority: "Medium",
    description: "",
  });
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    try {
      const res = await getMyTicketsApi();
      setTickets(res.tickets);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchTickets();
    };

    loadData();
  }, []);

  const handleChange = (e) => {
    setTicketData({
      ...ticketData,
      [e.target.name]: e.target.value,
    });
      setReplyMessage(e.target.value);

  socket.emit("typing", {
    ticketId: selectedTicket._id,
    user: customer._id,
  });

  };
const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    setLoading(true);

    const formData = new FormData();

    formData.append(
      "subject",
      ticketData.subject
    );

    formData.append(
      "department",
      ticketData.category
    );

    formData.append(
      "priority",
      ticketData.priority
    );

    formData.append(
      "message",
      ticketData.description
    );

    files.forEach((file) => {
      formData.append(
        "attachments",
        file
      );
    });

    const res =
      await createTicketApi(
        formData
      );

    toast.success(
      res.message ||
      "Ticket created successfully"
    );

    fetchTickets();

    setTicketData({
      subject: "",
      category: "Technical Support",
      priority: "Medium",
      description: "",
    });

    setFiles([]);

    setShowForm(false);

  } catch (error) {
console.log(error)
    toast.error(
      error?.response?.data?.message ||
      "Ticket creation failed"
    );

  } finally {

    setLoading(false);

  }
};

  const totalTickets = tickets.length;

  const openTickets = tickets.filter(
    (ticket) => ticket.status === "Open",
  ).length;

  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status === "Resolved",
  ).length;

  const highPriorityTickets = tickets.filter(
    (ticket) => ticket.priority === "High",
  ).length;
const dashboardCards=[

{
title:"Total Tickets",
count:totalTickets,
icon:Ticket,

bgColor:"bg-[#DBEAFE]",
textColor:"text-[#2563EB]",
accent:"bg-[#2563EB]"
},

{
title:"Open Tickets",
count:openTickets,
icon:Clock3,

bgColor:"bg-[#FEF3C7]",
textColor:"text-[#D97706]",
accent:"bg-[#F59E0B]"
},

{
title:"Resolved",
count:resolvedTickets,
icon:CheckCircle2,

bgColor:"bg-[#DCFCE7]",
textColor:"text-[#16A34A]",
accent:"bg-[#16A34A]"
},

{
title:"High Priority",
count:highPriorityTickets,
icon:AlertTriangle,

bgColor:"bg-[#FEE2E2]",
textColor:"text-[#DC2626]",
accent:"bg-[#DC2626]"
}

];
const navigate=useNavigate();

const location=useLocation();

const [openSidebar,setOpenSidebar]=
useState(false);



const menus=[

{
name:"Dashboard",
icon:LayoutDashboard,
path:"/customer-dashboard"
},

{
name:"My Tickets",
icon:Ticket,
path:"/my-tickets"
},

{
name:"Create Ticket",
icon:PlusSquare,
path:"/create-ticket"
},

{
name:"Knowledge Base",
icon:BookOpen,
path:"/knowledge-base"
},

{
name:"Notifications",
icon:Bell,
path:"/notifications",
badge:3
}

];

const [showAttachmentModal,setShowAttachmentModal] =
useState(false);
const [isTyping, setIsTyping] = useState(false);
const messagesEndRef = useRef();

const handleCustomerReply = async () => {

  setIsTyping(true);
  try {

    if (!replyMessage.trim()) {
      return toast.error(
        "Please enter a message"
      );
    }

    const res =
      await customerReplyApi(
        selectedTicket._id,
        replyMessage
      );

    toast.success(
      res.message ||
      "Reply sent successfully"
    );

    setReplyMessage("");

    // refresh tickets

    await fetchTickets();

    // update currently opened ticket

    const updatedTicket =
      tickets.find(
        (item) =>
          item._id ===
          selectedTicket._id
      );



  setTimeout(() => {
    setIsTyping(false);
  }, 1500);
    if (updatedTicket) {
      setSelectedTicket(
        updatedTicket
      );
    }

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to send reply"
    );

  }
};
useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [selectedTicket?.replies]);

const [showIssueDetails, setShowIssueDetails] =
  useState(false);

  const handleLogout = () => {
  
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  
    navigate("/login");
  
  };
  return (
    <div
      className="
min-h-screen
flex
bg-[#F4F7FC]
text-slate-800
custom-scrollbar
"
    >

{/* MOBILE MENU */}

<button

onClick={()=>
setOpenSidebar(true)
}

className="
lg:hidden
fixed
top-2
left-0
z-50
w-9
h-9
rounded-sm
bg-[#fff]
text-black
flex
items-center
justify-center

"
>

<Menu/>

</button>
{/* SIDEBAR */}

<div className={`

fixed
lg:sticky
top-0
left-0
z-50
h-screen
w-[280px]
bg-[#0F172A]
text-white
border-r
border-slate-800
flex
flex-col
transition-all
duration-300

${openSidebar
? "translate-x-0"
: "-translate-x-full lg:translate-x-0"
}

`}>

{/* TOP */}

<div className="
h-[85px]
border-b
border-slate-800
px-6
flex
items-center
justify-between
">

<Link to='/'>

<h1 className="
text-3xl
font-black
tracking-wide
">

Aristostech


</h1>

<p className="
text-xs
text-slate-400
mt-1
">

Customer Helpdesk

</p>

</Link>


{/* close mobile */}

<button
onClick={()=>
setOpenSidebar(false)
}
className="
lg:hidden
w-10
h-10
rounded-xl
hover:bg-slate-800
flex
items-center
justify-center
"
>

<X/>

</button>

</div>






{/* MENU */}

<div className="
flex-1
overflow-y-auto
p-4
space-y-2
mt-4
">

{
menus.map((item,index)=>{

const Icon=item.icon;

const isActive=
location.pathname===
item.path;

return(

<button

key={index}

onClick={()=>{
navigate(item.path);
setOpenSidebar(false);
}}

className={`

w-full
flex
items-center
justify-between
px-5
py-4
rounded-md
transition-all
duration-300
group

${
isActive

?

"bg-gray-600 text-white shadow-lg"

:

"hover:bg-slate-800 text-slate-300"

}

`}

>

<div className="
flex
items-center
gap-4
">

<div className={`
transition-all

${isActive
? "scale-110"
: "group-hover:scale-110"
}
`}>

<Icon size={22}/>

</div>

<span className="
font-medium
">

{item.name}

</span>

</div>



{/* badge */}

{
item.badge && (

<div className="
w-7
h-7
rounded-full
bg-red-500
text-white
text-xs
font-bold
flex
items-center
justify-center
">

{item.badge}

</div>

)

}

</button>

)

})
}

</div>


{/* USER CARD */}

<div className="
mx-4
mt-5
bg-slate-800/60
border
border-slate-700
rounded-sm
p-4
">

<div className="
flex
items-center
gap-4
">

<div className="
w-14
h-14
rounded-xl
bg-cyan-500/20
text-cyan-300
flex
items-center
justify-center
font-bold
text-xl
">

{
user?.name?.charAt(0)
}

</div>


<div>

<h3 className="
font-bold
text-lg
">

{user?.name}

</h3>

<p className="
text-sm
text-slate-400
">

Customer Account

</p>

</div>

</div>

</div>

{/* FOOTER */}

<div className="
border-t
border-slate-800
p-4
">

<button

onClick={()=>{
handleLogout();
}}

className="
w-full
flex
items-center
gap-4
px-5
py-4
rounded-2xl
hover:bg-red-500/10
text-red-400
transition-all
duration-300
"

>

<LogOut size={22}/>

Logout

</button>

</div>

</div>
{
openSidebar && (

<div

onClick={()=>
setOpenSidebar(false)
}

className="
fixed
inset-0
bg-black/50
z-40
lg:hidden
"
/>

)
}
      <div
        className="
flex-1
overflow-auto
"
      >
        {/* NAVBAR */}

        <div
          className="
bg-white
h-[10vh]
border-b
border-slate-200
flex
sm:flex-row
flex-col
gap-5
items-center
justify-between
px-8
sm:sticky
sm:top-0
relative
z-40

"
        >
          <div>
            <h2
              className="
text-2xl
font-bold
text-slate-800
"
            >
              Customer Support Portal
            </h2>

            <p
              className="
text-slate-500
text-sm
mt-1
"
            >
              Track and manage your support requests
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="
bg-[#0F172A]
hover:bg-slate-800
text-white
px-6
py-3
rounded-sm
font-semibold
flex
items-center
gap-3
transition-all
duration-300
hover:scale-105
"
          >
            <Plus size={18} />
            Raise Ticket
          </button>
        </div>
        {/* MAIN */}
        <div className="max-w-8xl mx-auto px-2 sm:px-6 py-10 mt-10 sm:mt-0">
   


{/* DASHBOARD STATS */}

<div className="
grid
grid-cols-2
md:grid-cols-4
2xl:grid-cols-4
gap-7
">

{
dashboardCards.map((card,index)=>{

const Icon=card.icon;

return(

<div
key={index}

className="
group
relative
overflow-hidden
bg-white
rounded-lg
border
border-slate-200
shadow-sm
hover:shadow-2xl
hover:shadow-slate-200/80
transition-all
duration-500
hover:-translate-y-2
"
>

{/* top accent */}

<div className={`
absolute
top-0
left-0
w-full
h-1.5

${card.accent}
`}>
</div>



{/* background glow */}

<div className="
absolute
top-[-30px]
right-[-30px]
w-[140px]
h-[140px]
rounded-full
bg-slate-100
opacity-50
group-hover:scale-125
transition-all
duration-700
">
</div>



<div className="
relative
z-10
p-4
">

{/* top */}

<div className="
flex
justify-between
items-start
">

<div>

<p className="
text-slate-500
text-sm
font-medium
tracking-wide
uppercase
">

{card.title}

</p>

<h2 className="
text-5xl
font-black
text-[#0F172A]
mt-4
tracking-tight
">

{card.count}

</h2>

</div>



{/* icon */}

<div className={`
w-16
h-16
rounded-[22px]
flex
items-center
justify-center
transition-all
duration-500
group-hover:scale-110

${card.bgColor}
`}>

<Icon
size={30}
className={card.textColor}
/>

</div>

</div>



</div>

</div>

)

})
}

</div>
          {/* RECENT SUPPORT TICKETS */}

          <div
            className="
mt-10
bg-white
rounded-xl
border
border-slate-300
shadow-sm
overflow-hidden
"
          >
            {/* HEADER */}

            <div
              className="
px-4
py-2
border-b
border-slate-300
flex
flex-col
lg:flex-row
lg:items-center
lg:justify-between
gap-5
"
            >
              <div>
                <h2
                  className="
text-2xl
font-bold
text-slate-800
"
                >
                  Recent Support Tickets
                </h2>

                <p
                  className="
text-slate-500
mt-2
"
                >
                  Track and manage your latest support requests
                </p>
              </div>

              {/* RIGHT SECTION */}

              <div
                className="
flex
items-center
gap-4
"
              >
                {/* live */}

                <div
                  className="
flex
items-center
gap-2
bg-green-50
text-green-600
px-4
py-2
rounded-lg
text-sm
font-medium
border
border-green-100
"
                >
                  <div
                    className="
w-2
h-2
rounded-full
bg-green-500
animate-pulse
"
                  ></div>
                  Live Updates
                </div>

                {/* count */}

                <div
                  className="
bg-slate-100
text-slate-700
px-4
py-2
rounded-xl
text-sm
font-semibold
"
                >
                  {tickets.length} Tickets
                </div>
              </div>
            </div>

            {/* TABLE */}

            <div className="overflow-x-auto">
              <table
                className="
w-full
min-w-[900px]
"
              >
                <thead
                  className="
bg-slate-50
border-b
border-slate-300
"
                >
                  <tr>
                                        <th
                      className="
px-8
py-5
text-left
text-sm
font-semibold
text-slate-500
"
                    >
                      S.NO
                    </th>

                    <th
                      className="
px-8
py-5
text-left
text-sm
font-semibold
text-slate-500
"
                    >
                      Ticket
                    </th>

                    <th
                      className="
px-8
py-5
text-left
text-sm
font-semibold
text-slate-500
"
                    >
                      Subject
                    </th>

                    <th
                      className="
px-8
py-5
text-left
text-sm
font-semibold
text-slate-500
"
                    >
                      Status
                    </th>

                    <th
                      className="
px-8
py-5
text-left
text-sm
font-semibold
text-slate-500
"
                    >
                      Priority
                    </th>
<th
className="
px-8
py-5
text-left
text-sm
font-semibold
text-slate-500
"
>
Attachments
</th>
<th
className="
px-8
py-5
text-left
text-sm
font-semibold
text-slate-500
"
>
Messages
</th>
                    <th
                      className="
px-8
py-5
text-left
text-sm
font-semibold
text-slate-500
"
                    >
                      Created
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {tickets.length > 0 ? (
                    tickets.map((ticket,index) => (
                      <tr
                        key={ticket._id}
                        className="
border-b
border-slate-200
hover:bg-slate-50
transition-all
duration-300
"
                      >
                                                <td className="pl-10 py-6">
                       {index+1}
                        </td>
                        {/* TICKET ID */}

                        <td className="px-4 py-6">
                          <div
                            className="
flex
items-center
gap-1
"
                          >
                            <div
                              className="
w-10
h-10
rounded-2xl
bg-cyan-50
text-cyan-600
flex
items-center
justify-center
font-bold
text-sm
"
                            >
                              <Ticket size={20} />
                            </div>

                            <div>
                              <p
                                className="
font-bold
text-slate-800
"
                              >
                                {ticket.ticketId}
                              </p>

                              <p
                                className="
text-xs
text-slate-500
mt-1
"
                              >
                                Support Request
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* SUBJECT */}

                        <td className="px-4 py-6">
                          <div>
                            <p
                              className="
font-semibold
text-slate-700
"
                            >
                              {ticket.subject}
                            </p>

                            <p
                              className="
text-sm
text-slate-500
mt-1
line-clamp-1
"
                            >
                              {ticket.message}
                            </p>
                          </div>
                        </td>

                        {/* STATUS */}

                        <td className="px-4 py-6">
                          <span
                            className={`
inline-flex
items-center
gap-2
px-4
py-2
rounded-full
text-sm
font-semibold

${
  ticket.status === "Resolved"
    ? "bg-green-50 text-green-700 border border-green-100"
    : ticket.status === "In Progress"
      ? "bg-yellow-50 text-yellow-700 border border-yellow-100"
      : "bg-cyan-50 text-cyan-700 border border-cyan-100"
}

`}
                          >
                            <div
                              className={`
w-2
h-2
rounded-full

${
  ticket.status === "Resolved"
    ? "bg-green-500"
    : ticket.status === "In Progress"
      ? "bg-yellow-500"
      : "bg-cyan-500"
}

`}
                            ></div>

                            {ticket.status}
                          </span>
                        </td>

                        {/* PRIORITY */}

                        <td className="px-4 py-6">
                          <span
                            className={`
px-4
py-2
rounded-full
text-sm
font-semibold

${
  ticket.priority === "High"
    ? "bg-red-50 text-red-700 border border-red-100"
    : ticket.priority === "Medium"
      ? "bg-yellow-50 text-yellow-700 border border-yellow-100"
      : "bg-green-50 text-green-700 border border-green-100"
}

`}
                          >
                            {ticket.priority}
                          </span>
                        </td>
<td className="px-4 py-6">

{
ticket.attachments?.length > 0 ? (

<button

onClick={()=>{
  console.log(ticket)
setSelectedTicket(ticket);
setShowAttachmentModal(true);
}}

className="
flex
items-center
gap-2
px-4
py-2
rounded-xl
bg-cyan-50
hover:bg-cyan-100
text-cyan-700
font-medium
transition-all
"

>

📎

{ticket.attachments.length}

File(s)

</button>

)

:

(

<span className="
text-slate-400
text-sm
">

No Files

</span>

)

}

</td>
<td className="px-4 py-6">

<button

onClick={()=>{
setSelectedTicket(ticket);
setShowMessagesModal(true);
}}

className="
flex
items-center
gap-2
px-4
py-2
rounded-xl
bg-blue-50
hover:bg-blue-100
text-blue-700
font-medium
transition-all
"

>

💬

{
ticket.replies?.length || 0
}

Messages

</button>

</td>
                        {/* DATE */}

                        <td className="px-8 py-6">
                          <div>
                            <p
                              className="
font-medium
text-slate-700
"
                            >
                              {new Date(ticket.createdAt).toLocaleDateString()}
                            </p>

                            <p
                              className="
text-xs
text-slate-500
mt-1
"
                            >
                              {new Date(ticket.createdAt).toLocaleTimeString()}
                            </p>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="
py-20
text-center
"
                      >
                        <div
                          className="
flex
flex-col
items-center
justify-center
"
                        >
                          <div
                            className="
w-24
h-24
rounded-full
bg-slate-100
flex
items-center
justify-center
text-4xl
"
                          >
                            📭
                          </div>

                          <h3
                            className="
mt-6
text-2xl
font-bold
text-slate-700
"
                          >
                            No Support Tickets Yet
                          </h3>

                          <p
                            className="
mt-3
text-slate-500
max-w-md
"
                          >
                            Your support requests will appear here once you
                            create a ticket.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

{/* CREATE TICKET MODAL */}

{
showForm && (

<div className="
fixed
sm:inset-0
left-0 top-0
bg-[#0F172A]/60
backdrop-blur-sm
flex
items-center
justify-center
z-999
sm:p-4
animate-[fade_0.2s_ease]
p-0
">

<div className="
w-full
max-w-6xl
sm:h-[95vh]
h-[100vh]

bg-white
rounded-lg
overflow-hidden
shadow-2xl
animate-[popup_0.3s_ease]
z-999
">

<div className="
grid
xl:grid-cols-[420px_1.1fr]
h-full
">

{/* LEFT FORM SIDE */}

<div className="
p-5
lg:p-5
overflow-y-auto
h-full
sm:order-2
order-1
custom-scrollbar
">


{/* HEADER */}

<div className="
flex
items-start
justify-between
mb-8
">

<div>

<h2 className="
text-4xl
font-black
text-[#0F172A]
tracking-tight
">

Raise Support Ticket

</h2>

<p className="
text-slate-500
mt-3
leading-7
max-w-xl
">

Submit your issue and our support team will respond as quickly as possible.

</p>

</div>


<button
onClick={()=>
setShowForm(false)
}

className="
w-12
h-12
rounded-2xl
bg-slate-100
hover:bg-red-50
hover:text-red-500
transition-all
flex
items-center
justify-center
"
>

<X/>

</button>

</div>



{/* FORM */}

<form
onSubmit={handleSubmit}
className="space-y-7"
>


{/* SUBJECT */}

<div>

<label className="
text-sm
font-semibold
text-slate-700
">

Issue Subject

</label>

<input

type="text"

name="subject"

value={ticketData.subject}

onChange={handleChange}

placeholder="
Example: Unable to login to dashboard
"

className="
w-full
mt-3
border
border-slate-300
rounded-xl
px-5
py-4
outline-none
focus:border-[#0F172A]
transition-all
text-slate-700
placeholder:text-slate-400
"

/>

</div>



{/* GRID */}

<div className="
grid
md:grid-cols-2
gap-6
">


{/* CATEGORY */}

<div>

<label className="
text-sm
font-semibold
text-slate-700
">

Department

</label>

<div className="relative mt-3">

<Layers3
className="
absolute
left-4
top-1/2
-translate-y-1/2
text-slate-400
w-5
h-5
"
/>

<select

name="category"

value={ticketData.category}

onChange={handleChange}

className="
w-full
border
border-slate-300
rounded-xl
pl-12
pr-5
py-4
outline-none
focus:border-[#0F172A]
appearance-none
bg-white
"

>

<option>
Technical Support
</option>

<option>
Billing
</option>

<option>
Sales
</option>

<option>
General
</option>

</select>

</div>

</div>



{/* PRIORITY */}

<div>

<label className="
text-sm
font-semibold
text-slate-700
">

Priority

</label>

<select

name="priority"

value={ticketData.priority}

onChange={handleChange}

className="
w-full
mt-3
border
border-slate-300
rounded-xl
px-5
py-4
outline-none
focus:border-[#0F172A]
bg-white
"

>

<option>
Low
</option>

<option>
Medium
</option>

<option>
High
</option>

</select>

</div>

</div>



{/* DESCRIPTION */}

<div>

<label className="
text-sm
font-semibold
text-slate-700
">

Issue Description

</label>

<textarea

rows="7"

name="description"

value={ticketData.description}

onChange={handleChange}

placeholder="
Describe your issue clearly with all required details...
"

className="
w-full
mt-3
border
border-slate-300
rounded-xl
px-5
py-5
outline-none
resize-none
focus:border-[#0F172A]
leading-7
"

/>

</div>

{/* ATTACHMENTS */}

<div>

<div className="
flex
items-center
justify-between
mb-3
">

<label className="
text-sm
font-semibold
text-slate-700
">

Attachments

</label>

{
files.length > 0 && (

<span className="
px-3
py-1
rounded-full
bg-cyan-100
text-cyan-700
text-xs
font-bold
">

{files.length} Files

</span>

)
}

</div>


<label

onDragOver={(e)=>{
e.preventDefault();
setDragActive(true);
}}

onDragLeave={()=>
setDragActive(false)
}

onDrop={(e)=>{
e.preventDefault();

setDragActive(false);

setFiles([
...files,
...Array.from(
e.dataTransfer.files
)
]);

}}

className={`

block
rounded-3xl
border-2
border-dashed
cursor-pointer
transition-all
duration-300
overflow-hidden

${
dragActive

?

"border-cyan-500 bg-cyan-50"

:

"border-slate-300 bg-slate-50 hover:border-cyan-500 hover:bg-cyan-50"

}

`}

>

<div className="
p-10
text-center
">

<div className="
w-20
h-20
mx-auto
rounded-3xl
bg-white
shadow-sm
flex
items-center
justify-center
text-4xl
">

📎

</div>


<h3 className="
mt-5
text-lg
font-bold
text-slate-800
">

Drop files here

</h3>

<p className="
text-slate-500
mt-2
">

or click to browse

</p>

<p className="
text-xs
text-slate-400
mt-4
">

PNG, JPG, PDF, ZIP, TXT

(Max 10MB each)

</p>

</div>


<input
type="file"
multiple
accept="
image/*,
application/pdf,
application/zip,
text/plain
"
className="hidden"
onChange={handleFileChange}
/>

</label>



{/* FILE LIST */}

{
files.length > 0 && (

<div className="
mt-5
space-y-3
">

{
files.map((file,index)=>{

const extension=
file.name
.split(".")
.pop()
.toUpperCase();

return(

<div
key={index}

className="
bg-white
border
border-slate-200
rounded-2xl
p-4
flex
items-center
justify-between
hover:shadow-md
transition-all
"
>

<div className="
flex
items-center
gap-4
">

<div className="
w-12
h-12
rounded-2xl
bg-slate-100
flex
items-center
justify-center
font-bold
text-slate-700
text-xs
">

{extension}

</div>

<div>

<h4 className="
font-semibold
text-slate-800
truncate
max-w-[250px]
">

{file.name}

</h4>

<p className="
text-xs
text-slate-500
mt-1
">

{
(
file.size /
1024 /
1024
).toFixed(2)
} MB

</p>

</div>

</div>



<button

type="button"

onClick={()=>

setFiles(

files.filter(
(_,i)=>
i!==index
)

)

}

className="
px-4
py-2
rounded-xl
bg-red-50
text-red-600
hover:bg-red-100
font-medium
transition-all
"

>

Remove

</button>

</div>

)

})
}

</div>

)

}

</div>


{/* FOOTER */}

<div className="
flex
flex-col
md:flex-row
md:items-center
md:justify-between
gap-5
pt-4
">

<div className="
flex
items-center
gap-4
">

<div className="
w-12
h-12
rounded-xl
bg-cyan-50
flex
items-center
justify-center
font-bold
text-cyan-600
">

{
user?.name?.charAt(0)
}

</div>

<div>

<p className="
font-semibold
text-slate-700
">

{user?.name}

</p>

<p className="
text-sm
text-slate-500
">

Customer Account

</p>

</div>

</div>



<button

type="submit"

disabled={loading}

className="
bg-[#0F172A]
hover:bg-slate-800
text-white
px-8
py-4
rounded-xl
font-bold
transition-all
duration-300
hover:scale-105
flex
items-center
gap-3
justify-center
min-w-[220px]
"

>

{
loading

?

<>

<div className="
w-5
h-5
border-2
border-white
border-t-transparent
rounded-full
animate-spin
">
</div>

Submitting...

</>

:

<>

<Send size={20}/>

Submit Ticket

</>

}

</button>

</div>

</form>

</div>



{/* RIGHT INFO PANEL */}

<div className="
bg-gradient-to-br
from-[#0F172A]
to-[#111C44]
text-white
p-8
hidden
xl:flex
flex-col
justify-between
relative
overflow-hidden
sm:order-1
order-2
custom-scrollbar
">
<div className="
absolute
top-[-100px]
right-[-100px]
w-[260px]
h-[260px]
bg-cyan-500/10
rounded-full
blur-3xl
">
</div>
<div>

<h3 className="
text-2xl
font-bold
">

Support Guidelines

</h3>

<p className="
text-slate-400
mt-3
leading-7
">

Provide detailed information for faster issue resolution.

</p>


<div className="
space-y-2
mt-2
">

{
[
{
title:"Attach Screenshots",
desc:"Upload images or files for faster debugging"
},

{
title:"Exact Error Message",
desc:"Mention precise errors you are facing"
},

{
title:"Detailed Information",
desc:"Describe steps to reproduce the issue"
},

{
title:"Correct Department",
desc:"Choose the proper support category"
}

].map((tip,index)=>(

<div
key={index}

className="
flex
gap-4
items-start
bg-white/5
border
border-white/10
rounded-2xl
p-4
backdrop-blur-sm
"
>

<div className="
min-w-[45px]
h-[45px]
rounded-2xl
bg-cyan-500/20
text-cyan-300
flex
items-center
justify-center
font-bold
">

✓

</div>

<div>

<h4 className="
font-semibold
text-lg
">

{tip.title}

</h4>

<p className="
text-slate-400
text-sm
leading-7
mt-1
">

{tip.desc}

</p>

</div>

</div>

))
}

</div>
</div>



<div className="
bg-white/5
rounded-xl
p-4
border
border-white/10
">

<p className="
text-sm
text-slate-400
">

Average Response Time

</p>

<h2 className="
text-2xl
font-black
mt-3
">

15 mins

</h2>

<p className="
text-sm
text-green-400
mt-3
">

Support Team Online

</p>

</div>

</div>

</div>

</div>



<style>

{`

@keyframes popup{

from{
transform:scale(.92);
opacity:0;
}

to{
transform:scale(1);
opacity:1;
}

}

@keyframes fade{

from{
opacity:0;
}

to{
opacity:1;
}

}

`}

</style>

</div>

)
}
{
showAttachmentModal &&
selectedTicket && (

<div
className="
fixed
inset-0
z-50
bg-black/60
backdrop-blur-sm
flex
items-center
justify-center
p-4
"
>

<div
className="
bg-white
w-full
max-w-6xl
max-h-[90vh]
rounded-md
overflow-hidden
shadow-2xl
flex
flex-col
"
>

{/* HEADER */}

<div
className="
p-6
border-b
border-slate-200
flex
items-center
justify-between
"
>

<div>

<h2
className="
text-2xl
font-bold
text-slate-800
"
>
Attachments
</h2>

<p
className="
text-slate-500
mt-1
"
>
{selectedTicket.ticketId}
</p>

</div>

<button
onClick={() =>
setShowAttachmentModal(false)
}
className="
w-10
h-10
rounded-xl
hover:bg-slate-100
transition-all
"
>
✕
</button>

</div>



{/* BODY */}

<div
className="
p-6
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
gap-5
overflow-y-auto
custom-scrollbar
"
>

{
selectedTicket?.attachments?.length > 0 ? (

selectedTicket.attachments.map(
(file,index)=>{

const fileUrl =
`${import.meta.env.VITE_API_URL}${file.fileUrl}`;

const isImage =
file.fileType?.startsWith(
"image"
);

const isPdf =
file.fileType?.includes(
"pdf"
);

return(

<div
key={index}
className="
bg-white
border
border-slate-200
rounded-xl
overflow-hidden
shadow-sm
hover:shadow-xl
transition-all
"
>

{/* PREVIEW */}

{
isImage ? (

<img
src={fileUrl}
alt={file.fileName}
className="
w-full
h-60
object-cover
"
/>

) : (

<div
className="
h-60
flex
items-center
justify-center
bg-slate-50
text-7xl
"
>

{
isPdf
? "📄"
: "📎"
}

</div>

)
}



{/* INFO */}

<div className="p-5">

<h3
className="
font-semibold
text-slate-800
truncate
"
>

{file.fileName}

</h3>

<p
className="
text-sm
text-slate-500
mt-2
"
>

{
(file.fileSize / 1024 / 1024)
.toFixed(2)
} MB

</p>



<div
className="
flex
gap-3
mt-5
"
>

<a
href={fileUrl}
target="_blank"
rel="noreferrer"
className="
flex-1
text-center
bg-[#0F172A]
hover:bg-slate-800
text-white
py-3
rounded-sm
font-medium
transition-all
"
>

View

</a>

<a
href={fileUrl}
download
className="
flex-1
text-center
bg-slate-100
hover:bg-slate-200
text-slate-700
py-3
rounded-sm
font-medium
transition-all
"
>

Download

</a>

</div>

</div>

</div>

);

})

) : (

<div
className="
col-span-full
h-[300px]
flex
items-center
justify-center
text-slate-500
text-lg
"
>

No Attachments Available

</div>

)

}

</div>

</div>

</div>

)
}


{
showMessagesModal &&
selectedTicket && (

<div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-0 sm:p-3">

  <div className="w-full max-w-7xl h-[100vh] sm:h-[95vh] bg-white sm:rounded-xl overflow-hidden shadow-2xl flex">

    {/* LEFT SIDEBAR */}

    <div className="hidden lg:flex w-[320px] border-r border-gray-300 bg-slate-50 flex-col">

      <div className="p-6 border-b border-gray-300">

        <div className="flex items-center gap-4">

          <div className="w-16 h-16 rounded-full bg-cyan-500 text-white flex items-center justify-center text-2xl font-bold">
            {selectedTicket.customer?.name?.charAt(0)}
          </div>

          <div>
            <h3 className="font-bold text-lg">
              {selectedTicket.customer?.name}
            </h3>

            <p className="text-sm text-slate-500">
              {selectedTicket.customer?.email}
            </p>
          </div>

        </div>

      </div>

      <div className="p-6 space-y-4 text-sm">

        <div>
          <p className="text-slate-500">
            Ticket ID
          </p>

          <p className="font-semibold">
            {selectedTicket.ticketId}
          </p>
        </div>

        <div>
          <p className="text-slate-500">
            Status
          </p>

          <span className="inline-flex px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
            {selectedTicket.status}
          </span>
        </div>

        <div>
          <p className="text-slate-500">
            Subject
          </p>

          <p className="font-medium">
            {selectedTicket.subject}
          </p>
        </div>

      </div>

    </div>

    {/* CHAT AREA */}

    <div className="flex-1 flex flex-col">

      {/* HEADER */}

      <div className="h-[12vh] border-b border-gray-300 bg-white px-2 sm:px-6 flex items-center justify-between">

<div className="flex items-center gap-4">

  <div className="
    h-12
    w-12
    rounded-full
    bg-cyan-500
    flex
    items-center
    justify-center
    text-white
    font-bold
  ">
    {selectedTicket.customer?.name?.charAt(0)}
  </div>

  <div>

    <h2 className="font-bold text-lg">
      {selectedTicket.customer?.name}
    </h2>

    <p className="text-sm text-green-500">
      ● Active Support Ticket
    </p>

  </div>

</div>

        <button
          onClick={() => setShowMessagesModal(false)}
          className="w-11 h-11 rounded-xl hover:bg-slate-100 transition"
        >
          ✕
        </button>

      </div>

 

{/* ORIGINAL CUSTOMER REQUEST */}
 <div className="border-b border-slate-200 bg-gradient-to-r from-violet-50 to-amber-50">

  {/* HEADER */}

  <button
    onClick={() =>
      setShowIssueDetails(
        !showIssueDetails
      )
    }
    className="
      w-full
      px-6
      py-4
      flex
      items-center
      justify-between
      hover:bg-white/40
      transition
    "
  >

    <div className="flex items-center gap-4">

      <div
        className="
        w-11
        h-11
        rounded-xl
        bg-violet-500
        text-white
        flex
        items-center
        justify-center
      "
      >
        📝
      </div>

      <div className="text-left">

        <div className="flex items-center gap-2">

          <h4 className="
            font-bold
            text-slate-800
          ">
            Original Issue
          </h4>

          <span
            className="
            px-2
            py-1
            rounded-full
            text-[10px]
            font-medium
            bg-amber-100
            text-amber-700
          "
          >
            Customer Request
          </span>

        </div>

        <p className="
          text-sm
          text-slate-600
          truncate
          max-w-[600px]
        ">
          {selectedTicket.subject}
        </p>

      </div>

    </div>

    {/* ARROW */}

    <div
      className={`
      text-xl
      text-slate-500
      transition-transform
      duration-300
      ${
        showIssueDetails
          ? "rotate-180"
          : ""
      }
      `}
    >
   <ArrowDown/>
    </div>

  </button>

  {/* EXPANDED CONTENT */}

  <div
    className={`
      overflow-hidden
      transition-all
      duration-300
      ${
        showIssueDetails
          ? "max-h-[500px] opacity-100"
          : "max-h-0 opacity-0"
      }
    `}
  >

    <div className="px-6 pb-5">

      <div className="
        bg-white
        border
        border-violet-200
        rounded-2xl
        p-5
        shadow-sm
      ">

        <h5 className="
          font-semibold
          text-slate-800
          mb-3
        ">
          Subject
        </h5>

        <p className="
          text-slate-700
          mb-5
        ">
          {selectedTicket.subject}
        </p>

        <h5 className="
          font-semibold
          text-slate-800
          mb-3
        ">
          Description
        </h5>

        <p className="
          text-slate-600
          whitespace-pre-wrap
          leading-relaxed
        ">
          {selectedTicket.message}
        </p>

      </div>

      <div className="
        mt-3
        flex
        items-start
        gap-2
        bg-blue-50
        border
        border-blue-200
        rounded-xl
        p-3
      ">

        <span>ℹ️</span>

        <p className="
          text-xs
          text-slate-600
        ">
          This is the original customer request submitted when the ticket was created.
        </p>

      </div>

    </div>

  </div>

</div>

    {/* CHAT BODY */}

<div
  className="
  flex-1
  overflow-y-auto
  bg-gradient-to-b
  from-slate-50
  to-slate-100
  px-6
  py-6
  "
>

  {
    selectedTicket.replies?.length > 0
      ? (
        <div className="space-y-6" ref={messagesEndRef}>

          {/* Conversation Started */}

          <div className="flex justify-center my-4">

            <div className="
              px-4
              py-2
              rounded-full
              bg-white
              text-slate-500
              text-xs
              shadow-sm
              border
              border-gray-400
            ">
              Conversation Started
            </div>

          </div>

          {
            selectedTicket.replies.map((msg) => (

              <div
                key={msg._id}
                className={`
                flex items-end gap-3
                ${
                  msg.role === "customer"
                    ? "justify-end"
                    : "justify-start"
                }
                `}
              >


                {/* SUPPORT AVATAR */}

                {
                  msg.role !== "customer" && (
                    <div
                      className="
                      w-10
                      h-10
                      rounded-full
                      bg-indigo-500
                      text-white
                      flex
                      items-center
                      justify-center
                      font-semibold
                      shrink-0
                      "
                    >
                      S
                    </div>
                  )
                }
                {/* MESSAGE */}

                <div
                  className="
                  flex
                  flex-col
                  max-w-[75%]
                  "
                >

                  <div
                    className={`
                    px-5
                    py-4
                    shadow-sm
                    relative
                    ${
                      msg.role === "customer"
                        ? `
                        bg-violet-400
                        text-white
                        rounded-2xl
                        rounded-br-md
                        `
                        : `
                        bg-white
                        text-slate-800
                        rounded-2xl
                        rounded-bl-md
                        border
                        border-gray-300
                        `
                    }
                    `}
                  >

                    <div className="
                      flex
                      items-center
                      gap-2
                      mb-2
                    ">

                      <span className="
                        text-sm
                        font-semibold
                      ">
                        {msg.sender?.name}
                      </span>

                      <span className="
                        text-[10px]
                        px-2
                        py-0.5
                        rounded-full
                        bg-black/10
                      ">
                        {
                          msg.role === "customer"
                            ? "Customer"
                            : "Support"
                        }
                      </span>

                    </div>

                    <p className="
                      leading-relaxed
                      whitespace-pre-wrap
                      break-words
                    ">
                      {msg.message}
                    </p>

                  </div>

                  <span className="
                    text-xs
                    text-slate-400
                    mt-1
                    px-2
                    "
                  >
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>

                </div>

                {/* CUSTOMER AVATAR */}

                {
                  msg.role === "customer" && (
                    <div
                      className="
                      w-10
                      h-10
                      rounded-full
                      bg-violet-400
                      text-white
                      flex
                      items-center
                      justify-center
                      font-semibold
                      shrink-0
                      "
                    >
                      {msg.sender?.name?.charAt(0)}
                    </div>
                  )
                }

              </div>

            ))
          }

          {/* Typing Indicator */}

          {
            isTyping && (
              <div className="flex items-center gap-3">

                <div
                  className="
                  w-10
                  h-10
                  rounded-full
                  bg-indigo-500
                  text-white
                  flex
                  items-center
                  justify-center
                  "
                >
                  S
                </div>

                <div className="
                  bg-white
                  border
                  px-5
                  py-4
                  rounded-3xl
                  shadow-sm
                ">

                  <div className="flex gap-1">

                    <span className="animate-bounce">•</span>
                    <span className="animate-bounce delay-100">•</span>
                    <span className="animate-bounce delay-200">•</span>

                  </div>

                </div>

              </div>
            )
          }

        </div>
      )
      : (
        <div className="
          h-full
          flex
          items-center
          justify-center
        ">

          <div className="text-center">

            <div className="
              w-24
              h-24
              rounded-full
              bg-white
              shadow
              flex
              items-center
              justify-center
              mx-auto
              mb-5
              text-5xl
            ">
              💬
            </div>

            <h3 className="
              text-xl
              font-bold
              text-slate-700
            ">
              No Messages Yet
            </h3>

            <p className="
              text-slate-500
              mt-2
            ">
              Send a message to start chatting with support.
            </p>

          </div>

        </div>
      )
  }

</div>

      {/* FOOTER */}

      <div className="border-t border-gray-300 bg-white p-5">

        <div className="flex gap-4">

          <textarea
            value={replyMessage}
            onChange={(e) =>
              setReplyMessage(e.target.value)
            }
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey
              ) {
                e.preventDefault();
                handleCustomerReply();
              }
            }}
            placeholder="Type your message..."
            className="
            flex-1
            h-[50px]
            border
            border-gray-300
            rounded-xs
            px-4
            py-2
            resize-none
            focus:outline-none
            
            focus:border-gray-400
            
            "
          />

          <button
            onClick={handleCustomerReply}
            className="
            px-8
            bg-green-700
            hover:bg-green-800
            text-white
            rounded-xs
            font-semibold
            transition
            flex justify-center gap-4 place-items-center
            "
          >
            <SendHorizontalIcon/>
            Send
          </button>

        </div>

      </div>

    </div>

  </div>

</div>

)
}
      {/* Animation */}
      <style>
        {`
          @keyframes popup {
            from {
              opacity: 0;
              transform: scale(0.9);
            }

            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  );
};

export default CustomerDashboard;
