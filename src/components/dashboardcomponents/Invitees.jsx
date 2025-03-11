import React from 'react'
import Sidebar from '../Sidebar'
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";



const Invitees = () => {

  const [bookedEvents, setBookedEvents] = useState([]);
  const auth = getAuth();
  const db = getFirestore();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchBookings = async () => {
      if (!currentUser) return;

      const userId = currentUser.uid;
      const userBookingsRef = doc(db, "userBookings", userId);

      try {
        const userDoc = await getDoc(userBookingsRef);

        if (userDoc.exists()) {
          setBookedEvents(userDoc.data().bookings || []);
        } else {
          setBookedEvents([]);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error.message);
      }
    };

    fetchBookings();
  }, [currentUser]);


  const handleEventClick = (event) => {
    navigate("/eventdetails", { state: { event } });
  };


  return (
    <div>
      <div className="h-screen flex">
        <Sidebar />
        <main className='w-full'>
          <div className='w-full px-4 py-6'>
            <h2 className='text-2xl font-semibold'>Booked Events</h2>
          </div>
          {bookedEvents.length === 0 ? (
            <p>You have no booked events</p>
            ) : (
              <div className='mt-6 grid lg:grid-cols-3 md;grid-cols-2 w-11/12 mx-auto gap-8'>
                {bookedEvents.map((bookedEvent) => (
                  <div onClick={() => handleEventClick(event)}>
                    <div className="relative">
                      <img className="rounded-half h-40 w-full object-cover" src={bookedEvent.image} alt={bookedEvent.title} />
                      <p className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded">
                      {bookedEvent.category}
                      </p>
                      <p className="bg-white px-2 py-1 absolute bottom-2 right-2 rounded">
                      {new Date(bookedEvent.startDate).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "short",
                      })}
                      </p>
                    </div>
                    <div className="bg-white shadow-xl py-3 rounded-down px-3">
                      <p className="text-lg font-bold">{bookedEvent.title}</p>
                      {/* <span className='text-sm mt-2 text-center'>added by {event.addedby}</span> */}
                    </div>
                  </div>
                ))}
              </div>

          )}
        </main>
      </div>
    </div>
  )
}

export default Invitees
