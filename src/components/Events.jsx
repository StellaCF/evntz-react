import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import EventCard from "./EventCard";
// import Navbar from './Navbar'

const Events = () => {

  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:4000/events");
        const allEvents = response.data;

        // Set all events
        setEvents(allEvents);
        setFilteredEvents(allEvents);

        // Extract unique categories
        const uniqueCategories = [
          "all",
          ...new Set(allEvents.map((event) => event.category?.trim().toLowerCase()).filter((category) => category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);

    if (category === "all") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) => event.category.trim().toLowerCase() === category);
      setFilteredEvents(filtered);
    }
  };

  // Group events by medium
  const groupEventsByMedium = (events, medium) => {
    return events.filter((event) => event.medium === medium);
  };

  const handleEventClick = (event) => {
    navigate("/eventdetails", { state: { event } });
  };
  
  return (
    <div className='w-full bg-gray-100 sticky'>
      <h4 className="w-4/5 mx-auto pt-6 text-3xl">Explore the best events happening around you</h4>
      <div className="w-4/5 mx-auto mt-8 flex gap-5 overflow-x-auto scrollbar-hide whitespace-nowrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryFilter(category)}
            className={`py-1 px-6 rounded ${
              selectedCategory === category
                ? "bg-[#eb0d66] text-slate-200"
                : "bg-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>


      <hr className='mt-10' />

      <section className="mt-6 w-4/5 mx-auto">
        {/* Event Groups */}
        <div className="grid grid-cols-1 gap-16">
          {/* All Events */}
          <div>
            <h3 className="text-xl text-[#eb0d66] font-bold">ALL</h3>
            <div className="flex gap-8 mt-4 overflow-x-auto whitespace-nowrap scrollbar-hide gap-8 mt-4">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} onClick={() => handleEventClick(event)} />
              ))}
            </div>
          </div>
          <hr />

          {/* Offline Events */}
          <div>
            <h3 className="text-xl text-[#eb0d66] font-bold">OFFLINE</h3>
            <div className="flex gap-8 mt-4 overflow-x-auto whitespace-nowrap scrollbar-hide gap-8 mt-4">
              {groupEventsByMedium(filteredEvents, "in-person").map((event) => (
                <EventCard key={event.id} event={event} onClick={() => handleEventClick(event)} />
              ))}
            </div>
          </div>
          <hr />

          {/* Online Events */}
          <div>
            <h3 className="text-xl text-[#eb0d66] font-bold">ONLINE</h3>
            <div className="flex gap-8 mt-4 overflow-x-auto whitespace-nowrap scrollbar-hide gap-8 mt-4">
              {groupEventsByMedium(filteredEvents, "online").map((event) => (
                <EventCard key={event.id} event={event} onClick={() => handleEventClick(event)} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className='bg-cyan-950 w-full mt-20 text-white py-20'>
        <div className='flex justify-between items-center w-4/5 mx-auto'>
          <Link to="/" className='font-extrabold text-2xl font-playfair'>EVNTZ</Link>
          <div className='flex flex-col gap-3'>
            <Link to="/dashboard">DASHBOARD</Link>
            <Link to="/events">EXPLORE EVENTS</Link>
          </div>
        </div>
        <div className="w-full h-0.5 mt-10 bg-slate-400"></div>
        <div className='w-4/5 mt-10 flex flex-col justify-center items-center'>
          <p className=''>© EVNTZ 2025 | All rights reserved</p>
        </div>
      </footer>
    </div>
  )
}

export default Events
