'use client';
import { useState } from 'react';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("personal");

    const renderForm = () => {
        switch (activeTab) {
            case "Personal Information":
                return <PersonalInformation />;
            case "Address":
                return <AddressForm />;
            case "Emergency Details":
                return <EmergencyDetails />;
            case "Physical Measurements":
                return <PhysicalMeasurements />;
            case "Race Kit shirt Size":
                return <RaceKitShirtSize />;
            case "Timing Certificate":
                return <TimingCertificate />;
            case "Documents":
                return <Documents />;
            default:
                return <PersonalInformation />;
        }
    };

    return (
        <div className="flex font-sans bg-gray-50 h-screen">
            <aside className="w-1/4 bg-white p-6 border border-gray-300 shadow-lg mr-10">
                <h1 className="text-3xl font-bold text-pink-600">
                    <a href='/'>
                        <img src="https://www.indiarunning.com/icons/IR-logo.svg" alt="India Running Logo" />
                    </a>
                </h1>
                <ul className="mt-8 space-y-6">
                    {["Personal Information", "Address", "Emergency Details", "Physical Measurements", "Race Kit shirt Size", "Timing Certificate", "Documents"].map((key) => (
                        <li
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={`p-3 text-lg font-medium cursor-pointer rounded ${activeTab === key ? "bg-gray-200 text-black font-bold" : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            {key.replace(/\b\w/g, (c) => c.toUpperCase()).replace(/_/g, ' ')}
                        </li>
                    ))}
                </ul>
            </aside>
            <main className="w-3/4 p-10 bg-white shadow-lg border border-gray-300">
                <div className="h-full overflow-y-auto">
                    {renderForm()}
                </div>
            </main>
        </div>
    );
}

function PersonalInformation() {
    return (
        <div className="overflow-hidden px-4">
            <div className="flex items-center bg-yellow-300 h-40 rounded-xl p-6 my-10">
                <img height={108} width={108} src="https://www.indiarunning.com/images/DefaultUserProfile.svg" alt="User Profile" />
                <h1 className="flex content-center mx-10 text-black text-4xl">ABHISHEK SHARMA</h1>
            </div>

            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Personal Information</h2>

            <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-5">
                    <label className="text-gray-700 flex-1">
                        First Name:
                        <input type="text" placeholder="First Name" required className="border p-3 w-full rounded bg-gray-100 text-gray-800" />
                    </label>

                    <label className="text-gray-700 flex-1">
                        Last Name:
                        <input type="text" placeholder="Last Name" required className="border p-3 w-full rounded bg-gray-100 text-gray-800" />
                    </label>
                </div>

                <div className="flex flex-col md:flex-row gap-5">
                    <label className="text-gray-700 flex-1">
                        Email:
                        <input type="email" placeholder="Email" required className="border p-3 w-full rounded bg-gray-100 text-gray-800" />
                    </label>

                    <label className="text-gray-700 flex-1">
                        Date of Birth:
                        <input type="date" required className="border p-3 w-full rounded bg-gray-100 text-gray-800" />
                    </label>
                </div>

                <div className="flex items-center space-x-4">
                    <label className="text-gray-700">Gender:</label>
                    <label className="flex items-center space-x-2">
                        <input type="radio" name="gender" value="male" required className="text-black" />
                        <span>Male</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input type="radio" name="gender" value="female" required />
                        <span>Female</span>
                    </label>
                </div>

                <div className="w-full">
                    <label className="text-gray-700 w-full block">
                        Bio:
                        <textarea placeholder="Enter bio (Max 100 characters)" required maxLength="100" className="border p-3 w-full rounded bg-gray-100 text-gray-800 resize-none"></textarea>
                    </label>
                </div>

                <div className="flex justify-end gap-4 mt-4">
                    <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg">Save</button>
                    <button type="reset" className="bg-gray-400 text-white p-3 rounded-lg">Reset</button>
                </div>
            </div>
        </div>
    );
}


function AddressForm() {
    return (
        <div className="overflow-hidden px-4 ">
            <div className="flex items-center bg-yellow-300 h-40 rounded-xl p-6 my-10">
                <img height={108} width={108} src="https://www.indiarunning.com/images/DefaultUserProfile.svg" alt="User Profile" />
                <h1 className="flex content-center mx-10 text-black text-4xl">ABHISHEK SHARMA</h1>
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Address</h2>

            <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <label className="text-gray-700 flex-1">Country:
                        <select className="border p-3 w-full rounded bg-gray-100 text-gray-800" required>
                            <option value="" disabled>Select your country</option>
                            <option value="USA">United States</option>
                            <option value="CAN">Canada</option>
                            <option value="UK">United Kingdom</option>
                            <option value="AUS">Australia</option>
                            <option value="IND">India</option>
                            <option value="GER">Germany</option>
                            <option value="FRA">France</option>
                            <option value="JPN">Japan</option>
                            <option value="BRA">Brazil</option>
                        </select>
                    </label>
                    <label className="text-gray-700 flex-1">Nationality:
                        <select className="border p-3 w-full rounded bg-gray-100 text-gray-800" required>
                            <option value="" disabled>Select your nationality</option>
                            <option value="American">American</option>
                            <option value="Canadian">Canadian</option>
                            <option value="British">British</option>
                            <option value="Australian">Australian</option>
                            <option value="Indian">Indian</option>
                            <option value="German">German</option>
                            <option value="French">French</option>
                            <option value="Japanese">Japanese</option>
                            <option value="Brazilian">Brazilian</option>
                        </select>
                    </label>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <label className="text-gray-700 flex-1">State:
                        <select className="border p-3 w-full rounded bg-gray-100 text-gray-800" required>
                            <option value="" disabled>Select your state</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="West Bengal">West Bengal</option>
                        </select>
                    </label>
                    <label className="text-gray-700 flex-1">Pin Code:
                        <input type="number" placeholder="Enter your pin code" required className="border p-3 w-full rounded bg-gray-100 text-gray-800" />
                    </label>
                </div>

                <div>
                    <label className="text-gray-700">Address:
                        <textarea placeholder="Enter your address" required className="border p-3 w-full rounded bg-gray-100 text-gray-800"></textarea>
                    </label>
                </div>

                <div className="flex justify-end gap-4 mt-4">
                    <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg">Save</button>
                    <button type="reset" className="bg-gray-400 text-white p-3 rounded-lg">Reset</button>
                </div>
            </div>
        </div>
    );
}



function EmergencyDetails() {
    return (
        <div className="overflow-hidden px-4 ">
            <div className="flex flex-col md:flex-row items-center bg-yellow-300 rounded-xl p-6 my-10">
                <img height={108} width={108} src="https://www.indiarunning.com/images/DefaultUserProfile.svg" alt="User Profile" className="mb-4 md:mb-0" />
                <h1 className="text-black text-4xl text-pretty text-center md:text-left md:ml-10">ABHISHEK SHARMA</h1>
            </div>



            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Emergency Details</h2>

            <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <label className="text-gray-700 flex-1">Blood Group:
                        <select className="border p-3 w-full rounded bg-gray-100 text-gray-800" required defaultValue="">
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
                    </label>
                    <label className="text-gray-700 flex-1">Emergency Contact Name:
                        <input type="text" placeholder="Enter emergency contact name" required className="border p-3 w-full rounded bg-gray-100 text-gray-800" />
                    </label>
                </div>

                <div>
                    <label className="text-gray-700">Emergency Contact Number (India):
                        <input type="tel" placeholder="Enter emergency contact number" pattern="[0-9]{10}" required className="border p-3 w-full rounded bg-gray-100 text-gray-800" />
                    </label>
                </div>
            </div>
        </div>



    )
}
function PhysicalMeasurements() {
    return (
        <div className="overflow-hidden px-4 ">
            <div className="flex flex-col md:flex-row items-center bg-yellow-300 rounded-xl p-6 my-10">
                <img height={108} width={108} src="https://www.indiarunning.com/images/DefaultUserProfile.svg" alt="User Profile" className="mb-4 md:mb-0" />
                <h1 className="text-black text-4xl text-pretty text-center md:text-left md:ml-10">ABHISHEK SHARMA</h1>
            </div>



            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Physical Measurements</h2>

            <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <label className="text-gray-700 flex-1">Height:
                        <input type="text" placeholder="Enter height (ft or cm)" required className="border p-3 w-full rounded bg-gray-100 text-gray-800" />
                    </label>
                    <label className="text-gray-700 flex-1">Weight:
                        <input type="text" placeholder="Enter weight (kg or lbs)" required className="border p-3 w-full rounded bg-gray-100 text-gray-800" />
                    </label>
                </div>

                <div>
                    <label className="text-gray-700">Shoe Size:
                        <select className="border p-3 w-full rounded bg-gray-100 text-gray-800" required defaultValue="">
                            <option value="" disabled>Select your shoe size</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </label>
                </div>
            </div>
        </div>

    )
}
function RaceKitShirtSize() {
    const [selectedSize, setSelectedSize] = useState(null);

    const handleSizeClick = (size) => {
        setSelectedSize(size);
    };

    return (
        <div className="h-screen  px-4 ">
            <div className="flex flex-col md:flex-row items-center bg-yellow-300 rounded-xl p-6 my-10">
                <img
                    height={108}
                    width={108}
                    src="https://www.indiarunning.com/images/DefaultUserProfile.svg"
                    alt="User Profile"
                    className="mb-4 md:mb-0"
                />
                <h1 className="text-black text-4xl text-pretty text-center md:text-left md:ml-10">
                    ABHISHEK SHARMA
                </h1>
            </div>

            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Pick the Perfect Fit: T-shirt Size Selection
            </h2>

            <div className="flex space-x-4 mb-6">
                {['XS', 'S', 'M', 'L', 'XL', '2XL'].map((size) => (
                    <button
                        key={size}
                        className={`border p-3 rounded ${selectedSize === size
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                        onClick={() => handleSizeClick(size)}
                    >
                        {size}
                    </button>
                ))}
            </div>

            <div className="flex justify-center">
                <img
                    className="w-full h-100 max-w-lg"
                    src="https://www.indiarunning.com/images/t-shirt-size.png"
                    alt="T-shirt Size Guide"
                />
            </div>
        </div>
    );
}

function TimingCertificate() {
    return (
        <div className="overflow-hidden px-4 ">
            <div className="flex flex-col md:flex-row items-center bg-yellow-300 rounded-xl p-6 my-10">
                <img height={108} width={108} src="https://www.indiarunning.com/images/DefaultUserProfile.svg" alt="User Profile" className="mb-4 md:mb-0" />
                <h1 className="text-black text-4xl text-pretty text-center md:text-left md:ml-10">ABHISHEK SHARMA</h1>
            </div>

            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Race Timing Certificate</h2>

            <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <label className="text-gray-700 flex-1">Race Type:
                        <select className="border p-3 w-full rounded bg-gray-100 text-gray-800" required defaultValue="">
                            <option value="" disabled>Select Race Type</option>
                            <option value="10k">10K</option>
                            <option value="half_marathon">Half Marathon</option>
                            <option value="full_marathon">Full Marathon</option>
                            <option value="not_applicable">Not Applicable</option>
                        </select>
                    </label>

                </div>
            </div>
        </div>
    );
}

function Documents() {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <div className="overflow-hidden px-4 ">
            <div className="flex items-center bg-yellow-300 h-40 rounded-xl p-6 my-10">
                <img height={108} width={108} src="https://www.indiarunning.com/images/DefaultUserProfile.svg" alt="User Profile" />
                <h1 className="flex content-center mx-10 text-black text-4xl">ABHISHEK SHARMA</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <label className="text-gray-700 flex-1">Select Document Type:
                        <select className="border p-3 w-full rounded bg-gray-100 text-gray-800" required defaultValue="">
                            <option value="" disabled>Select Document Type</option>
                            <option value="aadhar">Aadhar Card</option>
                            <option value="pan_card">PAN Card</option>
                            <option value="passport">Passport</option>
                            <option value="driving_license">Driving License</option>
                        </select>
                    </label>
                </div>

                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <label className="text-gray-700 flex-1">Front Photo (Identity Proof):
                            <input type="file" accept="image/*" className="border p-3 w-full rounded bg-gray-100 text-gray-800" required />
                        </label>

                        <label className="text-gray-700 flex-1">Back Photo (Identity Proof):
                            <input type="file" accept="image/*" className="border p-3 w-full rounded bg-gray-100 text-gray-800" required />
                        </label>
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-4">
                    <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg">Submit</button>
                    <button type="reset" className="bg-gray-400 text-white p-3 rounded-lg">Reset</button>
                </div>
            </form>
        </div>
    );
}


