import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import img1 from './assets/img.jpg'
import img2 from './assets/security.gif'
import { useAuth } from './AuthContext'
// import Navbar from './components/Navbar'




const OnBoard = () => {

  const values = [
    {title: "Event Creation made Easy", content: "Seamlessly create and manage event with our intuitive event creation feature. Specify event details, such as dates, time, location and description, to provide a clear picture for your attendees. Customize event settings, add event images, and set ticket options effortlessly."},
    {title: "Seamless user Invitetion", content: "Invite participants effortlessly by sending invitation links via email, messaging apps, or social media platforms. Ensure a smooth registration process and track attendees responses for effective event management."},
    {title: "Easy Attendee anagement", content: "Keep track of attendees using our comprehensive attendees management feature. Easily view and manage RSVPs, track attendance and collect essential participants information. Scan QR codes to check in attendees and ensure a smooth event experience for all participants."},
  ]

  const {user, userDetails} = useAuth() || {};
  const navigate = useNavigate();

  const handleDashboard = () => {
    navigate("/dashboard")
  }
  const handleEvents = () => {
    navigate("/events")
  }
  const handleGetstarted = () => {
    navigate("/register")
  }
  return (

    <div>
  <section className="w-full h-hero bg-cyan-950 text-white flex flex-col justify-center gap-5 items-center px-4 sm:px-4 lg:px-8">
    <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-center leading-snug">
      Evntz: From Vision to Reality, Seamlessly. <br /> Plan Smart, Celebrate Big.
    </h1>
    <p className="text-sm sm:text-base lg:text-lg mt-3 text-gray-400 text-center">
      RSVP and Management Made Easy for Creators
    </p>
    <div className="flex justify-center gap-3 sm:gap-5 mt-3 flex-wrap">
      {!user ? (
        <>
          <button className="bg-[#eb0d66] rounded-full px-4 py-2 sm:px-5 sm:py-3" onClick={handleGetstarted}>
            GET STARTED
          </button>
        </>
      ) : (
        <>
          <button className="bg-[#eb0d66] rounded-full px-4 py-2 sm:px-5 sm:py-3" onClick={handleDashboard}>
            GO TO DASHBOARD
          </button>
        </>
      )}
      <button className="bg-[#eb0d66] rounded-full px-4 py-2 sm:px-5 sm:py-3" onClick={handleEvents}>
        EXPLORE EVENTS
      </button>
    </div>
  </section>

  <section className="mt-36 w-4/5 mx-auto h-fit flex flex-col lg:flex-row items-center gap-8 px-4 sm:px-6 lg:px-0">
    <div className="lg:w-2/4">
      <img src={img1} alt="Creative potential" className="w-full" />
    </div>
    <main className="lg:w-2/4">
      <div className="w-24 h-1 bg-cyan-950 rounded"></div>
      <h2 className="mt-8 text-[#eb0d66] text-4xl sm:text-4xl font-bold leading-normal">
        Unlock Your <br /> Creative Potentials
      </h2>
      <div className="w-full h-0.5 mt-4 bg-slate-400"></div>
      <p className="mt-8 text-slate-500 text-sm sm:text-base text-justify">
        Our app empowers individual contributors and artists like you to unleash your creativity and organize remarkable events. Whether you're planning a solo exhibition, a live performance, or a collaborative workshop, our platform provides the tools and features you need to make your events a resounding success.
      </p>
      {!user ? (
        <>
          <button onClick={handleGetstarted} className="bg-cyan-950 rounded-full px-5 py-2 mt-8 text-white">
            GET STARTED
          </button>
        </>
      ) : (
        <>
          <button onClick={handleDashboard} className="bg-cyan-950 rounded-full px-5 py-2 mt-8 text-white">
            GO TO DASHBOARD
          </button>
        </>
      )}
    </main>
  </section>

  <section className="bg-cyan-950 mt-28 py-12 px-4 sm:px-6 lg:px-8">
    <main className="flex flex-col lg:flex-row w-full lg:w-4/5 justify-center items-center mx-auto gap-8">
      <div className="lg:w-2/4 text-white text-center lg:text-left">
        <div className="flex items-center gap-1 justify-center lg:justify-start">
          <div className="w-24 h-1 bg-white rounded"></div>
          <strong>Secure</strong>
        </div>
        <h2 className="text-4xl sm:text-5xl font-semibold leading-tight mt-4">
          Seamless Event Planning and Organisation
        </h2>
      </div>
      <p className="lg:w-2/4 text-slate-300 text-sm sm:text-base text-justify">
        Say goodbye to the hassles of event planning. Our user-friendly interface simplifies the process, allowing you to focus on your artistic endeavors. Create and manage events effortlessly, from setting dates and locations to providing event descriptions and ticketing options. Streamline your planning process and bring your vision to reality.
      </p>
    </main>
    <div className="w-full h-0.5 mx-auto mt-8 bg-slate-500"></div>
    <aside className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-12 w-full lg:w-4/5 mx-auto">
      {values.map((value) => (
        <div key={value} className="bg-white w-full p-8 rounded-lg shadow-md">
          <h4 className="text-xl font-bold">{value.title}</h4>
          <p className="mt-4 text-slate-600 text-sm">{value.content}</p>
        </div>
      ))}
    </aside>
  </section>

  <section className="mt-36 w-3/4 mx-auto h-fit flex flex-col md:flex-row items-center gap-8">
  <aside className="w-full md:w-2/4 text-center md:text-left">
    <div className='flex items-center gap-1 justify-center md:justify-start'>
      <div className="w-24 h-1 bg-cyan-950 rounded"></div>
      <strong className='text-cyan-950'>Registration made easy</strong>
    </div>
    <h2 className="mt-8 text-[#eb0d66] text-4xl md:text-5xl font-bold leading-normal">
      Security And <br className="hidden md:block" /> Reliability
    </h2>
    <div className="w-full h-0.5 mt-4 bg-slate-400"></div>
    <p className="mt-8 text-slate-500 text-sm md:text-base">
      Rest assured that your event data is safe and secure with our web app. We prioritize data
      protection and employ industry-standard security measures to safeguard your information.
      Our reliable infrastructure ensures that your event management process remains
      uninterrupted, allowing you to focus on what matters most—creating exceptional events.
    </p>
    {!user ? (
      <button onClick={handleGetstarted} className="bg-[#eb0d66] rounded-full px-5 py-2 mt-8 text-white">
        GET STARTED
      </button>
    ) : (
      <button onClick={handleDashboard} className="bg-[#eb0d66] rounded-full px-5 py-2 mt-8 text-white">
        GO TO DASHBOARD
      </button>
    )}
  </aside>
  <main className="w-full md:w-2/4 mt-8 md:mt-0">
    <img src={img2} alt="image" className="w-full rounded-lg"/>
  </main>
</section>


  <footer className="bg-cyan-950 w-full mt-20 text-white py-12 px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center w-full lg:w-4/5 mx-auto">
      <Link to="/" className="font-extrabold text-2xl font-playfair">
        EVNTZ
      </Link>
      <div className="flex flex-col gap-3 mt-4 sm:mt-0">
        <Link to="/dashboard">DASHBOARD</Link>
        <Link to="/events">EXPLORE EVENTS</Link>
      </div>
    </div>
    <div className="w-full h-0.5 mt-10 bg-slate-400"></div>
    <div className="w-full lg:w-4/5 mx-auto mt-10 text-center">
      <p>© EVNTZ 2025 | All rights reserved</p>
    </div>
  </footer>
</div>


    // <div>
      
    //   <section className="w-full h-hero bg-cyan-950 text-white flex flex-col justify-center gap-5 items-center">
    //     <h1 className="text-6xl font-extrabold text-center leading-none">
    //       Evntz: From Vision to Reality, Seamlessly. <br></br> Plan Smart,
    //       Celebrate Big.
    //     </h1>
    //     <p className="text-l mt-3 text-gray-400">
    //       RSVP and Management Mase Easy for Creators
    //     </p>
    //     <div className="flex justify-center gap-5 mt-3">
    //       {!user ? (
    //         <>
    //       <button className="bg-[#eb0d66] rounded-full px-5 py-2" onClick={handleGetstarted}>
    //         GET STARTED
    //       </button>
    //       </>
    //       ) : (
    //         <>
    //       <button className="bg-[#eb0d66] rounded-full px-5 py-2" onClick={handleDashboard}>
    //         GO TO DASHBOARD
    //       </button>
    //       </>
    //       )}
    //       <button className="bg-[#eb0d66] rounded-full px-5 py-2" onClick={handleEvents}>
    //         EXPLORE EVENTS
    //       </button>
    //     </div>
    //   </section>
    //   <section className="mt-36 w-4/5 mx-auto h-fit flex items-center gap-8">
    //     <div className="w-2/4">
    //       <img src={img1} alt="image" className="w-full" />
    //     </div>
    //     <main className="w-2/4">
    //       <div className="w-24 h-1 bg-cyan-950 rounded"></div>
    //       <h2 className="mt-8 text-[#eb0d66] text-5xl font-bold leading-normal">
    //         Unlock Your <br /> Creative Potentials
    //       </h2>
    //       <div className="w-full h-0.5 mt-4 bg-slate-400"></div>
    //       <p className="mt-8 text-slate-500">
    //         Our app empowers individual contributors and artists like you to
    //         unleash your creativity and organize remarkable events. Whether
    //         you're planning a solo exhibition, a live performance, or a
    //         collaborative workshop, our platform provides the tools and features
    //         you need to make your events a resounding success.
    //       </p>
    //       {!user ? (
    //         <>
    //           <button className="bg-cyan-950 rounded-full px-5 py-2 mt-8 text-white">
    //             GET STARTED
    //           </button>
    //         </>
    //       ) : (
    //         <>
    //           <button className="bg-cyan-950 rounded-full px-5 py-2 mt-8 text-white">
    //           GO TO DASHBOARD
    //           </button>
    //         </>
    //       )} 
    //     </main>
    //   </section>
    //   <section className="bg-cyan-950 mt-28 py-12 ">
    //     <main className="flex w-4/5 justify-center items-center mx-auto">
    //       <div className='w-2/4 text-white'>
    //         <div className='flex items-center gap-1'>
    //           <div className='w-24 h-1 bg-white rounded'></div>
    //           <strong>Secure</strong>
    //         </div>
    //         <h2 className='text-5xl font-semibold leading-tight mt-4'>Seamless Event Planning and Organisation</h2>
    //       </div>
    //       <p className='w-2/4 text-slate-300'>
    //         Say goodbye to the hassles of event planning. Our user-friendly
    //         interface simplifies the process, allowing you to focus on your
    //         artistic endeavors. Create and manage events effortlessly, from
    //         setting dates and locations to providing event descriptions and
    //         ticketing options. Streamline your planning process and bring your
    //         vision to reality
    //       </p>
    //     </main>
    //     <div className='w-4/5 h-0.5 mx-auto mt-8 bg-slate-500'></div>
    //     <aside className='w-4/5 mx-auto grid grid-cols-3 gap-10 mt-12'>
    //       {
    //         values.map((value) => (
    //           <div key={value} className="bg-white-500 w-full p-8 bg-white rounded-lg">
    //             <h4 className='text-xl font-bold'>{value.title}</h4>
    //             <p className='mt-4 text-justify text-slate-600 text-sm'>{value.content}</p>
    //       </div>
    //         ))
    //       }  
    //     </aside>
    //   </section>
      
    //   <footer className='bg-cyan-950 w-full mt-20 text-white py-20'>
    //     <div className='flex justify-between items-center w-4/5 mx-auto'>
    //       <Link to="/" className='font-extrabold text-2xl font-playfair'>EVNTZ</Link>
    //       <div className='flex flex-col gap-3'>
    //         <Link to="/dashboard">DASHBOARD</Link>
    //         <Link to="/events">EXPLORE EVENTS</Link>
    //       </div>
    //     </div>
    //     <div className="w-full h-0.5 mt-10 bg-slate-400"></div>
    //     <div className='w-4/5 mt-10 flex flex-col justify-center items-center'>
    //       <p className=''>© EVNTZ 2025 | All rights reserved</p>
    //     </div>
    //   </footer>
    // </div>

  );
}

export default OnBoard
