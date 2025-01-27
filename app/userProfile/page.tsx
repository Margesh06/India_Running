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
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        sessionStorage.clear();
      
        window.location.href = "/auth/login"; 
      
        // import { useRouter } from 'next/router';
        // const router = useRouter();
        // router.push('/login');
      };
      

    return (
        <div className="flex font-sans bg-gray-50 h-screen">
            <div className="relative m-5 p-5 rounded-lg shadow-lg bg-white max-w-full md:max-w-[400px] lg:max-w-[500px] mx-auto overflow-y-scroll">
                <aside className=" ">
                    <h1 className="text-4xl font-bold text-pink-600  m-5">
                        <a href="/">
                            <img
                                src="https://www.indiarunning.com/icons/IR-logo.svg"
                                alt="India Running Logo"
                                className="mx-auto"
                            />
                        </a>
                    </h1>
                    <ul className="mt-8">
                        {[
                            "Personal Information",
                            "Address",
                            "Emergency Details",
                            "Physical Measurements",
                            "Race Kit shirt Size",
                            "Timing Certificate",
                            "Documents",
                        ].map((key, index) => (
                            <li
                                key={key}
                                onClick={() => setActiveTab(key)}
                                className={`p-4 text-lg font-medium cursor-pointer ${activeTab === key
                                        ? "bg-gray-200 text-black "
                                        : "text-gray-600 hover:bg-gray-100 border-b border-gray-300 shadow-sm"
                                    }`}
                            >
                                <div className=" ">{key}</div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-auto">
      <button
        className="flex absolute bottom-1 p-2 gap-3  rounded hover:bg-red-600 transition "
        onClick={handleLogout}
      >
        <img src="https://www.indiarunning.com/icons/logout.svg" alt="logout" className="h-6 w-6" />
        Logout
      </button></div>
                </aside>
            </div>


            <main className="w-3/4  relative m-5 p-5 rounded-lg shadow-lg bg-white max-w-full   mx-auto">
                <div className="h-full overflow-y-auto">
                    {renderForm()}
                </div>
            </main>
        </div>
    );
}

function PersonalInformation() {
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div className="overflow-hidden px-4">
            <div className="flex items-center bg-yellow-300 h-40 rounded-xl p-6 my-10">
                <img height={108} width={108} src="https://www.indiarunning.com/images/DefaultUserProfile.svg" alt="User Profile" />
                <h1 className="flex content-center mx-10 text-black text-4xl">ABHISHEK SHARMA</h1>
            </div>

            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Personal Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-5">
                        <label className="text-gray-700 flex-1">
                            First Name:  <span className="text-lg text-red-600"> *</span>
                            <input type='text' pattern="[A-Za-z]*" placeholder="First Name" required className="border p-3 w-full rounded bg-gray-100 text-gray-800" />
                        </label>

                        <label className="text-gray-700 flex-1">
                            Last Name:  <span className="text-lg text-red-600"> *</span>
                            <input type="text" pattern="[A-Za-z]*" placeholder="Last Name" required className="border p-3 w-full rounded bg-gray-100 text-gray-800" />
                        </label>
                    </div>

                    <div className="flex flex-col md:flex-row gap-5">
                        <label className="text-gray-700 flex-1">
                            Email:  <span className="text-lg text-red-600"> *</span>
                            <input type="email" placeholder="Email" required className="border p-3 w-full rounded bg-gray-100 text-gray-800" />
                        </label>

                        <label className="text-gray-700 flex-1">
                            Date of Birth:   <span className="text-lg text-red-600"> *</span>
                            <input type="date" required className="border p-3 w-full rounded bg-gray-100 text-gray-800" />
                        </label>
                    </div>

                    <div className="flex items-center space-x-4">
                        <label className="text-gray-700">Gender:  <span className="text-lg text-red-600"> *</span>
                        <div className="flex ">
                            <label className="flex items-center space-x-2">
                                <input type="radio" name="gender" value="male" required className="text-black" />
                                <span>Male</span>
                            </label>
                            <label className="flex items-center m-3 space-x-2">
                                <input type="radio" name="gender" value="female" required />
                                <span>Female</span>
                            </label>
                        </div></label>
                       
                    </div>

                    <div className="w-full">
                        <label className="text-gray-700 w-full block">
                            Bio: <span className="text-lg text-red-600"> *</span>
                            <textarea placeholder="Enter bio (Max 100 characters)" required  className="border p-3 w-full rounded bg-gray-100 text-gray-800 resize-none"></textarea>
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


function AddressForm() {
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div className="overflow-hidden px-4 ">
            <div className="flex items-center bg-yellow-300 h-40 rounded-xl p-6 my-10">
                <img height={108} width={108} src="https://www.indiarunning.com/images/DefaultUserProfile.svg" alt="User Profile" />
                <h1 className="flex content-center mx-10 text-black text-4xl">ABHISHEK SHARMA</h1>
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Address</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <label className="text-gray-700 flex-1">Country:   <span className="text-lg text-red-600"> *</span>
                            <select className="border p-3 w-full rounded bg-gray-100 text-gray-800" required>
                                <option value="" >Select your country</option>
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
                        <label className="text-gray-700 flex-1">Nationality: <span className="text-lg text-red-600"> *</span>
                            <select className="border p-3 w-full rounded bg-gray-100 text-gray-800" required>
                                <option value="" >Select your nationality</option>
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
                        <label className="text-gray-700 flex-1">State: <span className="text-lg text-red-600"> *</span>
                            <select className="border p-3 w-full rounded bg-gray-100 text-gray-800" required>
                                <option value="" >Select your state</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Tamil Nadu">Tamil Nadu</option>
                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                <option value="West Bengal">West Bengal</option>
                            </select>
                        </label>
                        <label className="text-gray-700 flex-1">Pin Code: <span className="text-lg text-red-600"> *</span>
                            <input type="number" placeholder="Enter your pin code" required className="border p-3 w-full rounded bg-gray-100 text-gray-800" />
                        </label>
                    </div>

                    <div>
                        <label className="text-gray-700">Address: <span className="text-lg text-red-600"> *</span>
                            <textarea placeholder="Enter your address" required className="border p-3 w-full rounded bg-gray-100 text-gray-800"></textarea>
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



function EmergencyDetails() {
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div className="overflow-hidden px-4 ">
            <div className="flex flex-col md:flex-row items-center bg-yellow-300 rounded-xl p-6 my-10">
                <img height={108} width={108} src="https://www.indiarunning.com/images/DefaultUserProfile.svg" alt="User Profile" className="mb-4 md:mb-0" />
                <h1 className="text-black text-4xl text-pretty text-center md:text-left md:ml-10">ABHISHEK SHARMA</h1>
            </div>



            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Emergency Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <label className="text-gray-700 flex-1">Blood Group: <span className="text-lg text-red-600"> *</span>
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
                        <label className="text-gray-700 flex-1">Emergency Contact Name: <span className="text-lg text-red-600"> *</span>
                            <input type="text" pattern="[A-Za-z]*" placeholder="Enter emergency contact name" required className="border p-3 w-full rounded bg-gray-100 text-gray-800" />
                        </label>
                    </div>

                    <div>
                        <label className="text-gray-700">Emergency Contact Number: <span className="text-lg text-red-600"> *</span>
                            <input type="tel" placeholder="Enter emergency contact number" pattern="[0-9]{10}" required className="border p-3 w-full rounded bg-gray-100 text-gray-800" />
                        </label>
                    </div>
                </div>
                <div className="flex justify-end gap-4 mt-4">
                    <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg">Submit</button>
                    <button type="reset" className="bg-gray-400 text-white p-3 rounded-lg">Reset</button>
                </div>
            </form>
        </div>



    )
}
function PhysicalMeasurements() {
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div className="overflow-hidden px-4 ">
            <div className="flex flex-col md:flex-row items-center bg-yellow-300 rounded-xl p-6 my-10">
                <img height={108} width={108} src="https://www.indiarunning.com/images/DefaultUserProfile.svg" alt="User Profile" className="mb-4 md:mb-0" />
                <h1 className="text-black text-4xl text-pretty text-center md:text-left md:ml-10">ABHISHEK SHARMA</h1>
            </div>



            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Physical Measurements</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <label className="text-gray-700 flex-1">Height: <span className="text-lg text-red-600"> *</span>
                            <input pattern="^\d+(\.\d{1,2})?$" type="text" placeholder="Enter height (ft)" required className="border p-3 w-full rounded bg-gray-100 text-gray-800" />
                        </label>
                        <label className="text-gray-700 flex-1">Weight: <span className="text-lg text-red-600"> *</span>
                            <input pattern="^\d+(\.\d{1,2})?$" type="text" placeholder="Enter weight (kg)" required className="border p-3 w-full rounded bg-gray-100 text-gray-800" />
                        </label>
                    </div>

                    <div>
                        <label className="text-gray-700">Shoe Size: <span className="text-lg text-red-600"> *</span>
                            <select className="border p-3 w-full rounded bg-gray-100 text-gray-800" required defaultValue="">
                                <option value="" disabled>Select your shoe size</option>
                                <option value="6">6 UK</option>
                                <option value="7">7 UK</option>
                                <option value="8">8 UK</option>
                                <option value="9">9 UK</option>
                                <option value="10">10 UK</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div className="flex justify-end gap-4 mt-4">
                    <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg">Submit</button>
                    <button type="reset" className="bg-gray-400 text-white p-3 rounded-lg">Reset</button>
                </div>
            </form>
        </div>

    )
}
function RaceKitShirtSize() {
    const [selectedSize, setSelectedSize] = useState(null);

    const handleSizeClick = (size) => {
        setSelectedSize(size);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

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
                <div className="text-sm font-normal w-full text-start " ><p>Select your T-shirt Size<span className="text-lg text-red-600"> *</span></p></div>

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
                <div className="w-full flex justify-center md:w-1/2 mx-auto pb-10"><img src="https://www.indiarunning.com/images/t-shirt-size.png" alt="input-guide-Image"></img></div>

            </div>
            <div className="flex justify-end gap-4 mt-4">
                <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg">Submit</button>
                <button type="reset" className="bg-gray-400 text-white p-3 rounded-lg">Reset</button>
            </div>
        </form>
    );
}

function TimingCertificate() {
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div className="overflow-hidden px-4 ">
            <div className="flex flex-col md:flex-row items-center bg-yellow-300 rounded-xl p-6 my-10">
                <img height={108} width={108} src="https://www.indiarunning.com/images/DefaultUserProfile.svg" alt="User Profile" className="mb-4 md:mb-0" />
                <h1 className="text-black text-4xl text-pretty text-center md:text-left md:ml-10">ABHISHEK SHARMA</h1>
            </div>

            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Race Timing Certificate</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <label className="text-gray-700 flex-1">Race Type: <span className="text-lg text-red-600"> *</span>
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
                <div className="flex justify-end gap-4 mt-4">
                    <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg">Submit</button>
                    <button type="reset" className="bg-gray-400 text-white p-3 rounded-lg">Reset</button>
                </div>
            </form>
        </div>
    );
}

function Documents() {
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="overflow-hidden px-4 ">
            <div className="flex items-center bg-yellow-300 h-40 rounded-xl p-6 my-10">
                <img height={108} width={108} src="https://www.indiarunning.com/images/DefaultUserProfile.svg" alt="User Profile" />
                <h1 className="flex content-center mx-10 text-black text-4xl">ABHISHEK SHARMA</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <label className="text-gray-700 flex-1">Select Document Type: <span className="text-lg text-red-600"> *</span>
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
                        <label className="text-gray-700 flex-1">Front Photo (Identity Proof): <span className="text-lg text-red-600"> *</span>
                            <input type="file" accept="image/*" className="border p-3 w-full rounded bg-gray-100 text-gray-800" required />
                        </label>

                        <label className="text-gray-700 flex-1">Back Photo (Identity Proof): <span className="text-lg text-red-600"> *</span>
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


