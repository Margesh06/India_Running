// import React, { useState } from 'react';
// import { ArrowLeft, Rocket, Upload } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// export function EventForm() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [submittedEventId, setSubmittedEventId] = useState<number | null>(null);
//   const [submittedCategoryId, setSubmittedCategoryId] = useState<number | null>(null);

//   const [formData, setFormData] = useState({
    
//     name: "",
//     description: "",
//     venue: "",
//     gallery_images: [] as string[],
//     organiser_id: "1", 
//     event_type: "OnGround",
//     activity_type: "Running",
//     start_date: "",
//     end_date: "",
//     reg_close_date: "",
//     country: "india",
//     state: "",
//     city: "",
//     pincode: "",
//     area: "",
//     banner_image: "",
//     mobile_banner: "",
    
//     // Step 3 data (Category)
//     title: "",
//     price: 0,
//     additionalInfo: "",
//     ageLimitMin: 18,
//     ageLimitMax: 50,
//     inclusive: [] as string[],
//   });

//   const handleInputChange = (name: string, value: any) => {
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (name: string, file: File) => {
//     // In a real app, you'd upload this file to a server and get back a URL
//     // For now, we'll just store the filename
//     setFormData((prev) => ({ ...prev, [name]: file.name }));
//   };

//   const handleGalleryImages = (files: FileList) => {
//     // In a real app, you'd upload these files to a server and get back URLs
//     // For now, we'll just store the filenames
//     const fileNames = Array.from(files).map(file => file.name);
//     setFormData((prev) => ({
//       ...prev,
//       gallery_images: [...prev.gallery_images, ...fileNames].slice(0, 10),
//     }));
//   };

//   const handleNext = () => {
//     setCurrentStep(2);
//   };

//   const handlePrevious = () => {
//     setCurrentStep(1);
//   };

//   const handlesecnex = async () => {
//     try {
//       // Submit event data when moving from step 2 to 3
//       const eventData = {
//         name: formData.name,
//         description: formData.description,
//         venue: formData.venue,
//         gallery_images: formData.gallery_images,
//         organiser_id: formData.organiser_id,
//         event_type: formData.event_type,
//         activity_type: formData.activity_type,
//         start_date: new Date(formData.start_date).toISOString(),
//         end_date: new Date(formData.end_date).toISOString(),
//         reg_close_date: new Date(formData.reg_close_date).toISOString(),
//         country: formData.country,
//         state: formData.state,
//         city: formData.city,
//         pincode: formData.pincode,
//         area: formData.area,
//         banner_image: formData.banner_image,
//         mobile_banner: formData.mobile_banner,
//       };

//       const response = await fetch('http://localhost:5000/events', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(eventData),
//       });

//       if (!response.ok) throw new Error('Failed to submit event');
      
//       const result = await response.json();
//       setSubmittedEventId(result.id); // Store the event ID
//       setCurrentStep(3);
//     } catch (error) {
//       console.error('Error submitting event:', error);
//       alert('Failed to submit event. Please try again.');
//     }
//   };

//   const handleUpdateTicket = async () => {
//     try {
//       // Submit category data
//       const categoryData = {
//         title: formData.title,
//         price: Number(formData.price),
//         additionalInfo: formData.additionalInfo,
//         ageLimitMin: Number(formData.ageLimitMin),
//         ageLimitMax: Number(formData.ageLimitMax),
//         inclusive: formData.inclusive,
//       };

//       const categoryResponse = await fetch('http://localhost:5000/category', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(categoryData),
//       });

//       if (!categoryResponse.ok) throw new Error('Failed to submit category');
      
//       const categoryResult = await categoryResponse.json();
//       setSubmittedCategoryId(categoryResult.id);

//       // Submit event-category relationship
//       if (submittedEventId && categoryResult.id) {
//         const eventCategoryData = {
//           eventId: submittedEventId,
//           categoryId: categoryResult.id,
//         };

//         const eventCategoryResponse = await fetch('http://localhost:5000/event-categories', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(eventCategoryData),
//         });

//         if (!eventCategoryResponse.ok) throw new Error('Failed to link event and category');
//       }

//       // Show success message
//       alert('Event and category created successfully!');
//     } catch (error) {
//       console.error('Error submitting category:', error);
//       alert('Failed to submit category. Please try again.');
//     }
//   };

//   const [selectedActivity, setSelectedActivity] = useState(null);

//   const handleClick = (activity) => {
//     setSelectedActivity(activity === selectedActivity ? null : activity);
//     handleInputChange('activity_type', activity === selectedActivity ? null : activity);
//   };

//   if (currentStep === 3) {
//     return (
//       <div className="min-h-screen bg-white">
//         {/* Banner */}
//         <div className="bg-[#E5F9FF] p-4">
//           <p className="text-center flex items-center justify-center gap-2">
//             🎉 Wohoo! Welcome onboard. Create your First Event in 3 simple steps!!
//           </p>
//         </div>

//         <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-[1fr,300px] gap-6">
//           <div className="space-y-8">
//             {/* Progress Steps */}
//             <div className="grid grid-cols-3 gap-4">
//               <div className="relative">
//                 <div className="h-2 bg-green-500 rounded-full" />
//                 <h2 className="mt-2 text-sm font-medium">Event Information</h2>
//               </div>
//               <div className="relative">
//                 <div className="h-2 bg-[#FFA800] rounded-full" />
//                 <h2 className="mt-2 text-sm font-medium">Event Details</h2>
//               </div>
//               <div className="relative">
//                 <div className="h-2 bg-red-400 rounded-full" />
//                 <h2 className="mt-2 text-sm font-medium">Ticket</h2>
//               </div>
//             </div>

//             {/* Form */}
//             <form className="space-y-4" onSubmit={(e) => {
//               e.preventDefault();
//               handleUpdateTicket();
//             }}>
//               {/* Activity Type */}
//               <div className="border-2">
//                 <div className="h-11 bg-blue-100 "> </div>
//                 <div className="mb-6 p-5 ">
//                   <div className="mb-6 p-5 ">
//                     <label className="text-sm font-medium flex items-center gap-4 mb-3">
//                       Activity Type<span className="text-red-600 mx-3">*</span>
//                       <span className="flex gap-4 mt-2">
//                         <button
//                           type="button"
//                           className={`flex items-center text-cyan-500  gap-2 border p-2 rounded-lg ${selectedActivity === "running" ? "border-cyan-500" : "border-gray-300"}`}
//                           onClick={() => handleClick("running")}
//                         >
//                           <span className={`w-4 h-4 rounded-full ${selectedActivity === "running" ? "bg-blue-500" : "bg-white"} border`}></span>
//                           <span><img src="https://organiser.indiarunning.com/static/media/Running.cab9afedf27d474c039e1509e8309822.svg" alt="" /></span>
//                           Running
//                         </button>
//                         <button
//                           type="button"
//                           className={`flex items-center text-pink-600 gap-2 border p-2 rounded-lg ${selectedActivity === "cycling" ? "border-pink-600" : "border-gray-300"}`}
//                           onClick={() => handleClick("cycling")}
//                         >
//                           <span className={`w-4 h-4 rounded-full ${selectedActivity === "cycling" ? "bg-blue-500" : "bg-white"} border`}></span>
//                           <span><img src="https://organiser.indiarunning.com/static/media/Cycling.4524582a18c5742ea2bf2054aa2c08fb.svg" alt="" /></span>
//                           Cycling
//                         </button>
//                       </span>
//                     </label>
//                   </div>

//                   {/* Distance */}
//                   <div className="mb-6 p-5">
//                     <label className="flex text-sm font-medium">Distance <span className="text-red-600 mx-3">*</span>
//                       <select 
//                         className="w[30px] p-2 border rounded-lg"
//                         value={formData.title}
//                         onChange={(e) => handleInputChange('title', e.target.value)}
//                       >
//                         <option value=""></option>
//                         <option value="5K">5K</option>
//                         <option value="10K">10K</option>
//                         <option value="Half Marathon">Half Marathon</option>
//                       </select>
//                     </label>
//                   </div>

//                   {/* Additional Information */}
//                   <div className="mb-6 p-5">
//                     <label className="flex text-sm font-medium">Additional Information <span className="text-red-500 mx-3">*</span>
//                       <input
//                         type="text"
//                         maxLength={15}
//                         placeholder="Important info (max 15 characters)"
//                         className="w-full p-2 border rounded-lg"
//                         value={formData.additionalInfo}
//                         onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
//                       />
//                     </label>
//                   </div>

//                   {/* Event Type */}
//                   <div className="mb-6 p-5">
//                     <label className="flex text-sm font-medium">Event Type <span className="text-red-500 mx-3">*</span>
//                       <div className="flex gap-4">
//                         <button 
//                           type="button" 
//                           className="flex items-center gap-2 border text-orange-500 p-2 rounded-lg"
//                           onClick={() => handleInputChange('event_type', 'OnGround')}
//                         >
//                           <input type="radio" checked={formData.event_type === 'OnGround'} readOnly />
//                           <span><img src="https://organiser.indiarunning.com/static/media/MapPinRange.fda9ca3f8eab431091cfb000312815ff.svg" alt="" /></span> 
//                           On-Ground
//                         </button>
//                       </div>
//                     </label>
//                   </div>

//                   {/* Ticket Price */}
//                   <div className="mb-6 p-5">
//                     <label className="flex text-sm font-medium">Ticket Price <span className="text-red-500 m-3">*</span>
//                       <div className="flex gap-2">
//                         <span className="p-2 bg-gray-100 border rounded-lg">INR</span>
//                         <input 
//                           type="number" 
//                           placeholder="Enter price" 
//                           className="w-full p-2 border rounded-lg"
//                           value={formData.price}
//                           onChange={(e) => handleInputChange('price', e.target.value)}
//                         />
//                       </div>
//                     </label>
//                   </div>

//                   {/* Age Limit */}
//                   <div className="flex gap-4 text-sm mb-6 p-5">Age Limit for Registration <span className="text-red-500 mx-3">*</span>
//                     <div>
//                       <label className="block text-sm font-medium"></label>
//                       <input 
//                         type="number" 
//                         placeholder="Minimum Age" 
//                         className="w-full p-2 border rounded-lg"
//                         value={formData.ageLimitMin}
//                         onChange={(e) => handleInputChange('ageLimitMin', e.target.value)}
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium"></label>
//                       <input 
//                         placeholder="Maximum Age (optional)" 
//                         type="number" 
//                         className="w-full p-2 border rounded-lg"
//                         value={formData.ageLimitMax}
//                         onChange={(e) => handleInputChange('ageLimitMax', e.target.value)}
//                       />
//                     </div>
//                   </div>

//                   {/* Inclusives */}
//                   <div className="mb-6 p-3">
//                     <label className="flex text-sm font-medium mx-3">Inclusives
//                       <select 
//                         className="w-full p-3 mx-7 border rounded-lg"
//                         multiple
//                         value={formData.inclusive}
//                         onChange={(e) => {
//                           const selected = Array.from(e.target.selectedOptions, option => option.value);
//                           handleInputChange('inclusive', selected);
//                         }}
//                       >
//                         <option value="Medal">Medal</option>
//                         <option value="T-Shirt">T-Shirt</option>
//                         <option value="Certificate">Certificate</option>
//                         <option value="Refreshments">Refreshments</option>
//                       </select>
//                     </label>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex justify-center gap-4">
//                 <Button type="submit" className="bg-[#FF1F8E] hover:bg-[#FF1F8E]/90 flex justify-between">
//                   Update Ticket
//                 </Button>
//               </div>
//             </form>
//           </div>

//           {/* Sidebar */}
//           <div className="border rounded-lg p-6">
//             <div className="flex items-start gap-3">
//               <div className="h-12 w-12 rounded-lg bg-[#FF1F8E]/10 flex items-center justify-center text-[#FF1F8E]">
//                 <Rocket className="h-6 w-6" />
//               </div>
//               <div>
//                 <h3 className="font-semibold">Congrats! Lets get started.</h3>
//                 <p className="text-sm text-gray-600 mt-1">
//                   Lets get the Basics right. This information is essential for your audience.
//                 </p>
//               </div>
//             </div>
//             <div className="mt-6">
//               <h4 className="font-medium">Your event, your way! Here&apos;s how you do it</h4>
//               <Button variant="outline" className="mt-4 w-full border-[#FF1F8E] text-[#FF1F8E] hover:bg-[#FF1F8E]/10">
//                 Event Creation Guidebook
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (currentStep === 2) {
//     return (
//       <div className="min-h-screen bg-white">
//         {/* Banner */}
//         <div className="bg-[#E5F9FF] p-4">
//           <p className="text-center flex items-center justify-center gap-2">
//             🎉 Wohoo! Welcome onboard. Create your First Event in 3 simple steps!!
//           </p>
//         </div>

//         <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-[1fr,300px] gap-6">
//           <div className="space-y-8">
//             {/* Progress Steps */}
//             <div className="grid grid-cols-3 gap-4">
//               <div className="relative">
//                 <div className="h-2 bg-green-500 rounded-full" />
//                 <h2 className="mt-2 text-sm font-medium">Event Information</h2>
//               </div>
//               <div className="relative">
//                 <div className="h-2 bg-[#FFA800] rounded-full" />
//                 <h2 className="mt-2 text-sm font-medium">Event Details</h2>
//               </div>
//               <div className="relative">
//                 <div className="h-2 bg-gray-200 rounded-full" />
//                 <h2 className="mt-2 text-sm font-medium">Ticket</h2>
//               </div>
//             </div>

//             {/* Form */}
//             <form className="space-y-6" onSubmit={(e) => {
//               e.preventDefault();
//               handlesecnex();
//             }}>
//               <div className="space-y-4">
//                 <div>
//                   <Label>About Race</Label>
//                   <Textarea
//                     placeholder="Add more details to your event like your schedule, sponsors, or featured guests"
//                     className="min-h-[200px] mt-1.5"
//                     value={formData.description}
//                     onChange={(e) => handleInputChange("description", e.target.value)}
//                   />
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label>Web Banner</Label>
//                     <div className="border-2 border-dashed rounded-lg p-6 text-center">
//                       <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
//                       <div className="text-sm text-gray-600">
//                         <input
//                           type="file"
//                           onChange={(e) => e.target.files && handleFileChange('banner_image', e.target.files[0])}
//                           className="hidden"
//                           id="web-banner"
//                         />
//                         <label htmlFor="web-banner" className="text-blue-500 cursor-pointer">
//                           Browse
//                         </label>{" "}
//                         or Drop files to Attach
//                       </div>
//                       <p className="text-xs text-gray-500 mt-1">Only PNG or JPEG, Max: 2MB Dimensions: 1024x576</p>
//                       {formData.banner_image && (
//                         <p className="text-sm text-gray-600 mt-2">Selected: {formData.banner_image}</p>
//                       )}
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <Label>Mobile Banner</Label>
//                     <div className="border-2 border-dashed rounded-lg p-6 text-center">
//                       <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
//                       <div className="text-sm text-gray-600">
//                         <input
//                           type="file"
//                           onChange={(e) => e.target.files && handleFileChange('mobile_banner', e.target.files[0])}
//                           className="hidden"
//                           id="mobile-banner"
//                         />
//                         <label htmlFor="mobile-banner" className="text-blue-500 cursor-pointer">
//                           Browse
//                         </label>{" "}
//                         or Drop files to Attach
//                       </div>
//                       <p className="text-xs text-gray-500 mt-1">Only PNG or JPEG, Max: 2MB Dimensions: 123x180</p>
//                       {formData.mobile_banner && (
//                         <p className="text-sm text-gray-600 mt-2">Selected: {formData.mobile_banner}</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Gallery Images</Label>
//                   <div className="border-2 border-dashed rounded-lg p-6 text-center">
//                     <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
//                     <div className="text-sm text-gray-600">
//                       <input
//                         type="file"
//                         multiple
//                         onChange={(e) => e.target.files && handleGalleryImages(e.target.files)}
//                         className="hidden"
//                         id="gallery-images"
//                       />
//                       <label htmlFor="gallery-images" className="text-blue-500 cursor-pointer">
//                         Browse
//                       </label>{" "}
//                       or Drop files to Attach
//                     </div>
//                     <p className="text-xs text-gray-500 mt-1">
//                       Upload upto 10 images. Only PNG or JPEG with max size of 2MB
//                     </p>
//                   </div>
//                   {formData.gallery_images.length > 0 && (
//                     <div className="mt-2">
//                       <h4 className="text-sm font-medium">Selected Images:</h4>
//                       <ul className="text-sm text-gray-600">
//                         {formData.gallery_images.map((image, index) => (
//                           <li key={index}>{image}</li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="flex gap-4">
//                 <Button type="button" variant="outline" onClick={handlePrevious} className="gap-2">
//                   <ArrowLeft className="w-4 h-4" /> Back
//                 </Button>
//                 <Button type="submit" className="bg-[#FF1F8E] hover:bg-[#FF1F8E]/90">
//                   Save and Proceed
//                 </Button>
//               </div>
//             </form>
//           </div>

//           {/* Sidebar */}
//           <div className="border rounded-lg p-6">
//             <div className="flex items-start gap-3">
//               <div className="h-12 w-12 rounded-lg bg-[#FF1F8E]/10 flex items-center justify-center text-[#FF1F8E]">
//                 <Rocket className="h-6 w-6" />
//               </div>
//               <div>
//                 <h3 className="font-semibold">Congrats! Lets get started.</h3>
//                 <p className="text-sm text-gray-600 mt-1">
//                   Lets get the Basics right. This information is essential for your audience.
//                 </p>
//               </div>
//             </div>
//             <div className="mt-6">
//               <h4 className="font-medium">Your event, your way! Here&apos;s how you do it</h4>
//               <Button variant="outline" className="mt-4 w-full border-[#FF1F8E] text-[#FF1F8E] hover:bg-[#FF1F8E]/90">
//                 Event Creation Guidebook
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Return Step 1 form
//   return (
//     <div className="min-h-screen bg-white">
//       {/* Banner */}
//       <div className="bg-[#E5F9FF] p-4">
//         <p className="text-center flex items-center justify-center gap-2">
//           🎉 Wohoo! Welcome onboard. Create your First Event in 3 simple steps!!
//         </p>
//       </div>

//       <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-[1fr,300px] gap-6">
//         <div className="space-y-8">
//           {/* Progress Steps */}
//           <div className="grid grid-cols-3 gap-4">
//             <div className="relative">
//               <div className="h-2 bg-[#FFA800] rounded-full" />
//               <h2 className="mt-2 text-sm font-medium">Event Information</h2>
//             </div>
//             <div className="relative">
//               <div className="h-2 bg-gray-200 rounded-full" />
//               <h2 className="mt-2 text-sm font-medium">Event Details</h2>
//             </div>
//             <div className="relative">
//               <div className="h-2 bg-gray-200 rounded-full" />
//               <h2 className="mt-2 text-sm font-medium">Ticket</h2>
//             </div>
//           </div>

//           {/* Form */}
//           <form
//             className="space-y-6"
//             onSubmit={(e) => {
//               e.preventDefault();
//               handleNext();
//             }}
//           >
//             <div className="space-y-4">
//               <div>
//                 <Label htmlFor="name">
//                   Event Name <span className="text-red-500">*</span>
//                 </Label>
//                 <Input
//                   id="name"
//                   placeholder="Type your event name here"
//                   className="mt-1.5"
//                   value={formData.name}
//                   onChange={(e) => handleInputChange("name", e.target.value)}
//                 />
//               </div>

//               <div>
//                 <Label>
//                   Event Type <span className="text-red-500">*</span>
//                 </Label>
//                 <RadioGroup
//                   defaultValue="OnGround"
//                   className="grid grid-cols-3 gap-4 mt-1.5"
//                   onValueChange={(value) => handleInputChange("event_type", value)}
//                 >
//                   <div className="border rounded-lg p-4 [&:has(:checked)]:border-[#FFA800] [&:has(:checked)]:bg-[#FFF9ED]">
//                     <RadioGroupItem value="OnGround" id="on-ground" className="sr-only" />
//                     <Label htmlFor="on-ground" className="flex items-center gap-2 cursor-pointer">
//                       <span className="h-4 w-4 rounded-full border border-[#FFA800] inline-flex items-center justify-center">
//                         {formData.event_type === "OnGround" && <span className="h-2 w-2 rounded-full bg-[#FFA800]" />}
//                       </span>
//                       👥 On-Ground
//                     </Label>
//                   </div>
//                   <div className="border rounded-lg p-4 [&:has(:checked)]:border-[#FFA800] [&:has(:checked)]:bg-[#FFF9ED]">
//                     <RadioGroupItem value="Virtual" id="virtual" className="sr-only" />
//                     <Label htmlFor="virtual" className="flex items-center gap-2 cursor-pointer">
//                       <span className="h-4 w-4 rounded-full border border-[#FFA800] inline-flex items-center justify-center">
//                         {formData.event_type === "Virtual" && <span className="h-2 w-2 rounded-full bg-[#FFA800]" />}
//                       </span>
//                       🌐 Virtual
//                     </Label>
//                   </div>
//                   <div className="border rounded-lg p-4 [&:has(:checked)]:border-[#FFA800] [&:has(:checked)]:bg-[#FFF9ED]">
//                     <RadioGroupItem value="Hybrid" id="hybrid" className="sr-only" />
//                     <Label htmlFor="hybrid" className="flex items-center gap-2 cursor-pointer">
//                       <span className="h-4 w-4 rounded-full border border-[#FFA800] inline-flex items-center justify-center">
//                         {formData.event_type === "Hybrid" && <span className="h-2 w-2 rounded-full bg-[#FFA800]" />}
//                       </span>
//                       🌐 👥 On-Ground+Virtual
//                     </Label>
//                   </div>
//                 </RadioGroup>
//               </div>
//               </div>
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="start_date">
//                     Start Date <span className="text-red-500">*</span>
//                   </Label>
//                   <Input
//                     id="start_date"
//                     type="date"
//                     placeholder="dd-mm-yyyy"
//                     className="mt-1.5"
//                     value={formData.start_date}
//                     onChange={(e) => handleInputChange("start_date", e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="end_date">
//                     End Date <span className="text-red-500">*</span>
//                   </Label>
//                   <Input
//                     id="end_date"
//                     type="date"
//                     placeholder="dd-mm-yyyy"
//                     className="mt-1.5"
//                     value={formData.end_date}
//                     onChange={(e) => handleInputChange("end_date", e.target.value)}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <Label htmlFor="reg_close_date">
//                   Registration Close Date <span className="text-red-500">*</span>
//                 </Label>
//                 <Input
//                   id="reg_close_date"
//                   type="date"
//                   placeholder="dd-mm-yyyy"
//                   className="mt-1.5"
//                   value={formData.reg_close_date}
//                   onChange={(e) => handleInputChange("reg_close_date", e.target.value)}
//                 />
//               </div>

//               {(formData.event_type === "OnGround" || formData.event_type === "Hybrid") && (
//                 <><div className="space-y-4">
//                   <div>
//                     <Label htmlFor="venue">Venue</Label>
//                     <Input
//                       id="venue"
//                       placeholder="Search venue here"
//                       className="mt-1.5"
//                       value={formData.venue}
//                       onChange={(e) => handleInputChange("venue", e.target.value)} />
//                   </div>

//                   <div className="grid md:grid-cols-2 gap-4">
//                     <div>
//                       <div>
//                         <Label htmlFor="area">
//                           Area <span className="text-red-500">*</span>
//                         </Label>
//                         <Input
//                           id="area"
//                           placeholder="Area"
//                           className="mt-1.5"
//                           value={formData.area}
//                           onChange={(e) => handleInputChange("area", e.target.value)} />
//                       </div>
//                       <div>
//                         <Label htmlFor="city">
//                           City <span className="text-red-500">*</span>
//                         </Label>
//                         <Input
//                           id="city"
//                           placeholder="City"
//                           className="mt-1.5"
//                           value={formData.city}
//                           onChange={(e) => handleInputChange("city", e.target.value)} />
//                       </div>
//                     </div>

//                     <div className="grid md:grid-cols-2 gap-4">
//                       <div>
//                         <Label htmlFor="state">
//                           State <span className="text-red-500">*</span>
//                         </Label>
//                         <Input
//                           id="state"
//                           placeholder="State"
//                           className="mt-1.5"
//                           value={formData.state}
//                           onChange={(e) => handleInputChange("state", e.target.value)} />
//                       </div>
//                       <div>
//                         <Label htmlFor="pincode">
//                           PinCode <span className="text-red-500">*</span>
//                         </Label>
//                         <Input
//                           id="pincode"
//                           placeholder="Pincode"
//                           className="mt-1.5"
//                           value={formData.pincode}
//                           onChange={(e) => handleInputChange("pincode", e.target.value)} />
//                       </div>
//                     </div>

//                     <div>
//                       <Label htmlFor="country">
//                         Country <span className="text-red-500">*</span>
//                       </Label>
//                       <Select defaultValue="india" onValueChange={(value) => handleInputChange("country", value)}>
//                         <SelectTrigger className="mt-1.5">
//                           <SelectValue placeholder="Select country" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="india">India</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>
//                   ){'}'}
//                 </div><Button type="submit" className="w-full md:w-auto bg-[#FF1F8E] hover:bg-[#FF1F8E]/90">
//                     Save and Proceed
//                   </Button></>
//              )} </form>
//         </div>

//         {/* Sidebar */}
//         <div className="border rounded-lg p-6">
//           <div className="flex items-start gap-3">
//             <div className="h-12 w-12 rounded-lg bg-[#FF1F8E]/10 flex items-center justify-center text-[#FF1F8E]">
//               <Rocket className="h-6 w-6" />
//             </div>
//             <div>
//               <h3 className="font-semibold">Congrats! Lets get started.</h3>
//               <p className="text-sm text-gray-600 mt-1">
//                 Lets get the Basics right. This information is essential for your audience.
//               </p>
//             </div>
//           </div>
//           <div className="mt-6">
//             <h4 className="font-medium">Your event, your way! Here&apos;s how you do it</h4>
//             <Button variant="outline" className="mt-4 w-full border-[#FF1F8E] text-[#FF1F8E] hover:bg-[#FF1F8E]/90">
//               Event Creation Guidebook
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EventForm;



import React, { useState, useEffect } from 'react';
import { ArrowLeft, Rocket, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import {jwtDecode} from 'jwt-decode';

interface CustomJwtPayload {
  id: string; // Define 'id' as the expected field in your JWT payload
}

export function EventForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submittedEventId, setSubmittedEventId] = useState<number | null>(null);
  const [submittedCategoryId, setSubmittedCategoryId] = useState<number | null>(null);
  const [addedTickets, setAddedTickets] = useState<Array<{
    additionalInfo: string;
    title: string;
    price: number;
    ageLimitMin: number;
    ageLimitMax: number;
    inclusive: string[];
  }>>([]);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    venue: "",
    gallery_images: [] as string[],
    organiser_id: "", 
    event_type: "OnGround",
    activity_type: "",
    start_date: "",
    end_date: "",
    reg_close_date: "",
    country: "india",
    state: "",
    city: "",
    pincode: "",
    area: "",
    banner_image: null as File | null,
    mobile_banner: null as File | null,
    
    // Step 3 data (Category)
    title: "",
    price: 0,
    additionalInfo: "",
    ageLimitMin: 18,
    ageLimitMax: 50,
    inclusive: [] as string[],
  });

  const inclusiveOptions = [
    { id: "Medals", label: "Medals" },
    { id: "Tshirt", label: "Tshirt" },
    { id: "E-Certificate", label: "E-Certificate" },
    { id: "Refreshments", label: "Refreshments" }
  ];

  useEffect(() => {
    const token = localStorage.getItem("organiserToken");

    if (token) {
      try {
        // Decode the token to get the organiser_id (or id)
        const decodedToken = jwtDecode<CustomJwtPayload>(token);
        const organiserId = decodedToken.id;  // Get the 'id' (organiser_id) from the decoded token
        
        // Update formData with the decoded 'organiser_id'
        setFormData((prev) => ({
          ...prev,
          organiser_id: organiserId, // Set the 'organiser_id' in the formData
        }));
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);  // This effect runs once when the component is mounted

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInclusiveChange = (checked: boolean, value: string) => {
    setFormData(prev => ({
      ...prev,
      inclusive: checked 
        ? [...prev.inclusive, value]
        : prev.inclusive.filter(item => item !== value)
    }));
  };

  const handleFileChange = (name: string, file: File) => {
    setFormData((prev) => ({ ...prev, [name]: file }));
  };
  

  const handleGalleryImages = (files: FileList) => {
    const fileNames = Array.from(files).map(file => file.name);
    setFormData((prev) => ({
      ...prev,
      gallery_images: [...prev.gallery_images, ...fileNames].slice(0, 10),
    }));
  };

  const handleNext = () => {
    setCurrentStep(2);
  };

  const handlePrevious = () => {
    setCurrentStep(1);
  };

  const handlesecnex = () => {
    setCurrentStep(3);
  };

  const handleUpdateTicket = async () => {
    try {
      // Add the ticket to the list of added tickets
      setAddedTickets(prev => [
        ...prev,
        {
          title: formData.title,
          price: Number(formData.price),
          ageLimitMin: Number(formData.ageLimitMin),
          ageLimitMax: Number(formData.ageLimitMax),
          inclusive: formData.inclusive,
          additionalInfo: "" // Provide a default value or retrieve it from formData
        }
      ]);

      // Reset form data for new ticket
      setFormData(prev => ({
        ...prev,
        title: "",
        price: 0,
        additionalInfo: "",
        ageLimitMin: 18,
        ageLimitMax: 50,
        inclusive: [],
      }));

      alert('Ticket category created successfully!');
    } catch (error) {
      console.error('Error creating ticket:', error);
      alert('Failed to create ticket. Please try again.');
    }
  };

  const handleAddAnotherTicket = () => {
    setFormData(prev => ({
      ...prev,
      title: "",
      price: 0,
      additionalInfo: "",
      ageLimitMin: 18,
      ageLimitMax: 50,
      inclusive: [],
    }));
  };

  const handleFinish = async () => {
    try {
      // Function to upload image to ImgBB
      const uploadImage = async (imageFile: File) => {
        if (!imageFile || !(imageFile instanceof File)) {
          console.error("Invalid image file:", imageFile);
          throw new Error("Invalid image file");
        }
  
        const formData = new FormData();
        formData.append("image", imageFile);
  
        const response = await fetch(
          "https://api.imgbb.com/1/upload?key=ce4f9ca69b51993d4ec69a5b4f0aa874",
          {
            method: "POST",
            body: formData,
          }
        );
  
        if (!response.ok) throw new Error("Failed to upload image");
  
        const result = await response.json();
        return result.data.display_url;
      };
    
      // Upload the banner and mobile banner images
      const bannerImageUrl = formData.banner_image
        ? await uploadImage(formData.banner_image) // Pass File object here
        : null;
      const mobileBannerUrl = formData.mobile_banner
        ? await uploadImage(formData.mobile_banner) // Pass File object here
        : null;
  
      // Prepare event data
      const eventData = {
        name: formData.name,
        description: formData.description,
        venue: formData.venue,
        gallery_images: formData.gallery_images,
        organiser_id: formData.organiser_id,
        event_type: formData.event_type,
        activity_type: formData.activity_type,
        start_date: new Date(formData.start_date).toISOString(),
        end_date: new Date(formData.end_date).toISOString(),
        reg_close_date: new Date(formData.reg_close_date).toISOString(),
        country: formData.country,
        state: formData.state,
        city: formData.city,
        pincode: formData.pincode,
        area: formData.area,
        banner_image: bannerImageUrl, // Use uploaded URL
        mobile_banner: mobileBannerUrl, // Use uploaded URL
      };
  
      console.log("Submitting event data:", eventData);
  
      // Submit event data
      const eventResponse = await fetch("http://localhost:5000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });
  
      if (!eventResponse.ok) throw new Error("Failed to submit event");
  
      const eventResult = await eventResponse.json();
      const eventId = eventResult.id;
  
      // Submit ticket categories
      for (const ticket of addedTickets) {
        const categoryData = {
          title: ticket.title,
          price: ticket.price,
          additionalInfo: ticket.additionalInfo || "",
          ageLimitMin: ticket.ageLimitMin,
          ageLimitMax: ticket.ageLimitMax,
          inclusive: ticket.inclusive,
        };
  
        const categoryResponse = await fetch("http://localhost:5000/category", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(categoryData),
        });
  
        if (!categoryResponse.ok) throw new Error("Failed to submit category");
  
        const categoryResult = await categoryResponse.json();
  
        // Link event and category
        const eventCategoryData = {
          eventId: eventId,
          categoryId: categoryResult.id,
        };
  
        const eventCategoryResponse = await fetch("http://localhost:5000/event-categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventCategoryData),
        });
  
        if (!eventCategoryResponse.ok) throw new Error("Failed to link event and category");
      }
  
      alert("Event creation completed successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error submitting event:", error);
      alert("Failed to submit event. Please try again.");
    }
  };
  
  

  const [selectedActivity, setSelectedActivity] = useState(null);

  const handleClick = (activity) => {
    setSelectedActivity(activity === selectedActivity ? null : activity);
    handleInputChange('activity_type', activity === selectedActivity ? null : activity);
  };

  if (currentStep === 3) {
    return (
      <div className="min-h-screen bg-white">
        {/* Banner */}
        <div className="bg-[#E5F9FF] p-4">
          <p className="text-center flex items-center justify-center gap-2">
            🎉 Wohoo! Welcome onboard. Create your First Event in 3 simple steps!!
          </p>
        </div>

        <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-[1fr,300px] gap-6">
          <div className="space-y-8">
            {/* Progress Steps */}
            <div className="grid grid-cols-3 gap-4">
              <div className="relative">
                <div className="h-2 bg-green-500 rounded-full" />
                <h2 className="mt-2 text-sm font-medium">Event Information</h2>
              </div>
              <div className="relative">
                <div className="h-2 bg-green-500 rounded-full" />
                <h2 className="mt-2 text-sm font-medium">Event Details</h2>
              </div>
              <div className="relative">
                <div className="h-2 bg-[#FFA800] rounded-full" />
                <h2 className="mt-2 text-sm font-medium">Ticket</h2>
              </div>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              handleUpdateTicket();
            }}>
              {/* Activity Type */}
              <div className="border-2">
                <div className="h-11 bg-blue-100 "> </div>
                <div className="mb-6 p-5 ">
                  <div className="mb-6 p-5 ">
                    <label className="text-sm font-medium flex items-center gap-4 mb-3">
                      Activity Type<span className="text-red-600 mx-3">*</span>
                      <span className="flex gap-4 mt-2">
                        <button
                          type="button"
                          className={`flex items-center text-cyan-500  gap-2 border p-2 rounded-lg ${selectedActivity === "Running" ? "border-cyan-500" : "border-gray-300"}`}
                          onClick={() => handleClick("Running")}
                        >
                          <span className={`w-4 h-4 rounded-full ${selectedActivity === "Running" ? "bg-blue-500" : "bg-white"} border`}></span>
                          <span><img src="https://organiser.indiarunning.com/static/media/Running.cab9afedf27d474c039e1509e8309822.svg" alt="" /></span>
                          Running
                        </button>
                        <button
                          type="button"
                          className={`flex items-center text-pink-600 gap-2 border p-2 rounded-lg ${selectedActivity === "Cycling" ? "border-pink-600" : "border-gray-300"}`}
                          onClick={() => handleClick("Cycling")}
                        >
                          <span className={`w-4 h-4 rounded-full ${selectedActivity === "Cycling" ? "bg-blue-500" : "bg-white"} border`}></span>
                          <span><img src="https://organiser.indiarunning.com/static/media/Cycling.4524582a18c5742ea2bf2054aa2c08fb.svg" alt="" /></span>
                          Cycling
                        </button>
                      </span>
                    </label>
                  </div>

                  {/* Distance */}
                  <div className="mb-6 p-5">
                    <label className="flex text-sm font-medium">Distance <span className="text-red-600 mx-3">*</span>
                      <select 
                        className="w[30px] p-2 border rounded-lg"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                      >
                        <option value=""></option>
                        <option value="5K">5K</option>
                        <option value="10K">10K</option>
                        <option value="Half Marathon">Half Marathon</option>
                      </select>
                    </label>
                  </div>

                  {/* Additional Information */}
                  <div className="mb-6 p-5">
                    <label className="flex text-sm font-medium">Additional Information <span className="text-red-500 mx-3">*</span>
                      <input
                        type="text"
                        maxLength={15}
                        placeholder="Important info (max 15 characters)"
                        className="w-full p-2 border rounded-lg"
                        value={formData.additionalInfo}
                        onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                      />
                    </label>
                  </div>

                  {/* Event Type */}
                  <div className="mb-6 p-5">
                    <label className="flex text-sm font-medium">Event Type <span className="text-red-500 mx-3">*</span>
                      <div className="flex gap-4">
                        <button 
                          type="button" 
                          className="flex items-center gap-2 border text-orange-500 p-2 rounded-lg"
                          onClick={() => handleInputChange('event_type', 'OnGround')}
                        >
                          <input type="radio" checked={formData.event_type === 'OnGround'} readOnly />
                          <span><img src="https://organiser.indiarunning.com/static/media/MapPinRange.fda9ca3f8eab431091cfb000312815ff.svg" alt="" /></span> 
                          On-Ground
                        </button>
                      </div>
                    </label>
                  </div>

                  {/* Ticket Price */}
                  <div className="mb-6 p-5">
                    <label className="flex text-sm font-medium">Ticket Price <span className="text-red-500 m-3">*</span>
                      <div className="flex gap-2">
                        <span className="p-2 bg-gray-100 border rounded-lg">INR</span>
                        <input 
                          type="number" 
                          placeholder="Enter price" 
                          className="w-full p-2 border rounded-lg"
                          value={formData.price}
                          onChange={(e) => handleInputChange('price', e.target.value)}
                        />
                      </div>
                    </label>
                  </div>

                  {/* Age Limit */}
                  <div className="flex gap-4 text-sm mb-6 p-5">Age Limit for Registration <span className="text-red-500 mx-3">*</span>
                    <div>
                      <label className="block text-sm font-medium"></label>
                      <input 
                        type="number" 
                        placeholder="Minimum Age" 
                        className="w-full p-2 border rounded-lg"
                        value={formData.ageLimitMin}
                        onChange={(e) => handleInputChange('ageLimitMin', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium"></label>
                      <input 
                        placeholder="Maximum Age (optional)" 
                        type="number" 
                        className="w-full p-2 border rounded-lg"
                        value={formData.ageLimitMax}
                        onChange={(e) => handleInputChange('ageLimitMax', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Inclusives */}
                  <div className="mb-6 p-3">
                    <Label className="text-sm font-medium mx-3">Inclusives</Label>
                    <div className="space-y-2 mt-2">
                      {inclusiveOptions.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={option.id}
                            checked={formData.inclusive.includes(option.label)}
                            onCheckedChange={(checked) => handleInclusiveChange(checked as boolean, option.label)}
                          />
                          <label
                            htmlFor={option.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4">
                <Button 
                  type="submit" 
                  className="bg-[#FF1F8E] hover:bg-[#FF1F8E]/90"
                >
                  Add Category
                </Button>
                <Button 
                  type="button"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={handleFinish}
                >
                  Finish
                </Button>
              </div>
            </form>

            {/* Display existing tickets */}
            {addedTickets.length > 0 && (
              <div className="mt-6 p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Added Tickets</h3>
                {addedTickets.map((ticket, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded mb-2">
                    <div>
                      <p className="font-medium">{ticket.title}</p>
                      <p className="text-sm text-gray-600">₹{ticket.price}</p>
                    </div>
                    <div className="text-sm text-gray-600">
                      Age: {ticket.ageLimitMin}-{ticket.ageLimitMax}
                    </div>
                    <div className="text-sm text-gray-600">
                      Inclusives: {ticket.inclusive.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="border rounded-lg p-6">
            <div className="flex items-start gap-3">
              <div className="h-12 w-12 rounded-lg bg-[#FF1F8E]/10 flex items-center justify-center text-[#FF1F8E]">
                <Rocket className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Congrats! Lets get started.</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Lets get the Basics right. This information is essential for your audience.
                </p>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="font-medium">Your event, your way! Here&apos;s how you do it</h4>
              <Button variant="outline" className="mt-4 w-full border-[#FF1F8E] text-[#FF1F8E] hover:bg-[#FF1F8E]/10">
                Event Creation Guidebook
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-white">
        {/* Banner */}
        <div className="bg-[#E5F9FF] p-4">
          <p className="text-center flex items-center justify-center gap-2">
            🎉 Wohoo! Welcome onboard. Create your First Event in 3 simple steps!!
          </p>
        </div>

        <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-[1fr,300px] gap-6">
          <div className="space-y-8">
            {/* Progress Steps */}
            <div className="grid grid-cols-3 gap-4">
              <div className="relative">
                <div className="h-2 bg-green-500 rounded-full" />
                <h2 className="mt-2 text-sm font-medium">Event Information</h2>
              </div>
              <div className="relative">
                <div className="h-2 bg-[#FFA800] rounded-full" />
                <h2 className="mt-2 text-sm font-medium">Event Details</h2>
              </div>
              <div className="relative">
                <div className="h-2 bg-gray-200 rounded-full" />
                <h2 className="mt-2 text-sm font-medium">Ticket</h2>
              </div>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={(e) => {
              e.preventDefault();
              handlesecnex();
            }}>
              <div className="space-y-4">
                <div>
                  <Label>About Race</Label>
                  <Textarea
                    placeholder="Add more details to your event like your schedule, sponsors, or featured guests"
                    className="min-h-[200px] mt-1.5"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Web Banner</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <div className="text-sm text-gray-600">
                        <input
                          type="file"
                          onChange={(e) => e.target.files && handleFileChange('banner_image', e.target.files[0])}
                          accept='image/*'
                          className="hidden"
                          id="web-banner"
                        />
                        <label htmlFor="web-banner" className="text-blue-500 cursor-pointer">
                          Browse
                        </label>{" "}
                        or Drop files to Attach
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Only PNG or JPEG, Max: 2MB Dimensions: 1024x576</p>
                      {formData.banner_image && (
                        <p className="text-sm text-gray-600 mt-2">Selected: {formData.banner_image.name}</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Mobile Banner</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <div className="text-sm text-gray-600">
                        <input
                          type="file"
                          onChange={(e) => e.target.files && handleFileChange('mobile_banner', e.target.files[0])}
                          accept='image/*'
                          className="hidden"
                          id="mobile-banner"
                        />
                        <label htmlFor="mobile-banner" className="text-blue-500 cursor-pointer">
                          Browse
                        </label>{" "}
                        or Drop files to Attach
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Only PNG or JPEG, Max: 2MB Dimensions: 123x180</p>
                      {formData.mobile_banner && (
                        <p className="text-sm text-gray-600 mt-2">Selected: {formData.mobile_banner.name}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Gallery Images</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <div className="text-sm text-gray-600">
                      <input
                        type="file"
                        multiple
                        onChange={(e) => e.target.files && handleGalleryImages(e.target.files)}
                        className="hidden"
                        id="gallery-images"
                      />
                      <label htmlFor="gallery-images" className="text-blue-500 cursor-pointer">
                        Browse
                      </label>{" "}
                      or Drop files to Attach
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Upload upto 10 images. Only PNG or JPEG with max size of 2MB
                    </p>
                  </div>
                  {formData.gallery_images.length > 0 && (
                    <div className="mt-2">
                      <h4 className="text-sm font-medium">Selected Images:</h4>
                      <ul className="text-sm text-gray-600">
                        {formData.gallery_images.map((image, index) => (
                          <li key={index}>{image}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={handlePrevious} className="gap-2">
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
                <Button type="submit" className="bg-[#FF1F8E] hover:bg-[#FF1F8E]/90">
                  Save and Proceed
                </Button>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="border rounded-lg p-6">
            <div className="flex items-start gap-3">
              <div className="h-12 w-12 rounded-lg bg-[#FF1F8E]/10 flex items-center justify-center text-[#FF1F8E]">
                <Rocket className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Congrats! Lets get started.</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Lets get the Basics right. This information is essential for your audience.
                </p>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="font-medium">Your event, your way! Here&apos;s how you do it</h4>
              <Button variant="outline" className="mt-4 w-full border-[#FF1F8E] text-[#FF1F8E] hover:bg-[#FF1F8E]/90">
                Event Creation Guidebook
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Return Step 1 form
  return (
    <div className="min-h-screen bg-white">
      {/* Banner */}
      <div className="bg-[#E5F9FF] p-4">
        <p className="text-center flex items-center justify-center gap-2">
          🎉 Wohoo! Welcome onboard. Create your First Event in 3 simple steps!!
        </p>
      </div>

      <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-[1fr,300px] gap-6">
        <div className="space-y-8">
          {/* Progress Steps */}
          <div className="grid grid-cols-3 gap-4">
            <div className="relative">
              <div className="h-2 bg-[#FFA800] rounded-full" />
              <h2 className="mt-2 text-sm font-medium">Event Information</h2>
            </div>
            <div className="relative">
              <div className="h-2 bg-gray-200 rounded-full" />
              <h2 className="mt-2 text-sm font-medium">Event Details</h2>
            </div>
            <div className="relative">
              <div className="h-2 bg-gray-200 rounded-full" />
              <h2 className="mt-2 text-sm font-medium">Ticket</h2>
            </div>
          </div>

          {/* Form */}
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleNext();
            }}
          >
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">
                  Event Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Type your event name here"
                  className="mt-1.5"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>

              <div>
                <Label>
                  Event Type <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  defaultValue="OnGround"
                  className="grid grid-cols-3 gap-4 mt-1.5"
                  onValueChange={(value) => handleInputChange("event_type", value)}
                >
                  <div className="border rounded-lg p-4 [&:has(:checked)]:border-[#FFA800] [&:has(:checked)]:bg-[#FFF9ED]">
                    <RadioGroupItem value="OnGround" id="on-ground" className="sr-only" />
                    <Label htmlFor="on-ground" className="flex items-center gap-2 cursor-pointer">
                      <span className="h-4 w-4 rounded-full border border-[#FFA800] inline-flex items-center justify-center">
                        {formData.event_type === "OnGround" && <span className="h-2 w-2 rounded-full bg-[#FFA800]" />}
                      </span>
                      👥 On-Ground
                    </Label>
                  </div>
                  <div className="border rounded-lg p-4 [&:has(:checked)]:border-[#FFA800] [&:has(:checked)]:bg-[#FFF9ED]">
                    <RadioGroupItem value="Virtual" id="virtual" className="sr-only" />
                    <Label htmlFor="virtual" className="flex items-center gap-2 cursor-pointer">
                      <span className="h-4 w-4 rounded-full border border-[#FFA800] inline-flex items-center justify-center">
                        {formData.event_type === "Virtual" && <span className="h-2 w-2 rounded-full bg-[#FFA800]" />}
                      </span>
                      🌐 Virtual
                     </Label>
                  </div>
                  <div className="border rounded-lg p-4 [&:has(:checked)]:border-[#FFA800] [&:has(:checked)]:bg-[#FFF9ED]">
                    <RadioGroupItem value="Hybrid" id="hybrid" className="sr-only" />
                    <Label htmlFor="hybrid" className="flex items-center gap-2 cursor-pointer">
                      <span className="h-4 w-4 rounded-full border border-[#FFA800] inline-flex items-center justify-center">
                        {formData.event_type === "Hybrid" && <span className="h-2 w-2 rounded-full bg-[#FFA800]" />}
                      </span>
                      🌐 👥 On-Ground+Virtual
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start_date">
                    Start Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="start_date"
                    type="date"
                    placeholder="dd-mm-yyyy"
                    className="mt-1.5"
                    value={formData.start_date}
                    onChange={(e) => handleInputChange("start_date", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="end_date">
                    End Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="end_date"
                    type="date"
                    placeholder="dd-mm-yyyy"
                    className="mt-1.5"
                    value={formData.end_date}
                    onChange={(e) => handleInputChange("end_date", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="reg_close_date">
                  Registration Close Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="reg_close_date"
                  type="date"
                  placeholder="dd-mm-yyyy"
                  className="mt-1.5"
                  value={formData.reg_close_date}
                  onChange={(e) => handleInputChange("reg_close_date", e.target.value)}
                />
              </div>

              {(formData.event_type === "OnGround" || formData.event_type === "Hybrid") && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="venue">Venue</Label>
                    <Input
                      id="venue"
                      placeholder="Search venue here"
                      className="mt-1.5"
                      value={formData.venue}
                      onChange={(e) => handleInputChange("venue", e.target.value)}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="area">
                        Area <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="area"
                        placeholder="Area"
                        className="mt-1.5"
                        value={formData.area}
                        onChange={(e) => handleInputChange("area", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">
                        City <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="city"
                        placeholder="City"
                        className="mt-1.5"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="state">
                        State <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="state"
                        placeholder="State"
                        className="mt-1.5"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="pincode">
                        PinCode <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="pincode"
                        placeholder="Pincode"
                        className="mt-1.5"
                        value={formData.pincode}
                        onChange={(e) => handleInputChange("pincode", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="country">
                      Country <span className="text-red-500">*</span>
                    </Label>
                    <Select defaultValue="india" onValueChange={(value) => handleInputChange("country", value)}>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="india">India</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>

            <Button type="submit" className="w-full md:w-auto bg-[#FF1F8E] hover:bg-[#FF1F8E]/90">
              Save and Proceed
            </Button>
          </form>
        </div>

        {/* Sidebar */}
        <div className="border rounded-lg p-6">
          <div className="flex items-start gap-3">
            <div className="h-12 w-12 rounded-lg bg-[#FF1F8E]/10 flex items-center justify-center text-[#FF1F8E]">
              <Rocket className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">Congrats! Lets get started.</h3>
              <p className="text-sm text-gray-600 mt-1">
                Lets get the Basics right. This information is essential for your audience.
              </p>
            </div>
          </div>
          <div className="mt-6">
            <h4 className="font-medium">Your event, your way! Here&apos;s how you do it</h4>
            <Button variant="outline" className="mt-4 w-full border-[#FF1F8E] text-[#FF1F8E] hover:bg-[#FF1F8E]/10">
              Event Creation Guidebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventForm;