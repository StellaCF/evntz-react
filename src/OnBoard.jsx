import React from 'react'
import Navbar from './components/Navbar'
import img from './assets/img.jpg'



const OnBoard = () => {

const values = [
  {title: "Event Creation made Easy", content: "Seamlessly create and manage event with our intuitive event creation feature. Specify event details, such as dates, time, location and description, to provide a clear picture for your attendees. Customize event settings, add event images, and set ticket options effortlessly."},
  {title: "Seamless user Invitetion", content: "Invite participants effortlessly by sending invitation links via email, messaging apps, or social media platforms. Ensure a smooth registration process and track attendees responses for effective event management."},
  {title: "Easy Attendee anagement", content: "Keep track of attendees using our comprehensive attendees management feature. Easily view and manage RSVPs, track attendance and collect essential participants information. Scan QR codes to check in attendees and ensure a smooth event experience for all participants."},
]

  return (
    <div>
      <section className="w-full h-hero bg-cyan-950 text-white flex flex-col justify-center gap-5 items-center">
        <h1 className="text-6xl font-extrabold text-center leading-none">
          Evntz: From Vision to Reality, Seamlessly. <br></br> Plan Smart,
          Celebrate Big.
        </h1>
        <p className="text-l mt-3 text-gray-400">
          RSVP and Management Mase Easy for Creators
        </p>
        <div className="flex justify-center gap-5 mt-3">
          <button className="bg-[#eb0d66] rounded-full px-5 py-2">
            GET STARTED
          </button>
          <button className="bg-[#eb0d66] rounded-full px-5 py-2">
            GO TO DASHBOARD
          </button>
          <button className="bg-[#eb0d66] rounded-full px-5 py-2">
            EXPLORE EVENTS
          </button>
        </div>
      </section>
      <section className="mt-36 w-4/5 mx-auto h-fit flex items-center gap-8">
        <div className="w-2/4">
          <img src={img} alt="image" className="w-full" />
        </div>
        <main className="w-2/4">
          <div className="w-24 h-1 bg-cyan-950 rounded"></div>
          <h2 className="mt-8 text-[#eb0d66] text-5xl font-bold leading-normal">
            Unlock Your <br /> Creative Potentials
          </h2>
          <div className="w-full h-0.5 mt-4 bg-slate-400"></div>
          <p className="mt-8 text-slate-500">
            Our app empowers individual contributors and artists like you to
            unleash your creativity and organize remarkable events. Whether
            you're planning a solo exhibition, a live performance, or a
            collaborative workshop, our platform provides the tools and features
            you need to make your events a resounding success.
          </p>
          <button className="bg-cyan-950 rounded-full px-5 py-2 mt-8 text-white">
            GET STARTED
          </button>
          <button className="bg-cyan-950 rounded-full px-5 py-2 mt-8 text-white">
            GO TO DASHBOARD
          </button>
        </main>
      </section>
      <section className="bg-cyan-950 mt-28 py-12 ">
        <main className="flex w-4/5 justify-center items-center mx-auto">
          <div className='w-2/4 text-white'>
            <div className='flex items-center gap-1'>
              <div className='w-24 h-1 bg-white rounded'></div>
              <strong>Secure</strong>
            </div>
            <h2 className='text-5xl font-semibold leading-tight mt-4'>Seamless Event Planning and Organisation</h2>
          </div>
          <p className='w-2/4 text-slate-300'>
            Say goodbye to the hassles of event planning. Our user-friendly
            interface simplifies the process, allowing you to focus on your
            artistic endeavors. Create and manage events effortlessly, from
            setting dates and locations to providing event descriptions and
            ticketing options. Streamline your planning process and bring your
            vision to reality
          </p>
        </main>
        <div className='w-4/5 h-0.5 mx-auto mt-8 bg-slate-500'></div>
        <aside className='w-4/5 mx-auto grid grid-cols-3 gap-10 mt-12'>
          {
            values.map((value) => (
              <div key={value} className="bg-white-500 w-full p-8 bg-white rounded-lg">
                <h4 className='text-xl font-bold'>{value.title}</h4>
                <p className='mt-4 text-justify text-slate-600 text-sm'>{value.content}</p>
          </div>
            ))
          }  
        </aside>
      </section>
    </div>
  );
}

export default OnBoard
