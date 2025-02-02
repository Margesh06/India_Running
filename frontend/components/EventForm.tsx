"use client"

import { ArrowLeft, Rocket, Upload } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function EventForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1 data
    eventName: "",
    eventType: "on-ground",
    startDate: "",
    endDate: "",
    location: "",
    address: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    country: "india",
    // Step 2 data
    aboutRace: "",
    webBanner: null,
    mobileBanner: null,
    galleryImages: [],
    termsLink: "",
    faqLink: "",
  })

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (name, file) => {
    setFormData((prev) => ({ ...prev, [name]: file }))
  }

  const handleGalleryImages = (files) => {
    const newFiles = Array.from(files)
    setFormData((prev) => ({
      ...prev,
      galleryImages: [...prev.galleryImages, ...newFiles].slice(0, 10),
    }))
  }

  const handleNext = () => {
    setCurrentStep(2)
  }

  const handlePrevious = () => {
    setCurrentStep(1)
  }

  const handlesecnex = () => {
    setCurrentStep(3)
  }

  const [selectedActivity, setSelectedActivity] = useState(null);

  const handleClick = (activity) => {
    setSelectedActivity(activity === selectedActivity ? null : activity);
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
                <div className="h-2 bg-[#FFA800] rounded-full" />
                <h2 className="mt-2 text-sm font-medium">Event Details</h2>
              </div>
              <div className="relative">
                <div className="h-2 bg-red-400 rounded-full" />
                <h2 className="mt-2 text-sm font-medium">Ticket</h2>
              </div>
            </div>

            {/* Form */}
            <form className="space-y-4 " onSubmit={(e) => {
              e.preventDefault()
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
                          className={`flex items-center text-cyan-500  gap-2 border p-2 rounded-lg ${selectedActivity === "running" ? "border-cyan-500" : "border-gray-300"
                            }`}
                          onClick={() => handleClick("running")}
                        >
                          <span
                            className={`w-4 h-4 rounded-full ${selectedActivity === "running" ? "bg-blue-500" : "bg-white"
                              } border`}
                          ></span><span><img src="https://organiser.indiarunning.com/static/media/Running.cab9afedf27d474c039e1509e8309822.svg" alt="" /></span>
                          Running
                        </button>
                        <button
                          type="button"
                          className={`flex items-center text-pink-600 gap-2 border p-2 rounded-lg ${selectedActivity === "cycling" ? "border-pink-600" : "border-gray-300"
                            }`}
                          onClick={() => handleClick("cycling")}
                        >
                          <span
                            className={`w-4 h-4 rounded-full ${selectedActivity === "cycling" ? "bg-blue-500" : "bg-white"
                              } border`}
                          ></span><span><img src="https://organiser.indiarunning.com/static/media/Cycling.4524582a18c5742ea2bf2054aa2c08fb.svg" alt="" /></span>
                          Cycling
                        </button>
                      </span>
                    </label>

                  </div>

                  {/* Distance */}
                  <div className="mb-6 p-5">
                    <label className="flex text-sm font-medium">Distance <span className="text-red-600 mx-3">  *</span>
                      <select className=" w[30px] p-2 border rounded-lg">
                        <option value=""></option>
                        <option value="5K">5K</option>
                        <option value="10K">10K</option>
                        <option value="Half Marathon">Half Marathon</option>
                      </select>
                    </label>

                  </div>

                  {/* Ticket Name */}
                  <div className="mb-6 p-5 ">
                    <label className="flex text-sm font-medium">Name of the Category <span className="text-red-500 m-3">*</span>
                      <input
                        type="text"
                        placeholder="Type your ticket name here, e.g., Half Marathon 10K"
                        className="w-full p-2 border rounded-lg"
                      />
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
                      />
                    </label>

                  </div>

                  {/* Event Type */}
                  <div className="mb-6 p-5">
                    <label className="flex text-sm font-medium">Event Type <span className="text-red-500 mx-3">*</span>
                      <div className="flex gap-4 ">
                        <button type="button" className="flex items-center gap-2 border text-orange-500 p-2 rounded-lg">
                          <input type="radio" name="" id="" /><span><img src="https://organiser.indiarunning.com/static/media/MapPinRange.fda9ca3f8eab431091cfb000312815ff.svg" alt="" /></span> On-Ground
                        </button>
                      </div>
                    </label>

                  </div>

                  {/* Ticket Price */}
                  <div className="mb-6 p-5">
                    <label className="flex text-sm font-medium">Ticket Price <span className="text-red-500 m-3">*</span>
                      <div className="flex gap-2">
                        <span className="p-2 bg-gray-100 border rounded-lg">INR</span>
                        <input type="number" placeholder="Enter price" className="w-full p-2 border rounded-lg" />
                      </div>
                    </label>

                  </div>

                  {/* Age Limit */}
                  <div className="flex gap-4 text-sm mb-6 p-5">Age Limit for Registration <span className="text-red-500 mx-3">*</span>
                    <div>
                      <label className="block text-sm font-medium" ></label>
                      <input type="number" placeholder="Minimum Age" className="w-full p-2 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium"></label>
                      <input placeholder="Maximum Age (optional)" type="number" className="w-full p-2 border rounded-lg" />
                    </div>
                  </div>

                  {/* Inclusives */}
                  <div className="mb-6 p-3">
                    <label className="flex text-sm font-medium mx-3">Inclusives
                      <select className="w-full p-3 mx-7 border rounded-lg">
                        <option className="text-gray-600" value="">Select the inclusives</option>
                        <option value="Medal">Medal</option>
                        <option value="T-Shirt">T-Shirt</option>
                        <option value="Certificate">Certificate</option>
                      </select>
                    </label>

                  </div>

                  {/* Start & End Date/Time */}
                  <div className="grid grid-cols-2 gap-4 mb-6 p-5">
                    <div>
                      <label className="flex text-sm font-medium">Start Date <input type="date" className="w-full p-2 mx-3 border rounded-lg" /></label>

                    </div>
                    <div>
                      <label className="flex text-sm font-medium">Start Time <input type="time" className="w-full p-2 mx-3 border rounded-lg" /></label>

                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6 p-5">
                    <div>
                      <label className="flex text-sm font-medium">End Date
                        <input type="date" className="w-full p-2 border rounded-lg mx-3" />
                      </label>

                    </div>
                    <div>
                      <label className="flex text-sm font-medium">End Time
                        <input type="time" className="w-full p-2 border rounded-lg mx-3" />
                      </label>

                    </div>
                  </div>
                </div>
                <div className="bg-blue-100 p-4">
                  <label className="block m-6 text-sm font-medium">Registration Period *</label>
                  <div className="grid grid-cols-2 mb-6 p-3 gap-4">
                    <div>
                      <label className="flex text-sm font-medium">Opens on-Date *
                        <input type="date" className="w-full p-2 border rounded-lg" />
                      </label>
                    </div>
                    <div className="mx-6">
                      <label className="flex text-sm font-medium">Time *
                        <input type="time" className="w-full p-2 border rounded-lg" />
                      </label>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 mb-6 p-3 gap-4">
                    <div>
                      <label className="flex text-sm font-medium">Opens on-Date *
                        <input type="date" className="w-full p-2 border rounded-lg" />
                      </label>
                    </div>
                    <div className="mx-6">
                      <label className="flex text-sm font-medium">Time *
                        <input type="time" className="w-full p-2 border rounded-lg" />
                      </label>
                    </div>
                  </div>

                </div>
              </div>
              <div className="flex justify-center gap-4">
                <Button type="submit" className="bg-[#FF1F8E] hover:bg-[#FF1F8E]/90 flex justify-between">
                  Update Ticket
                </Button>
              </div>
            </form>
          </div >
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
        </div >
      </div >
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
              e.preventDefault()
              handlesecnex()
            }}>
              <div className="space-y-4">
                <div>
                  <Label>About Race</Label>
                  <Textarea
                    placeholder="Add more details to your event like your schedule, sponsors, or featured guests"
                    className="min-h-[200px] mt-1.5"
                    value={formData.aboutRace}
                    onChange={(e) => handleInputChange("aboutRace", e.target.value)}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Web Banner</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <div className="text-sm text-gray-600">
                        <button type="button" className="text-blue-500">
                          Browse
                        </button>{" "}
                        or Drop files to Attach
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Only PNG or JPEG, Max: 2MB Dimensions: 1024x576</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Mobile Banner</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <div className="text-sm text-gray-600">
                        <button type="button" className="text-blue-500">
                          Browse
                        </button>{" "}
                        or Drop files to Attach
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Only PNG or JPEG, Max: 2MB Dimensions: 123x180</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Gallery Images</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <div className="text-sm text-gray-600">
                      <button type="button" className="text-blue-500">
                        Browse
                      </button>{" "}
                      or Drop files to Attach
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Upload upto 10 images. Only PNG or JPEG with max size of 2MB
                    </p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="terms">Terms & Conditions</Label>
                  <Input
                    id="terms"
                    placeholder="Add the link to the Terms & Conditions"
                    className="mt-1.5"
                    value={formData.termsLink}
                    onChange={(e) => handleInputChange("termsLink", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="faq">FAQ</Label>
                  <Input
                    id="faq"
                    placeholder="Add the link to the Frequently Asked Questions"
                    className="mt-1.5"
                    value={formData.faqLink}
                    onChange={(e) => handleInputChange("faqLink", e.target.value)}
                  />
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
              <Button variant="outline" className="mt-4 w-full border-[#FF1F8E] text-[#FF1F8E] hover:bg-[#FF1F8E]/10">
                Event Creation Guidebook
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
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
              e.preventDefault()
              handleNext()
            }}
          >
            <div className="space-y-4">
              <div>
                <Label htmlFor="eventName">
                  Event Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="eventName"
                  placeholder="Type your event name here"
                  className="mt-1.5"
                  value={formData.eventName}
                  onChange={(e) => handleInputChange("eventName", e.target.value)}
                />
              </div>

              <div>
                <Label>
                  Event Type <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  defaultValue="on-ground"
                  className="grid grid-cols-3 gap-4 mt-1.5"
                  onValueChange={(value) => handleInputChange("eventType", value)}
                >
                  <div className="border rounded-lg p-4 [&:has(:checked)]:border-[#FFA800] [&:has(:checked)]:bg-[#FFF9ED]">
                    <RadioGroupItem value="on-ground" id="on-ground" className="sr-only" />
                    <Label htmlFor="on-ground" className="flex items-center gap-2 cursor-pointer">
                      <span className="h-4 w-4 rounded-full border border-[#FFA800] inline-flex items-center justify-center">
                        {formData.eventType === "on-ground" && <span className="h-2 w-2 rounded-full bg-[#FFA800]" />}
                      </span>
                      👥 On-Ground
                    </Label>
                  </div>
                  <div className="border rounded-lg p-4 [&:has(:checked)]:border-[#FFA800] [&:has(:checked)]:bg-[#FFF9ED]">
                    <RadioGroupItem value="virtual" id="virtual" className="sr-only" />
                    <Label htmlFor="virtual" className="flex items-center gap-2 cursor-pointer">
                      <span className="h-4 w-4 rounded-full border border-[#FFA800] inline-flex items-center justify-center">
                        {formData.eventType === "virtual" && <span className="h-2 w-2 rounded-full bg-[#FFA800]" />}
                      </span>
                      🌐 Virtual
                    </Label>
                  </div>
                  <div className="border rounded-lg p-4 [&:has(:checked)]:border-[#FFA800] [&:has(:checked)]:bg-[#FFF9ED]">
                    <RadioGroupItem value="hybrid" id="hybrid" className="sr-only" />
                    <Label htmlFor="hybrid" className="flex items-center gap-2 cursor-pointer">
                      <span className="h-4 w-4 rounded-full border border-[#FFA800] inline-flex items-center justify-center">
                        {formData.eventType === "hybrid" && <span className="h-2 w-2 rounded-full bg-[#FFA800]" />}
                      </span>
                      🌐 👥 On-Ground+Virtual
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">
                    Start Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    placeholder="dd-mm-yyyy"
                    className="mt-1.5"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">
                    End Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="endDate"
                    type="date"
                    placeholder="dd-mm-yyyy"
                    className="mt-1.5"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange("endDate", e.target.value)}
                  />
                </div>
              </div>

              {(formData.eventType === "on-ground" || formData.eventType === "hybrid") && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="Search location here"
                      className="mt-1.5"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="address">
                        Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="address"
                        placeholder="line1"
                        className="mt-1.5"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                      />
                    </div>
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
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
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
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
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
  )
}

