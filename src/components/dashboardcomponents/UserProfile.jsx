import React, {useState, useEffect} from 'react'
import { useAuth } from '../../AuthContext'
import Sidebar from '../Sidebar';


const UserProfile = () => {
   const {user, userDetails} = useAuth() || {};
   const [isReadOnly, setIsReadOnly] = useState(true);
   const [showAccountForm, setShowAccountForm] = useState(false);
   const [isAccountSaved, setIsAccountSaved] = useState(false);
   const [formData, setFormData] = useState({
     name: "",
     email: "",
     phone: "",
     bank: "",
     acctName: "",
     acctNum: "",
   });

  useEffect(() => {
    if (userDetails) {
      setFormData({
        name: userDetails.name || "",
        email: userDetails.email || "",
        phone: "",
        bank: "",
        acctName: "",
        acctNum: "",
      });
    }
  }, [userDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleEdit = () => {
    setIsReadOnly((prevState) => !prevState); // Toggle read-only state
  };

  const toggleAccountForm = () => {
   if (!isReadOnly) setShowAccountForm((prev) => !prev);
 };

 const handleSave = () => {
   // Perform any validation or save logic here
   if (!formData.bank || !formData.acctName || !formData.acctNum) {
     alert("Please fill out all fields before saving.");
     return;
   }

   // Assume saving to backend is successful
   setIsAccountSaved(true);
   setIsReadOnly(true);
   setShowAccountForm(true);
 };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsReadOnly(true); // Save and make the form read-only
    console.log("Updated Data:", formData); // Handle update logic here (e.g., save to Firestore)
  };


  return (
   <div>
      <div className="h-screen flex">
        <Sidebar />
        <main className='w-full overflow-y-auto scrollbar-hide h-viewheight flex items-center'>
            <div className='w-2/5 mx-auto h-4/5'>
               <div className='w-full '>
                  <h3 className='text-center text-xl font-extrabold'>Hello, {userDetails.name}</h3>
               </div>
               <form onSubmit={handleSubmit} className="space-y-6 mt-6">
               {/* Name Field */}
               <div className='flex flex-col gap-2'>
                  <label className="block text-md font-medium text-gray-700">
                     Name
                  </label>
                  <input
                     type="text"
                     name="name"
                     value={formData.name}
                     onChange={handleChange}
                     readOnly={isReadOnly}
                     className={`w-full p-2 border outline-none ${
                     isReadOnly ? "bg-gray-100" : "bg-white"
                     } border-gray-300 rounded`}
                  />
               </div>

               {/* Email Field */}
               <div className='flex flex-col gap-2'>
                  <label className="block text-md font-medium text-gray-700">
                     Email
                  </label>
                  <input
                     type="email"
                     name="email"
                     value={formData.email}
                     onChange={handleChange}
                     readOnly={isReadOnly}
                     className={`w-full p-2 border outline-none ${
                     isReadOnly ? "bg-gray-100" : "bg-white"
                     } border-gray-300 rounded`}
                  />
               </div>

               {/* Phone Field */}
               <div className='flex flex-col gap-2'>
                  <label className="block text-md font-medium text-gray-700">
                     Phone
                  </label>
                  <input
                     type="text"
                     name="phone"
                     value={formData.phone}
                     onChange={handleChange}
                     readOnly={isReadOnly}
                     className={`w-full p-2 border outline-none ${
                     isReadOnly ? "bg-gray-100" : "bg-white"
                     } border-gray-300 rounded`}
                  />
               </div>

               {showAccountForm && (
                   <div className='space-y-6'>
                  <div className='flex flex-col gap-2'>
                     <label className="block text-md font-medium text-gray-700">
                        Bank Name
                     </label>
                     <input
                        type="text"
                        name="bank"
                        value={formData.bank}
                        onChange={handleChange}
                        readOnly={isReadOnly}
                        className={`w-full p-2 border outline-none ${
                        isReadOnly ? "bg-gray-100" : "bg-white"
                        } border-gray-300 rounded`}
                     />
                  </div>
                  <div className='flex flex-col gap-2'>
                     <label className="block text-md font-medium text-gray-700">
                        Account Name
                     </label>
                     <input
                        type="text"
                        name="acctName"
                        value={formData.acctName}
                        onChange={handleChange}
                        readOnly={isReadOnly}
                        className={`w-full p-2 border outline-none ${
                        isReadOnly ? "bg-gray-100" : "bg-white"
                        } border-gray-300 rounded`}
                     />
                  </div>
                  <div className='flex flex-col gap-2'>
                     <label className="block text-md font-medium text-gray-700">
                        Account Number
                     </label>
                     <input
                        type="number"
                        name="acctNum"
                        value={formData.acctNum}
                        onChange={handleChange}
                        readOnly={isReadOnly}
                        className={`w-full p-2 border outline-none ${
                        isReadOnly ? "bg-gray-100" : "bg-white"
                        } border-gray-300 rounded`}
                     />
                  </div>
               </div>
               )}

               {!isAccountSaved && (
                  <button
                     type="button"
                     onClick={toggleAccountForm}
                     disabled={isReadOnly}
                     className={`px-4 py-2 rounded ${
                        isReadOnly
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 text-white"
                     }`}
                  >
                     Add Acct.
                  </button>
               )}
              

               {/* Action Buttons */}
               <div className="flex justify-center mt-6 gap-4">
                  <button
                     type="button"
                     onClick={toggleEdit}
                     className="bg-[#eb0d66] text-white px-4 py-2 rounded"
                  >
                     {isReadOnly ? "Update Profile" : "Cancel"}
                  </button>
                  {!isReadOnly && (
                     <button
                     type="submit"
                     className="bg-cyan-950 text-white px-4 py-2 rounded"
                     >
                     Save
                     </button>
                  )}
               </div>
               </form>
            </div>
        </main>
      </div>
    </div>
    
  )
}

export default UserProfile
