import React, { useEffect, useState } from "react";
import {
  Ticket,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  Send,
  X,
  User,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  getAllTicketsApi,
  updateTicketStatusApi,
  replyTicketApi
} from "../../../api/supportApi";
import socket from "../../../api/socket";
import {
  Bell,
  Search,
  UserCircle,
} from "lucide-react";
import logo from '../../../assets/ast_logo.png'
import {useNavigate} from 'react-router-dom'
const SupportDashboard = () => {
let navigate=useNavigate();
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [reply, setReply] = useState("");

const [showAttachmentModal,setShowAttachmentModal] =
useState(false);


  const fetchTickets = async () => {

    try {

      const res =
        await getAllTicketsApi();

      setTickets(res.tickets);

    } catch {

      toast.error(
        "Unable to load tickets"
      );
    }
  };



  useEffect(() => {

    fetchTickets();

  }, []);



  const handleStatusChange =
    async (id, status) => {

      try {

        await updateTicketStatusApi(
          id,
          status
        );

        toast.success(
          "Status updated"
        );

        fetchTickets();

      } catch {

        toast.error(
          "Update failed"
        );
      }
    };



const handleReply = async () => {

try{

if(!reply.trim()) return;

// await replyTicketApi(
// selectedTicket._id,
// reply
// );
const res = await replyTicketApi(
  selectedTicket._id,
  reply
);

setSelectedTicket(
  res.ticket
);

fetchTickets();
toast.success(
"Reply sent"
);

setReply("");

fetchTickets();

}catch(error){

toast.error(
"Reply failed"
)

}

};
const totalTickets =
tickets.length;

const openTickets =
tickets.filter(
(ticket)=>
ticket.status==="Open"
).length;

const resolvedTickets =
tickets.filter(
(ticket)=>
ticket.status==="Resolved"
).length;

const highPriorityTickets =
tickets.filter(
(ticket)=>
ticket.priority==="High"
).length;

const stats=[

{
title:"Total Tickets",
count:totalTickets,
icon:Ticket,
bg:"bg-cyan-500/20",
textColor:"text-cyan-400"
},

{
title:"Open",
count:openTickets,
icon:Clock3,
bg:"bg-yellow-500/20",
textColor:"text-yellow-400"
},

{
title:"Resolved",
count:resolvedTickets,
icon:CheckCircle2,
bg:"bg-green-500/20",
textColor:"text-green-400"
},

{
title:"High Priority",
count:highPriorityTickets,
icon:AlertTriangle,
bg:"bg-red-500/20",
textColor:"text-red-400"
}

];


const [currentTime,setCurrentTime]=
useState("");

const user=
JSON.parse(
localStorage.getItem("user")
);


useEffect(()=>{

const timer=setInterval(()=>{

setCurrentTime(

new Date().toLocaleTimeString(
[],
{
hour:"2-digit",
minute:"2-digit"
}
)

);

},1000);

return ()=>clearInterval(timer);

},[]);

const getStatusStyle = (status) => {

switch(status){

case "Open":
return {
bg:"bg-blue-500/15",
text:"text-blue-300",
border:"border-blue-500/20",
dot:"bg-blue-400"
};

case "In Progress":
return {
bg:"bg-yellow-500/15",
text:"text-yellow-300",
border:"border-yellow-500/20",
dot:"bg-yellow-400"
};

case "Resolved":
return {
bg:"bg-green-500/15",
text:"text-green-300",
border:"border-green-500/20",
dot:"bg-green-400"
};

case "Closed":
return {
bg:"bg-red-500/15",
text:"text-red-300",
border:"border-red-500/20",
dot:"bg-red-400"
};

default:

return {
bg:"bg-slate-500/15",
text:"text-slate-300",
border:"border-slate-500/20",
dot:"bg-slate-400"
};

}

};

const [isTyping, setIsTyping] = useState(false);

useEffect(() => {

  socket.on("typing", () => {

    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
    }, 2000);

  });

  return () => {
    socket.off("typing");
  };

}, []);
  return (

<div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white">


{/* NAVBAR */}

<div className="
sticky
top-0
z-50
border-b
border-white/10
bg-slate-950/80
backdrop-blur-2xl
shadow-lg
">

<div className="
max-w-[1800px]
mx-auto
px-2
sm:px-6
py-4
flex
items-center
justify-between
gap-6
">

{/* LEFT */}

<div className="flex justify-start place-items-center gap-2">

<div>

    <img onClick={()=>navigate('/')} src={logo} alt="logo" className="h-15 cursor-pointer object-cover" />
</div>
<div>

<h1 className="
text-lg
sm:text-2xl
font-extrabold
bg-gradient-to-r
from-cyan-400
to-blue-400
bg-clip-text
text-transparent
text-white
">

Support Dashboard

</h1>

<p className="text-slate-400 text-xs mt-1">

Manage customer requests in real time

</p>

</div>
</div>




{/* CENTER SEARCH */}

<div className="
hidden
lg:flex
items-center
relative
w-[400px]
">

<Search
size={20}
className="
absolute
left-4
text-slate-500
"
/>

<input
type="text"
placeholder="Search ticket, customer..."

className="
w-full
bg-white/5
border
border-white/10
rounded-2xl
py-3
pl-12
pr-4
text-white
outline-none
focus:border-cyan-400
transition-all
"
/>

</div>



{/* RIGHT */}

<div className="
flex
items-center
gap-2
">

{/* live */}

<div className="
hidden
md:flex
items-center
gap-2
bg-green-500/10
text-green-300
px-4
py-2
rounded-xl
">

<div className="
w-2
h-2
bg-green-400
rounded-full
animate-pulse
">
</div>

Online

</div>


{/* time */}

<div className="
hidden
md:flex
items-center
gap-2
bg-white/5
px-4
py-2
rounded-xl
">

<Clock3
size={18}
className="text-cyan-400"
/>

<span className="text-sm">

{currentTime}

</span>

</div>



{/* notification */}

<button
className="
relative
w-11
h-11
rounded-xl
bg-white/5
hover:bg-cyan-500/20
transition-all
flex
items-center
justify-center
"
>

<Bell/>

<span className="
absolute
top-1
right-1
w-3
h-3
bg-red-500
rounded-full
animate-ping
">
</span>

</button>



{/* profile */}

<div className="
flex
items-center
gap-3
bg-white/5
rounded-2xl
px-3
py-2
">

<div className="
w-10
h-10
rounded-full
bg-cyan-500/20
flex
items-center
justify-center
">

<UserCircle
size={24}
className="text-cyan-300"
/>

</div>

<div className="hidden md:block">

<p className="
font-semibold
text-sm
">

{user?.name}

</p>

<p className="
text-xs
text-slate-400
">

Support Agent

</p>

</div>

</div>

</div>

</div>

</div>



<div className="max-w-8xl mx-auto px-2 py-2 sm:px-6 sm:py-10">


{/* SUPPORT STATS */}

<div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-6">

{stats.map((item,index)=>{

const Icon=item.icon;

return(

<div
key={index}
className="
group
relative
overflow-hidden
bg-white/5
backdrop-blur-xl
border
border-white/10
rounded-[15px]
p-6
transition-all
duration-500
hover:-translate-y-2
hover:border-cyan-400/30
hover:shadow-2xl
hover:shadow-cyan-500/10
"
>

{/* animated glow */}

<div className="
absolute
top-0
right-0
w-32
h-32
rounded-full
blur-3xl
opacity-20
group-hover:opacity-40
transition-all
duration-500
bg-cyan-400
">
</div>


<div className="relative z-10">

{/* top row */}

<div className="flex justify-between items-start">

<div>

<p className="text-slate-400 text-sm font-medium">
{item.title}
</p>

<h2 className="text-4xl font-bold mt-3 text-white">
{item.count}
</h2>

</div>


<div
className={`
w-12
h-12
rounded-xl
flex
items-center
justify-center
${item.bg}
group-hover:scale-110
transition-all
duration-500
`}
>

<Icon
size={28}
className={item.textColor}
/>

</div>

</div>



{/* bottom section */}

<div className="flex justify-between items-center mt-2">

<div className="flex items-center gap-2">

<div className="
w-2
h-2
bg-green-400
rounded-full
animate-pulse
">
</div>

<span className="text-xs text-slate-400">

Live Data

</span>

</div>


<div className="
px-3
py-1
rounded-full
text-xs
font-medium
bg-green-500/10
text-green-300
">

+12%

</div>

</div>

</div>


{/* hover line */}

<div className="
absolute
bottom-0
left-0
h-[3px]
w-0
bg-cyan-400
group-hover:w-full
transition-all
duration-500
">
</div>

</div>

)

})}

</div>


{/* TABLE */}
{/* SUPPORT TICKETS */}

<div className="mt-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[15px] overflow-hidden">

  {/* HEADER */}

  <div className="p-6 border-b border-white/10">

    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

      <div>

        <h2 className="font-bold text-3xl text-white">
          Support Tickets
        </h2>

        <p className="text-slate-400 mt-1">
          Monitor and resolve customer requests
        </p>

      </div>

      {/* Search + count */}

      <div className="flex flex-col sm:flex-row gap-4">

        <input
          type="text"
          placeholder="Search Ticket ID..."
          className="bg-slate-900/80 border border-white/10 rounded-2xl px-5 py-3 outline-none text-white focus:border-cyan-400 w-full"
        />

        <div className="bg-cyan-500/20 text-cyan-300 px-5 py-3 rounded-2xl whitespace-nowrap text-center">
          {tickets.length} Tickets
        </div>

      </div>

    </div>

  </div>



  {/* TABLE */}

  <div className="overflow-x-auto">

    <table className="w-full min-w-[1000px]">

      <thead className="bg-slate-900/40">

        <tr className="text-slate-400 text-left">

          <th className="px-6 py-5">
            Ticket
          </th>

          <th className="px-6 py-5">
            Customer
          </th>

          <th className="px-6 py-5">
            Priority
          </th>

          <th className="px-6 py-5">
            Status
          </th>
<th className="px-6 py-5">
  Attachments
</th>
          <th className="px-6 py-5">
            Updated
          </th>

          <th className="px-6 py-5">
            Action
          </th>

        </tr>

      </thead>



      <tbody>

      {
      tickets.length > 0 ?

      tickets.map((ticket)=>(

      <tr
      key={ticket._id}
      className="border-t border-white/5 hover:bg-cyan-500/5 transition-all duration-300"
      >

      {/* TICKET */}

      <td className="px-6 py-5">

      <div>

      <p className="font-bold text-cyan-300">

      {ticket.ticketId}

      </p>

      <p className="text-sm text-slate-400 mt-1">

      {ticket.subject}

      </p>

      </div>

      </td>



      {/* CUSTOMER */}

      <td className="px-6 py-5">

      <div className="flex items-center gap-3">

      <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center font-bold">

      {
      ticket.customer?.name
      ?.charAt(0)
      }

      </div>

      <div>

      <p className="font-medium">

      {ticket.customer?.name}

      </p>

      <p className="text-xs text-slate-400">

      {ticket.customer?.email}

      </p>

      </div>

      </div>

      </td>



      {/* PRIORITY */}

      <td className="px-6 py-5">

      <span className={`px-4 py-2 rounded-full text-sm font-medium

      ${
      ticket.priority==="High"
      ?
      "bg-red-500/20 text-red-300"

      :

      ticket.priority==="Medium"

      ?

      "bg-yellow-500/20 text-yellow-300"

      :

      "bg-green-500/20 text-green-300"

      }

      `}>

      {ticket.priority}

      </span>

      </td>


{/* STATUS */}

<td className="px-6 py-5">

<div
className={`
flex
items-center
gap-2
w-fit
rounded-full
px-3
py-2
border
transition-all
duration-300
hover:scale-105

${getStatusStyle(ticket.status).bg}
${getStatusStyle(ticket.status).border}
`}
>

<div
className={`
w-2.5
h-2.5
rounded-full
animate-pulse
${getStatusStyle(ticket.status).dot}
`}
>
</div>

<select

value={ticket.status}

onChange={(e)=>
handleStatusChange(
ticket._id,
e.target.value
)
}

className={`
bg-transparent
outline-none
appearance-none
cursor-pointer
font-medium
px-2


${getStatusStyle(ticket.status).text}
`}

>

<option className="bg-slate-900">
Open 
</option>

<option className="bg-slate-900">
In Progress
</option>

<option className="bg-slate-900">
Resolved
</option>

<option className="bg-slate-900">
Closed
</option>

</select>

</div>

</td>
{/* ATTACHMENTS */}

<td className="px-6 py-5">

{
ticket.attachments?.length > 0 ? (
<>

<button

onClick={()=>{
setSelectedTicket(ticket);
setShowAttachmentModal(true);
}}

className="
group
flex
items-center
gap-2
px-4
py-2
rounded-xl
bg-cyan-500/10
hover:bg-cyan-500/20
border
border-cyan-500/20
transition-all
duration-300
"

>

<div className="
w-8
h-8
rounded-lg
bg-cyan-500/20
flex
items-center
justify-center
text-sm
">

📎

</div>

<div className="text-left">

<p className="
text-cyan-300
font-semibold
text-sm
">

{
ticket.attachments.length
}

File{
ticket.attachments.length > 1
? "s"
: ""
}

</p>

<p className="
text-xs
text-slate-400
">

Click to View

</p>

</div>

</button>
</>
)

:

(

<div className="
flex
items-center
gap-2
text-slate-500
text-sm
">

📄

<span>
No Files
</span>

</div>

)

}

</td>

      {/* UPDATED */}

      <td className="px-6 py-5">

      <div>

      <p className="text-sm">

      {
      new Date(
      ticket.updatedAt
      ).toLocaleDateString()
      }

      </p>

      <p className="text-xs text-slate-500">

      {
      new Date(
      ticket.updatedAt
      ).toLocaleTimeString()
      }

      </p>

      </div>

      </td>



      {/* ACTION */}

      <td className="px-6 py-5">

      <button

      onClick={()=>
      setSelectedTicket(
      ticket
      )
      }

      className="bg-cyan-500 hover:bg-cyan-400 px-5 py-3 rounded-xl text-black font-semibold transition-all duration-300 hover:scale-105"

      >

      Open Ticket

      </button>

      </td>


      </tr>

      ))

      :

      <tr>

      <td
      colSpan="7"
      className="py-16 text-center"
      >

      <div className="space-y-4">

      <div className="text-6xl">
      📭
      </div>

      <h3 className="text-xl font-bold">

      No Tickets Found

      </h3>

      <p className="text-slate-400">

      Customer requests will appear here

      </p>

      </div>

      </td>

      </tr>

      }

      </tbody>

    </table>

  </div>

</div>

</div>



{
selectedTicket && (

<div
className="
fixed
top-0
right-0
h-screen
w-full
xl:w-[720px]
bg-[#0B1120]
border-l
border-slate-800
z-50
flex
flex-col
shadow-[0_0_50px_rgba(0,0,0,0.5)]
"
>

{/* HEADER */}
<div
className="
sticky
top-0
z-30
bg-[#0B1120]
backdrop-blur-xl
border-b
border-slate-800
p-6
"
>

<div className="
flex
justify-between
items-center
">

<div>

<div className="
flex
items-center
gap-3
">

<h2 className="
text-xl
font-bold
text-white
">
{selectedTicket.ticketId}
</h2>

<span
className="
px-3
py-1
rounded-full
bg-green-500/20
text-green-400
text-xs
font-semibold
"
>
{selectedTicket.status}
</span>

</div>

<p className="
text-slate-400
mt-2
">
{selectedTicket.subject}
</p>

</div>

<button
onClick={() => setSelectedTicket(null)}
className="
w-11
h-11
rounded-xl
bg-slate-800
hover:bg-red-500/20
transition-all
flex justify-center place-items-center
"
>
<X size={18}/>
</button>

</div>

</div>


<div className="overflow-y-auto custom-scrollbar">
{/* CUSTOMER SECTION */}

<div className="
mx-4
mt-4
bg-gradient-to-r
from-cyan-500/10
to-slate-900
border
border-cyan-500/20
rounded-md
p-5
">

<div className="
flex
items-center
gap-4
">

<div className="
w-13
h-13
rounded-full
bg-cyan-500
text-black
font-bold
text-xl
flex
items-center
justify-center
">
{selectedTicket.customer?.name?.charAt(0)}
</div>

<div>

<h3 className="
font-bold
text-white
text-lg
">
{selectedTicket.customer?.name}
</h3>

<p className="
text-slate-400
">
{selectedTicket.customer?.email}
</p>

</div>

</div>

</div>

<div className="
grid
grid-cols-3
gap-4
px-4
mt-6
">

{[
{
title:"Department",
value:selectedTicket.department
},
{
title:"Priority",
value:selectedTicket.priority
},
{
title:"Replies",
value:selectedTicket.replies?.length || 0
}
].map((item,index)=>(
<div
key={index}
className="
bg-slate-900
border
border-slate-800
rounded-xl
p-4
"
>
<p className="
text-xs
text-slate-500
">
{item.title}
</p>

<h4 className="
mt-2
font-semibold
text-white
">
{item.value}
</h4>
</div>
))}
</div>


{
selectedTicket?.attachments?.length > 0 && (

<div className="px-6 pt-6">

<div className="
bg-white/5
border
border-white/10
rounded-xl
p-5
">

<div className="
flex
justify-between
items-center
mb-4
">

<h3 className="font-bold">
Attachments
</h3>

<span className="
px-3
py-1
rounded-full
bg-cyan-500/20
text-cyan-300
text-xs
">

{
selectedTicket.attachments.length
}
 Files

</span>

</div>

<div className="
grid
grid-cols-2
gap-4
">

{
selectedTicket.attachments.map(
(file,index)=>{

const isImage =
file.fileType?.startsWith("image");

const fileUrl =
`${import.meta.env.VITE_API_URL}${file.fileUrl}`;

return(

<a
key={index}
href={fileUrl}
target="_blank"
rel="noreferrer"
className="
bg-slate-900
rounded-2xl
overflow-hidden
border
border-white/10
"
>

{
isImage ? (

<img
src={fileUrl}
alt={file.fileName}
className="
w-full
h-32
object-cover
"
/>

) : (

<div className="
h-32
flex
items-center
justify-center
text-5xl
">
📄
</div>

)
}

<div className="p-3">

<p className="
text-xs
truncate
">
{file.fileName}
</p>

</div>

</a>

);

})
}

</div>

</div>

</div>

)
}

{/* CONVERSATION */}

<div className="
flex-1
p-6
space-y-5
">

<h3 className="
font-bold
text-lg
mb-2
">

Conversation

</h3>

{
selectedTicket?.replies?.length>0

?

selectedTicket.replies.map((item)=>(

<div
key={item._id}

className={`
flex

${
item.role==="customer"
?
"justify-start"
:
"justify-end"
}

`}
>

<div
className={`
max-w-[80%]
rounded-lg
p-2

${
item.role==="customer"

?

"bg-cyan-500/10 border border-cyan-500/20"

:

"bg-white/5 border border-white/10"

}

`}
>

<div className="
flex
items-center
gap-2
mb-2
">

<div className="
w-5
h-5
rounded-full
bg-cyan-500/20
flex
items-center
justify-center
font-semibold
text-xs
">

{
item.sender?.name
?.charAt(0)
}

</div>

<div>

<p className="
font-semibold
text-xs
">

{
item.sender?.name
}

</p>

<p className="
text-xs
text-slate-500
">

{
item.role
}

</p>

</div>

</div>


<p className="
text-sm
leading-7
text-slate-300
">

{
item.message
}

</p>


<p className="
text-right
text-xs
text-slate-500
mt-3
">

{
new Date(
item.createdAt
).toLocaleString()
}

</p>

</div>

</div>

))

:

<div className="
h-full
flex
justify-center
items-center
text-slate-500
">

No messages available

</div>

}

</div>

</div>



{/* REPLY FOOTER */}

<div className="
border-t
border-white/10
p-4
bg-slate-950
sticky
bottom-0
">

<div className="relative">

<textarea

value={reply}

onChange={(e)=>
setReply(e.target.value)
}

placeholder="
Reply to customer...
"

className="
w-full
bg-white/5
border
border-white/10
rounded-md
p-3
h-25
resize-none
outline-none
focus:border-cyan-400
"

/>

<button

onClick={handleReply}

className="
absolute
bottom-4
right-4
bg-cyan-400
hover:bg-cyan-300
text-black
px-6
py-3
rounded-2xl
font-bold
transition-all
hover:scale-105
"

>

<Send size={18}/>

</button>

</div>

</div>



<style>
{`

@keyframes slide{

from{

transform:
translateX(100%);
opacity:0;

}

to{

transform:
translateX(0);
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
w-full
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
w-15
h-15
rounded-xl
hover:bg-slate-100
transition-all
text-red-600
cursor-pointer
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
</div>

  );
};

export default SupportDashboard;