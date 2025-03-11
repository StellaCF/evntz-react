import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { getAuth } from "firebase/auth";
import axios from 'axios'
import Sidebar from '../Sidebar'
import { useAuth } from '../../AuthContext'

const EventList = () => {
  const {user, userDetails} = useAuth()
  const [userEvents, setUserEvents] = useState([])
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!currentUser) return;
    const fetchUserEvents = async () => {
      try{
        const response = await axios.get("http://localhost:4000/events");
        const events = response.data;

        const filteredEvents = events.filter(
          (event) => event.userId === currentUser.uid
       );


        setUserEvents(filteredEvents)
      } catch (error) {
        console.error("Error fetching user events:", error);
      }      
    }
    fetchUserEvents()
  }, [user])

  const handleEventClick = (event) => {
    navigate("/eventdetails", { state: { event } });
  };

  return (
    <div>
      <div className="h-screen flex">
       <Sidebar />
        <main className='w-full '>
          <div className=' w-full px-4 py-6'>
            <h2 className='text-2xl font-semibold'>Events</h2>
          </div>
          <section className=''>
            {userEvents.lenght === 0 ? (
              <p>You haven't created any events yet</p>
            ) : (
              <main className='mt-6 grid lg:grid-cols-3 md;grid-cols-2 w-11/12 mx-auto gap-8'>
                {userEvents.map((event) => (
                  <div onClick={() => handleEventClick(event)}>
                    <div className="relative">
                      <img className="rounded-half h-40 w-full object-cover" src={event.image} alt={event.title} />
                      <p className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded">
                      {event.category}
                      </p>
                      <p className="bg-white px-2 py-1 absolute bottom-2 right-2 rounded">
                      {new Date(event.startDate).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "short",
                      })}
                      </p>
                    </div>
                    <div className="shadow-xl py-3 rounded-down px-3">
                      <p className="text-lg font-bold">{event.title}</p>
                      {/* <span className='text-sm mt-2 text-center'>added by {event.addedby}</span> */}
                    </div>
                  </div>
                ))} 
              </main>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}

export default EventList
