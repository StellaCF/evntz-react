import React from 'react'
import { useAuth } from "../AuthContext"

const EventCard = ({event, onClick}) => {
   const {user, userDetails} = useAuth();
  return (
    <div onClick={onClick} className="w-[300px] flex-shrink-0">
      <div className="relative w-xs">
         <img className="object-cover rounded-half h-40 w-full" src={event.image} alt={event.title} />
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
      <div className="bg-white pb-1 pt-4 rounded-down px-3">
         <p className="text-lg font-bold">{event.title}</p>
         <span className='text-sm mt-2 text-center'>added by {event.addedby}</span>
      </div>
    </div>
  )
}

export default EventCard
