// import React from 'react'
import { useAuth } from '../AuthContext';
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Sidebar from './Sidebar'
import axios from 'axios';


const Dashboard = () => {
  
  // const navigate = useNavigate();
  const {user, userDetails} = useAuth();

  const [userEvents, setUserEvents] = useState([]);
  const [bookedEvents, setBookedEvents] = useState([]);
  const [counts, setCounts] = useState({ totalBookings: 0, onlineBookings: 0, offlineBookings: 0 });
  const [eventCounts, setEventCounts] = useState({ totalBookings: 0, onlineBookings: 0, offlineBookings: 0 });
  const auth = getAuth();
  const db = getFirestore();
  const currentUser = auth.currentUser;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchBookings = async () => {
    if (!currentUser) return;

    const userId = currentUser.uid;
    const userBookingsRef = doc(db, "userBookings", userId);

    try {
      const userDoc = await getDoc(userBookingsRef);

      if (userDoc.exists()) {
        return userDoc.data().bookings || [];
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error fetching bookings:", error.message);
      return [];
    }
  };


  const countBookings = (bookings = []) => {
    const totalBookings = bookings.length;
    const onlineBookings = bookings.filter((booking) => booking.medium === "online").length;
    const offlineBookings = bookings.filter((booking) => booking.medium === "in-person").length;
 
    return { totalBookings, onlineBookings, offlineBookings };
 }; 

 useEffect(() => {
  const fetchData = async () => {
    try {
      const validBookings = await fetchBookings();
      setBookedEvents(validBookings);
      const counts = countBookings(validBookings);
      setCounts(counts);
    } catch (error) {
      console.error("Error fetching bookings:", error.message);
      setCounts({ totalBookings: 0, onlineBookings: 0, offlineBookings: 0 });
    }
  };

  fetchData();
}, []);


  useEffect(() => {
    if (!currentUser) return;
    const fetchUserEvents = async () => {
    try {
      const response = await axios.get("http://localhost:4000/events");
      const allEvents = response.data;

      const userSpecificEvents = allEvents.filter(
         (event) => event.userId === currentUser.uid
      );

      setUserEvents(userSpecificEvents);

      const totalEvents = userSpecificEvents.length;
      const offlineEvents = userSpecificEvents.filter((event) => event.medium === "in-person").length;
      const onlineEvents = userSpecificEvents.filter((event) => event.medium === "online").length;

      setEventCounts({totalEvents, offlineEvents, onlineEvents})
      
    } catch (error) {
      console.error("Error fetching user events:", error);
      setEventCounts({ totalEvents: 0, offlineEvents: 0, onlineEvents: 0 });
    }
  };


  fetchUserEvents();
  }, [])

  return (
    <div>
      <div className="h-screen flex sticky">
          <Sidebar/>     
        <main className='w-full overflow-y-auto scrollbar-hide'>
          <div className=' w-full px-4 py-6'>
            <h2 className='text-2xl font-semibold'>Dashboard</h2>
          </div>
          <section className='lg:flex gap-10 mt-16 md:flex-wrap w-10/12 mx-auto sm: w-11/12 mx-auto '>
            <div className='rounded shadow-2xl shadow-pink-200 h-48 w-2xs flex flex-col justify-between'>
              <span className='w-full bg-[#eb0d66] rounded p-3 text-white text-center text-lg'>TOTAL EVENTS ADDED</span>
              <p className='text-center pb-6 text-8xl'>{eventCounts.totalEvents}</p>
            </div>
            <div className='rounded shadow-2xl shadow-pink-200 h-48 w-2xs flex flex-col justify-between'>
              <span className='w-full bg-[#eb0d66] rounded p-3 text-white text-lg'>OFFLINE EVENTS ADDED</span>
              <p className='text-center pb-6 text-8xl'>{eventCounts.offlineEvents}</p>
            </div>
            <div className='rounded shadow-2xl shadow-pink-200 h-48 w-2xs flex flex-col justify-between'>
              <span className='w-full bg-[#eb0d66] rounded p-3 text-white text-lg'>ONLINE EVENTS ADDED</span>
              <p className='text-center pb-6 text-8xl'>{eventCounts.onlineEvents}</p>
            </div>
          </section>
          {/* booked events */}
          <section className='lg:flex gap-10 mt-24 md:flex-wrap w-10/12 mx-auto sm: w-11/12 mx-auto'>
            <div className='rounded shadow-2xl shadow-cyan-100 h-48 w-2xs flex flex-col justify-between'>
              <span className='w-full bg-cyan-950 rounded p-3 text-white text-lg'>TOTAL BOOKED EVENTS</span>
              <p className='text-center pb-6 text-8xl'>{counts.totalBookings}</p>
            </div>
            <div className='rounded shadow-2xl shadow-cyan-100 h-48 w-2xs flex flex-col justify-between'>
              <span className='w-full bg-cyan-950 rounded p-3 text-white text-lg'>BOOKED OFFLINE EVENTS</span>
              <p className='text-center pb-6 text-8xl'>{counts.offlineBookings}</p>
            </div>
            <div className='rounded shadow-2xl shadow-cyan-100 h-48 w-2xs flex flex-col justify-between'>
              <span className='w-full bg-cyan-950 rounded p-3 text-white text-lg'>BOOKED ONLINE EVENTS</span>
              <p className='text-center pb-6 text-8xl'>{counts.onlineBookings}</p>
            </div>
          </section>
        </main>
      </div>
      
    </div>
  );
};

export default Dashboard
