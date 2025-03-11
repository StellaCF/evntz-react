import React, {useState} from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../AuthContext'
import { auth } from '../../firebase'
import { signOut } from 'firebase/auth'
import { HomeIcon, CalendarDateRangeIcon, TicketIcon, UserCircleIcon, ArrowLeftStartOnRectangleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-toastify'
import axios from 'axios'
import Sidebar from '../Sidebar'

const Create = () => {

   const navigate = useNavigate();
   const {user, userDetails} = useAuth() || {};
   const currentUser = auth.currentUser;
 
   const handleLogout = async () => {
     try{
       await signOut(auth);
       toast.success("successfully logged out")
       navigate("/")
     } catch (error) {
       toast.error("failed to log out")
     }
   }
   const displayUserprofile = () => {
     navigate("/userprofile")
   }

   const [eventData, setEventData] = useState({
      title: "",
      description: "",
      medium: "online",
      meetLink: "",
      address: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      duration: "",
      category: "",
      organiser: "",
      image: null,
      tickets: [],
   });
   
   const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setEventData((prev) => ({
         ...prev,
         [name]: type === "checkbox" ? checked : value,
      }));
   };

   const handleFileChange = (e) => {
      const file = e.target.files[0]; // Get the selected file
      setEventData((prevData) => ({
         ...prevData,
         image: file, // Update the image field with the selected file
      }));
   };
   

   const handleTicketChange = (index, field, value) => {
      const updatedTickets = [...eventData.tickets];
      updatedTickets[index][field] = value;
      setEventData({ ...eventData, tickets: updatedTickets });
    };
  
    const addTicket = () => {
      setEventData({
        ...eventData,
        tickets: [...eventData.tickets, { name: '', price: '', quantity: '' }],
      });
    };
  
    const removeTicket = (index) => {
      const updatedTickets = eventData.tickets.filter((_, i) => i !== index);
      setEventData({ ...eventData, tickets: updatedTickets });
    };
   
   const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Event Data:", eventData);

      try{
         const formData = new FormData()
         formData.append("file", eventData.image);
         formData.append("upload_preset", "event_images_upload");
         formData.append("cloud_name", "dhjh9soip");

         const cloudinaryResponse = await axios.post(
            `https://api.cloudinary.com/v1_1/dhjh9soip/image/upload`,
            formData
         );

         const imageUrl = cloudinaryResponse.data.url;

         const newEvent = {
            userId: currentUser.uid,
            title: eventData.title,
            description: eventData.description,
            medium: eventData.medium,
            meetLink: eventData.medium === "online" ? eventData.meetLink : null,
            address: eventData.medium === "in-person" ? eventData.address : null,
            startDate: eventData.startDate,
            startTime: eventData.startTime,
            endDate: eventData.endDate,
            endTime: eventData.endTime,
            duration: eventData.duration,
            category: eventData.category,
            organiser: eventData.organiser,
            image: imageUrl,
            tickets: eventData.tickets || [],
            addedby: userDetails.name,
         }

         await axios.post("http://localhost:4000/events", newEvent);
         toast.success("Event created successfully!");
         setEventData({
            title: "",
            description: "",
            medium: "online",
            meetLink: "",
            address: "",
            startDate: "",
            startTime: "",
            endDate: "",
            endTime: "",
            duration: "",
            category: "",
            organiser: "",
            image: null,
            tickets: [],
         })
      } catch(error) {
         console.error("Error creating event:", error);
         toast.error("Failed to create event.");
      }
   };
   

  return (
    <div>
      <div className="h-screen flex sticky">
         <Sidebar />
        <main className='w-4/5 mx-auto overflow-y-auto scrollbar-hide'>
            <Link onClick={() => navigate(-1)} className='flex mt-4 gap-1 px-4 '> <ArrowLeftIcon className='size-6'/>Back </Link>
            <h3 className='mt-6 text-2xl font-bold px-4 text-cyan-950'>CREATE EVENT</h3>
            <form onSubmit={handleSubmit} className="space-y-8 my-6 w-full sm: w-full px-1">
               {/* Event Title */}
               <div>
                  <label className="block text-md font-medium text-gray-700">Event Title</label>
                  <input
                     type="text"
                     name="title"
                     value={eventData.title}
                     onChange={handleChange}
                     required
                     className="w-full p-2 border border-gray-300 rounded"
                     placeholder="Enter event title"
                  />
               </div>

               {/* Event Description */}
               <div>
                  <label className="block text-md font-medium text-gray-700">Event Description</label>
                  <textarea
                     name="description"
                     value={eventData.description}
                     onChange={handleChange}
                     required
                     className="w-full p-2 border border-gray-300 rounded"
                     placeholder="Enter event description"
                     rows="4"
                  ></textarea>
               </div>

               {/* Event Medium */}
               <div>
                  <label className="block text-md font-medium text-gray-700">Event Medium</label>
                  <select
                     name="medium"
                     value={eventData.medium}
                     onChange={handleChange}
                     required
                     className="w-full p-2 border border-gray-300 rounded"
                  >
                     <option className='bg-[#eb0d66]' value="online">Online</option>
                     <option value="in-person">In Person</option>
                  </select>
               </div>

               {/* Conditional Fields for Online Events */}
               {eventData.medium === "online" && (
                  <div className="space-y-4">
                     <div>
                     <label className="block text-md font-medium text-gray-700">Meet Link</label>
                     <input
                        type="url"
                        name="meetLink"
                        value={eventData.meetLink}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter meeting link"
                     />
                     </div>
                  </div>
               )}

               {/* Conditional Fields for In-Person Events */}
               {eventData.medium === "in-person" && (
                  <div className="space-y-4">
                     <div>
                     <label className="block text-md font-medium text-gray-700">Location Name</label>
                     <input
                        type="text"
                        name="address"
                        value={eventData.address}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter location name"
                     />
                     </div>
                  </div>
               )}

               {/* Event Start Date and Time */}
               <div>
                  <label className="block text-md font-medium text-gray-700">Event Start Date and Time</label>
                  <div className="flex gap-4">
                     <input
                     type="date"
                     name="startDate"
                     value={eventData.startDate}
                     onChange={handleChange}
                     required
                     className="w-1/2 p-2 border border-gray-300 rounded"
                     />
                     <input
                     type="time"
                     name="startTime"
                     value={eventData.startTime}
                     onChange={handleChange}
                     required
                     className="w-1/2 p-2 border border-gray-300 rounded"
                     />
                  </div>
               </div>

               {/* Event End Date and Time */}
               <div>
                  <label className="block text-md font-medium text-gray-700">Event End Date and Time</label>
                  <div className="flex gap-4">
                     <input
                     type="date"
                     name="endDate"
                     value={eventData.endDate}
                     onChange={handleChange}
                     required
                     className="w-1/2 p-2 border border-gray-300 rounded"
                     />
                     <input
                     type="time"
                     name="endTime"
                     value={eventData.endTime}
                     onChange={handleChange}
                     required
                     className="w-1/2 p-2 border border-gray-300 rounded"
                     />
                  </div>
               </div>

               {/* Event Duration */}
               <div>
                  <label className="block text-md font-medium text-gray-700">Event Duration (hours)</label>
                  <input
                     type="number"
                     name="duration"
                     value={eventData.duration}
                     onChange={handleChange}
                     required
                     className="w-full p-2 border border-gray-300 rounded"
                     placeholder="Enter duration in hours"
                  />
               </div>

               {/* Event Category */}
               <div>
                  <label className="block text-md font-medium text-gray-700">Event Category</label>
                  <input
                     type="text"
                     name="category"
                     value={eventData.category}
                     onChange={handleChange}
                     required
                     className="w-full p-2 border border-gray-300 rounded"
                     placeholder="Enter event category"
                  />
               </div>

               <div>
                  <label className="block text-md font-medium text-gray-700">Event Organiser</label>
                  <input
                     type="text"
                     name="organiser"
                     value={eventData.organiser}
                     onChange={handleChange}
                     required
                     className="w-full p-2 border border-gray-300 rounded"
                     placeholder="Enter event title"
                  />
               </div>

               <div>
                  <h3 className="text-xl font-semibold mb-2">Tickets</h3>
                  {eventData.tickets.map((ticket, index) => (
                  <div key={index} className="border p-4 mb-4 rounded">
                     <label className="block mb-2 font-medium">Ticket Name</label>
                     <input
                        type="text"
                        value={ticket.name}
                        onChange={(e) => handleTicketChange(index, 'name', e.target.value)}
                        className="w-full p-2 border rounded mb-4"
                        placeholder="Enter ticket name"
                        required
                     />

                     <label className="block mb-2 font-medium">Ticket Price</label>
                     <input
                        type="number"
                        value={ticket.price}
                        onChange={(e) => handleTicketChange(index, 'price', e.target.value)}
                        className="w-full p-2 border rounded mb-4"
                        placeholder="Enter ticket price"
                        required
                     />

                     <label className="block mb-2 font-medium">Number Available</label>
                     <input
                        type="number"
                        value={ticket.quantity}
                        onChange={(e) => handleTicketChange(index, 'quantity', e.target.value)}
                        className="w-full p-2 border rounded mb-4"
                        placeholder="Enter number available"
                        required
                     />

                     <button
                        type="button"
                        onClick={() => removeTicket(index)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                     >
                        Remove Ticket
                     </button>
                  </div>
                  ))}

                  <button
                  type="button"
                  onClick={addTicket}
                  className="w-full bg-cyan-950 text-white py-2 px-4 rounded-md hover:bg-cyan-800 mb-6"
                  >
                  Add Ticket
                  </button>
               </div>

               {/* Feature Image Upload */}
               <div>
                  <label className="block text-md font-medium text-gray-700">Feature Image</label>
                  <input
                     type="file"
                     name="image"
                     onChange={handleFileChange}
                     accept="image/*"
                     className="w-full p-2 border border-gray-300 rounded"
                  />
               </div>

               {/* Submit Button */}
               <button
                  type="submit"
                  className=" bg-[#eb0d66] text-white py-2 px-4 rounded"
               >
                  Create Event
               </button>
            </form>
         </main>
    </div>
   </div>
  )
}

export default Create
