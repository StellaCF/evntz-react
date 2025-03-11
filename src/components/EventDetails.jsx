import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserCircleIcon, CalendarIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const EventDetails = () => {

   const location = useLocation();
   const { event } = location.state || {};
   // const [ticketCount, setTicketCount] = useState(1);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isModal2Open, setIsModal2Open] = useState(false)

   const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };

    const toggleModal2 = () => {
      setIsModal2Open(!isModal2Open);
    };
 
   if (!event) {
     return <p>Event not found!</p>;
   }

   const [countDown, setCountDown] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
   })

   const targetDate = new Date(event.startDate).getTime();

   useEffect(() => {
      const calculateTime = () => {
         
         const currentDate = new Date().getTime();

         const timeLeft = targetDate - currentDate;

         if(timeLeft > 0) {
            setCountDown({
               days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)), //to get the remaining days, divide the remaining time by 1 day in seconds, ie total seconds in a day (1000*60*60*24)
               hours: Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
               minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
               seconds: Math.floor((timeLeft % (1000 * 60)) / (1000))
            })
         } else {
            setCountDown({
               days: 0,
               hours: 0,
               minutes: 0,
               seconds: 0
            })
         }
      }

      calculateTime()
      const interval = setInterval(calculateTime, 1000)
      return () => clearInterval(interval)

   }, [event.startData]);


   const [ticketCounts, setTicketCounts] = useState(
   event.tickets.map(() => 0)
   );

   const increaseTicketCount = (index) => {
   const updatedCounts = [...ticketCounts];
   updatedCounts[index] += 1;
   setTicketCounts(updatedCounts);
   };

   const decreaseTicketCount = (index) => {
   const updatedCounts = [...ticketCounts];
   if (updatedCounts[index] > 0) {
      updatedCounts[index] -= 1;
      setTicketCounts(updatedCounts);
   }
   };


   const totalPrice = ticketCounts.reduce(
   (total, count, index) => total + count * event.tickets[index].price,
   0
   );

   const handleClickOutside = (e) => {
      if(e.target.classList.contains("cta")) {
         toggleModal2(false);
         toggleModal(false);
      }
   }

   const handleBookEvent = async (event) => {
      const auth = getAuth();
      const db = getFirestore();
      const currentUser = auth.currentUser;
    

    
      const userId = currentUser.uid;
      const userBookingsRef = doc(db, "userBookings", userId);
    
      try {
        // Check if the user already has bookings
        const userDoc = await getDoc(userBookingsRef);
    
        if (userDoc.exists()) {
          // Update the existing booking list
          const existingBookings = userDoc.data().bookings || [];
          await updateDoc(userBookingsRef, {
            bookings: [...existingBookings, event],
          });
        } else {
          // Create a new booking list
          await setDoc(userBookingsRef, {
            bookings: [event],
          });
        }
        toast.success("EVENT BOOKED")
      } catch (error) {
        console.error("Error booking event:", error.message);
        toast.error("FAILED TO BOOK EVENT")
      }
    };


    const handleBookBtn = async () => {
      try {
      //   // Check if no tickets are available for the event
      //   const noAvailableTickets = event.tickets.every((ticket) => ticket.totalTickets === 0);
      //   if (noAvailableTickets) {
      //     // If no tickets are available, call handleBookEvent
      //     handleBookEvent();
      //     return;
      //   }
    
        // Check if event has tickets but none are selected
        if (event.tickets && event.tickets.length > 0) {
          const noTicketsSelected = event.tickets.some((ticket, index) => ticketCounts[index] === 0);
          if (noTicketsSelected) {
            toast.error("Please add tickets before booking the event.");
            return;
          }
        }
    
        // If tickets are available and selected, open the modal
        toggleModal();
      } catch (error) {
        console.error("Error handling book button:", error);
        toast.error("Something went wrong. Please try again.");
      }
    };
    
    
    

  return (
   <div className="w-4/5 mx-auto mt-10">
      <h1 className="text-3xl font-bold">{event.title}</h1>
      <section className="grid grid-cols-3 gap-10 mt-6 mb-4">
         <main className="col-start-1 col-end-3">
            <img src={event.image} alt={event.title} className="object-cover rounded h-96 w-full my-5" />
            <div className="mt-10">
               <h3 className="font-bold text-lg">About the Event</h3>
               <hr className="mt-3" />
               <p className="mt-3">{event.description}</p>
            </div>
         </main>
         <aside className="border border-slate-500 p-5 rounded">
            <h3 className="font-bold text-lg">Event Details</h3>
            <hr className="mt-4" />
            <div className="w-full flex justify-between mt-6">
               <p className="p-4 text-center bg-[#eb0d66] rounded text-white">{countDown.days} <br /> <span>Days</span> </p>
               <p className="p-4 text-center bg-[#eb0d66] rounded text-white">{countDown.hours} <br /> <span>Hours</span> </p>
               <p className="p-4 text-center bg-[#eb0d66] rounded text-white">{countDown.minutes} <br /> <span>Mins</span> </p>
               <p className="p-4 text-center bg-[#eb0d66] rounded text-white">{countDown.seconds} <br /> <span>Secs</span> </p>
            </div>
            <div className="mt-8 flex gap-3 items-center">
               <UserCircleIcon className="size-10 text-cyan-950 p-2 bg-slate-300 rounded-full" />
               <div>
                  <span className="text-sm text-slate-500">Organised by</span>
                  <p className="text-md">{event.organiser}</p>
               </div>
            </div>
            <div className="mt-8 flex gap-3 items-center">
               <CalendarIcon className="size-10 text-cyan-950 p-2 bg-slate-300 rounded-full" />
               <div>
                  <span className="text-sm text-slate-500">Date | Time</span>
                  <p className="text-md">{event.startDate} | {event.startTime}</p>
               </div>
            </div>
            <div className="mt-8 flex gap-3 items-center">
               <MapPinIcon className="size-10 text-cyan-950 p-2 bg-slate-300 rounded-full" />
               <div>
                  <span className="text-sm text-slate-500">Location</span>
                  <p className="text-md">{event.address}</p>
               </div>
            </div>
            <div className="mt-8">
               <h4 className="text-md font-bold">Select Ticket</h4>
               <hr className="mt-3" />
               {event.tickets.map((ticket, index) => (
               <div className="mt-6">
                  <span className="text-lg font-bold">{ticket.name}</span>
                  <div className="flex justify-between items-center mt-2">
                     <p className="text-lg font-bold">&#8358;{ticket.price}</p>
                     <div className="flex gap-2 items-center">
                        <button onClick={() => decreaseTicketCount(index)} className="px-4 py-2 bg-gray-300 rounded text-black">
                           -
                        </button>
                        <span>{ticketCounts[index]}</span>
                        <button onClick={() => increaseTicketCount(index)} className="px-4 py-2 bg-[#eb0d66] text-white rounded">
                           +
                        </button>
                     </div>
                  </div>
               </div>
               ))}
               <div className="mt-8 text-lg font-bold text-right">
                  Total: &#8358;{totalPrice.toFixed(2)}
               </div>
               <button onClick={handleBookBtn} className="bg-[#eb0d66] rounded text-white py-2 px-4 w-full mt-6">BOOK NOW</button>
            </div>
         </aside>
      </section>
      
      {/* modal */}
      {isModalOpen && (
        <div onClick={toggleModal} className=" fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold">Booking Confirmation</h2>
            <hr />
            <p className="mt-4">
              You are booking <h3 className="text-lg font-bold">{event.title}</h3>{" "}
              
            </p>
            <p className="mt-2">
              Total Amount: <span className=" text-lg font-bold">₦{totalPrice}</span>
            </p>

            <div className="mt-6 flex gap-4">
              <button
                className="px-6 py-2 bg-gray-300 rounded"
                onClick={toggleModal}
              >
                Cancel
              </button>
              <button onClick={toggleModal2} className="px-6 py-2 bg-[#eb0d66] text-white rounded">
                Pay Now
              </button>
            </div>
            
          </div>
        </div>
      )}

      {isModal2Open && (
         <div onClick={handleClickOutside} className="cta fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="grid gap-3 bg-white p-8 rounded shadow-lg w-1/3">
               <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Make Payment <span className="text-sm font-normal">(BANK TRANSFER)</span></h3>
                  <span onClick={toggleModal2} className="text-2xl font-semibold cursor-pointer">x</span>
               </div>
              
              <p className="font-semibold">Bank Name: <span className="font-normal">Zenith Bank</span></p>
              <p className="font-semibold">Account Name: <span className="font-normal">Evntz Ltd</span></p>
              <p className="font-semibold">Account Number: <span className="font-normal">2266417295</span></p>
              <p className="font-semibold">Total Amount: <span className="font-normal">₦{totalPrice}</span></p>

              <button onClick={() => handleBookEvent(event)} className="mt-6 px-6 py-2 bg-[#eb0d66] text-white rounded">
                I Have Paid
              </button>
            </div>
            
         </div>
      )}
   </div>

  )
}

export default EventDetails
