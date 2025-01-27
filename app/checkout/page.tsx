"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Link from 'next/link';

export default function Home() {

  const router = useRouter();
  const searchParams = useSearchParams();

  const eventName = searchParams.get('name');
  const eventPrice = searchParams.get('price');

  console.log("lofu", eventName);
  const [formData, setFormData] = useState({
    firstName: "Margesh",
    lastName: "Modi",
    dateOfBirth: "25-03-2004",
    gender: "male",
    email: "margeshmod@flyzipjet.in",
    phone: "+919712121441",
    address: "",
    pincode: ""
  });
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [couponDialogOpen, setCouponDialogOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");



  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveAndContinue = () => {
    if (!formData.firstName || !formData.lastName || !formData.dateOfBirth || !formData.gender || !formData.pincode || !formData.address || !formData.phone || !formData.email) {
      alert("Please fill in all required fields");
      return;
    }
    setShowAdditionalInfo(true);
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout...");
  };

  const handleGoBack = () => {
    if (showAdditionalInfo) {
      setShowAdditionalInfo(false);
    } else {
      router.back();
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f5f5] ">
      {/* Header */}
      <div className="bg-[#004236] text-white py-3  h-[200px] relative">
        <div className="max-w-[1200px] mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-[256px] h-[56px] relative">
              <Image
                src="https://registrations.indiarunning.com/Logo1.svg"
                alt="India Running"
                width={356}
                height={256}
                className="object-contain"
              />
            </div>
          </div>
          <div className="flex items-center">
            <Link href="/userProfile" className="text-gray-600 hover:text-gray-900">
              <img src="/DefaultUserProfile.svg" alt="IR Logo" className="h-11 px-6" />
            </Link>

          </div>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-1/4 text-center mt-2">
          <h1 className="text-4xl font-extrabold tracking-wide">{eventName}</h1>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Left Section */}
          <div className="flex-1">
            <div className="flex items-center gap-1 mb-4">
              <button onClick={handleGoBack} className="text-[#FF1B75] text-sm hover:underline">
                ← Go Back
              </button>
            </div>



            <div className="flex mb-4 h-[100px]">
              <button
                onClick={() => setShowAdditionalInfo(false)}
                className={`flex-1 ${!showAdditionalInfo ? 'bg-[#FFF5F5] border-l-4 border-yellow-400' : 'bg-white'} py-3 px-4`}
              >
                <span className={`text-sm font-medium ${!showAdditionalInfo ? '' : 'text-gray-500'}`}>
                  PERSONAL INFORMATION
                </span>
              </button>
              <button
                onClick={() => setShowAdditionalInfo(true)}
                className={`flex-1 ${showAdditionalInfo ? 'bg-[#FFF5F5] border-l-4 border-yellow-400' : 'bg-white'} py-3 px-4`}
              >
                <span className={`text-sm font-medium ${showAdditionalInfo ? '' : 'text-gray-500'}`}>
                  ADDITIONAL INFORMATION
                </span>
              </button>
            </div>

            <div className="bg-white rounded shadow-sm p-4 mb-4">
              <h2 className="text-sm  mb-3 font-bold text-black">PARTICIPANT ACCOUNT DETAILS</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <p className="text-black font-bold">Email:</p>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">{formData.email}</span>
                    <button
                      onClick={() => setIsEditDialogOpen(true)}
                      className="text-blue-500 text-xs hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-black font-bold">Contact Number:</p>
                  <span className="text-gray-500">{formData.phone}</span>
                </div>
              </div>
            </div>

            {!showAdditionalInfo ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold m-1 p-1">Participant Details</h3>
                  <h4 className="text-xl text-gray-600 m-1 p-1">{eventName}</h4>
                </div>

                <div className="bg-white rounded shadow-sm p-4">
                  <h5 className="text-white font-bold text-2xl h-[60px] flex justify-center items-center mb-4 bg-[#00856F]">{eventName} - Attendee 1 Details</h5>

                  <div className="border border-dashed border-yellow-400 bg-[#FFFBEB] p-3 mb-6 text-xs">
                    <div className="flex gap-1 items-start">
                      <span className="text-red-500">*</span>
                      <span>indicates mandatory fields.</span>
                    </div>
                    <div className="flex gap-1 items-start mt-1">
                      <span>Fields highlighted with</span>
                      <div className="w-3 h-3 relative">
                        <Image
                          src="http://localhost:3000/DefaultUserProfile.svg"
                          alt="Info"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span>are saved to your account.</span>
                    </div>
                  </div>

                  <div className="space-y-4 p-2">
                    <div className="font-bold">PARTICIPANT INFO</div>
                    <div>
                      <Label className="text-sm mb-1">
                        First Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="border-gray-300"
                      />
                    </div>

                    <div>
                      <Label className="text-sm mb-1">
                        Last Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="border-gray-300"
                      />
                    </div>

                    <div>
                      <Label className="text-sm mb-1">
                        Date Of Birth <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        className="border-gray-300"
                      />
                    </div>

                    <div>
                      <Label className="text-sm mb-1">
                        Gender <span className="text-red-500">*</span>
                      </Label>
                      <RadioGroup
                        value={formData.gender}
                        onValueChange={(value) => handleInputChange('gender', value)}
                        className="flex gap-6 mt-2"
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="male" id="male" className="border-gray-300" />
                          <Label htmlFor="male" className="text-sm">Male</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="female" id="female" className="border-gray-300" />
                          <Label htmlFor="female" className="text-sm">Female</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div>
                      <Label className="text-sm mb-1">
                        Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="border-gray-300"
                        required
                      />
                    </div>

                    <div>
                      <Label className="text-sm mb-1">
                        Pincode <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="number"
                        value={formData.pincode}
                        onChange={(e) => handleInputChange('pincode', e.target.value)}
                        className="border-gray-300"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleSaveAndContinue}
                    className="bg-[#FF1B75] hover:bg-[#FF1B75]/90 text-white mt-4 rounded"
                  >
                    Save and Continue
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded shadow-sm p-4">
                <h5 className="text-[#00856F] font-medium mb-4">Additional Information</h5>
                {/* Add additional information form fields here */}
              </div>
            )}
          </div>

          {/* Right Section - Summary */}
          <div className="w-[360px]">
            <Card className="overflow-hidden">
              <div className="bg-[#00856F] text-white p-3">
                <h2 className="font-medium">SUMMARY</h2>
              </div>

              <div className="p-4 space-y-6">
                <div>
                  <h3 className="text-gray-500 text-sm mb-4">EVENT TICKET</h3>
                  <div className="flex justify-between text-sm mb-2">
                    <span>{eventName}</span>
                    <span>Rs. {eventPrice}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Platform Fee</span>
                    <span>Rs. 70.75</span>
                  </div>
                  <button
                    onClick={() => setCouponDialogOpen(true)}
                    className="text-[#00856F] text-xs mt-1 hover:underline"
                  >
                    APPLY COUPON
                  </button>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Amount</span>
                    <span>Rs. {Number(eventPrice) + 70.75}</span>

                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span>Grand Total</span>
                    <span>Rs. {Number(eventPrice) + 70.75}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-gray-100 text-gray-800 py-2 text-sm font-medium rounded hover:bg-gray-200"
                >
                  CHECKOUT
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Contact Information</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </div>
            <Button onClick={() => setIsEditDialogOpen(false)}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Coupon Dialog */}
      <Dialog open={couponDialogOpen} onOpenChange={setCouponDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply Coupon</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Coupon Code</Label>
              <Input
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
              />
            </div>
            <Button onClick={() => setCouponDialogOpen(false)}>Apply</Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}