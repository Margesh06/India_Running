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
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const eventName = searchParams.get('name');
  const eventPrice = searchParams.get('price');
  const eventId = searchParams.get('eventId');

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
    bloodGroup: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    termsAndCondition: false,
    medicalCondition: "",
  });
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [couponDialogOpen, setCouponDialogOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const userResponse = await fetch("http://localhost:5000/users/current", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!userResponse.ok) throw new Error("Failed to fetch user");

        const userData = await userResponse.json();
        setUserId(userData.id);

        const profileResponse = await fetch(`http://localhost:5000/userProfile/${userData.id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!profileResponse.ok) throw new Error("Failed to fetch profile");

        const profileData = await profileResponse.json();
        console.log("pd"+profileData.dob);

        setFormData({
          firstName: userData?.fname,
          lastName: userData?.lname,
          dateOfBirth: profileData?.dob || "",
          gender: profileData?.gender || "",
          email: userData?.email,
          phone: profileData?.phone_no || "",
          address: profileData?.address || "",
          pincode: profileData?.pincode || "",
          bloodGroup: profileData?.bloodGroup || "",
          emergencyContactName: profileData?.emergencyContactName || "",
          emergencyContactNumber: profileData?.emergencyContactNumber || "",
          termsAndCondition: false,
          medicalCondition: "",
        });

      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserProfile();
  }, []);

  // Add validation check function
  const validateForm = () => {
    if (!showAdditionalInfo) {
      // Validate personal information
      return !!(
        formData.firstName &&
        formData.lastName &&
        formData.dateOfBirth &&
        formData.gender &&
        formData.address &&
        formData.pincode &&
        formData.email &&
        formData.phone
      );
    } else {
      // Validate additional information
      return !!(
        formData.emergencyContactName &&
        formData.emergencyContactNumber &&
        formData.bloodGroup &&
        formData.termsAndCondition
      );
    }
  };

  // Update form validity whenever formData changes
  useEffect(() => {
    setIsFormValid(validateForm());
  }, [formData, showAdditionalInfo]);

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


  const logPaymentStatus = (userId, eventId, status) => {
    fetch("http://localhost:5000/payment/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        event_id: eventId,
        status: status,  // Can be PENDING, COMPLETED, FAILED, or REFUNDED
        type: "CARDS",  // Adjust based on actual payment type
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Payment status logged successfully:", data);
      })
      .catch((err) => {
        console.error("Error logging payment status:", err);
      });
  };

  const handleCheckout = () => {
    if (!isFormValid) {
      alert("Please fill in all required fields before proceeding to checkout.");
      return;
    }
  
    // Dynamically load Razorpay script
    const loadRazorpayScript = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };
  
    loadRazorpayScript()
      .then(() => {
        // Create an order on the backend
        return fetch("http://localhost:5000/payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: (Number(eventPrice) + 70.75) * 100,
            currency: "INR",
            userId,
            eventId
          }),          
        });
      })
      .then((res) => res.json())
      .then((order) => {
        const options = {
          key: "rzp_test_1WqWcdSu93kyf7",
          amount: order.amount,
          currency: order.currency,
          name: "Fitpage",
          description: "Test Transaction",
          order_id: order.id,
          handler: function (response) {
            // Send payment verification request to backend
            fetch("http://localhost:5000/payment/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                userId,
                eventId
              }),
            })
            .then(res => res.json())
            .then(data => {
              if (data.success) {
                alert("Payment successful!");
                window.location.href = "/";
              } else {
                alert("Payment verification failed!");
              }
            })
            .catch(err => {
              console.error("Error verifying payment:", err);
              alert("Error verifying payment");
            });
          },
          prefill: {
            name: (formData.firstName + formData.lastName),
            email: (formData.email),
            contact: (formData.phone),
          },
          theme: {
            color: "#3399cc",
          },
        };
  
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      })
      .catch((err) => {
        console.error("Error creating Razorpay order:", err);
        alert("An error occurred while processing the payment.");
      });
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
                        type="date"
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
                          <RadioGroupItem value="Male" id="male" className="border-gray-300" />
                          <Label htmlFor="male" className="text-sm">Male</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="Female" id="female" className="border-gray-300" />
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
              <div className="space-y-4">
                <div className="bg-white rounded shadow-sm p-4">
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
                    <div className="font-bold">EMERGENCY DETAILS</div>
                    <div>
                      <Label className="text-sm mb-1">
                        Emergency Contact Name <span className="text-red-500">*</span>
                      </Label>
                      <input 
                        type="text" 
                        name="emergencyContactName" 
                        value={formData?.emergencyContactName || ""} 
                        onChange={(e) => handleInputChange('emergencyContactName', e.target.value)} 
                        pattern="[A-Za-z ]*" 
                        placeholder="Enter Name" 
                        required 
                        className="border p-3 w-full rounded bg-gray-100 text-gray-800" 
                      />
                    </div>

                    <div>
                      <Label className="text-sm mb-1">
                        Emergency Contact Number <span className="text-red-500">*</span>
                      </Label>
                      <input 
                        type="tel" 
                        name="emergencyContactNumber" 
                        value={formData?.emergencyContactNumber || ""} 
                        onChange={(e) => handleInputChange('emergencyContactNumber', e.target.value)} 
                        pattern="[0-9]{10}" 
                        placeholder="Enter Mobile No." 
                        required 
                        className="border p-3 w-full rounded bg-gray-100 text-gray-800" 
                      />
                    </div>

                    <div className="font-bold">MEDICAL QUESTIONAIRE</div>
                    <div>
                      <Label className="text-sm mb-1">
                        Blood Group <span className="text-red-500">*</span>
                      </Label>
                      <select 
                        name="bloodGroup" 
                        value={formData?.bloodGroup || ""} 
                        onChange={(e) => handleInputChange('bloodGroup', e.target.value)} 
                        className="border p-3 w-full rounded bg-gray-100 text-gray-800" 
                        required
                      >
                        <option value="" disabled>Select your blood group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                    </div>

                    <div>
                      <Label className="text-sm mb-1">
                        Any other medical condition that you would want us to be aware of? Please specify if any. 
                      </Label>
                      <textarea
                        name="medicalCondition"
                        value={formData.medicalCondition}
                        onChange={(e) => handleInputChange('medicalCondition', e.target.value)}
                        placeholder="Enter your medical conditions here..."
                        className="border p-3 w-full rounded bg-gray-100 text-gray-800 resize-none"
                      />
                    </div>

                    <div className="font-bold">TERMS & CONDITIONS </div>
                    <div className="flex items-center gap-2">
                      <CheckboxPrimitive.Root
                        checked={formData.termsAndCondition} 
                        onCheckedChange={(checked) => handleInputChange("termsAndCondition", checked === true)}
                        className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                      >
                        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
                          <Check className="h-4 w-4" />
                        </CheckboxPrimitive.Indicator>
                      </CheckboxPrimitive.Root>
                      <label className="text-sm">
                        I agree to the Terms and Conditions.
                      </label>
                    </div>

                    <Button
                      onClick={handleSaveAndContinue}
                      className="bg-[#FF1B75] hover:bg-[#FF1B75]/90 text-white mt-4 rounded"
                    >
                      Save and Continue
                    </Button>
                  </div>
                </div>
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
                  disabled={!isFormValid}
                  className={`w-full py-2 text-sm font-medium rounded ${
                    isFormValid 
                      ? 'bg-[#00856F] text-white hover:bg-[#00856F]/90' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isFormValid ? 'CHECKOUT' : 'Fill all Details'}
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