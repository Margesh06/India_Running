'use client';
import { useState, useEffect } from 'react';

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
        localStorage.removeItem("access_token");
        sessionStorage.clear();

        window.location.href = "/";

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

interface User {
    id: number;
    fname: string;
    lname: string;
    email: string;
}

interface UserProfile {
    id: number;
    profileImage: string;
    address: string;
    phone_no: number;
    emergencyContactName: string;
    emergencyContactNumber: number;
    country: string;
    state: string;
    pincode: string;
    bio: string;
    gender: string;
    dob: string;
    nationality: string;
    bloodGroup: string;
    height: number;
    weight: number;
    shoesize: string;
    tshirtsize: string;
    raceType: string;
    documentType: string;
    frontPhoto: string;
    backPhoto: string;
    user_id: number;
}


function PersonalInformation() {
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [originalData, setOriginalData] = useState<{ user: User | null; profile: UserProfile | null }>({ user: null, profile: null });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) return console.error("No token found");

                const response = await fetch("http://localhost:5000/users/current", {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) throw new Error("Failed to fetch user");

                const user = await response.json();
                setUserData(user);
                console.log(user);

                const profileResponse = await fetch(`http://localhost:5000/userProfile/${user.id}`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });

                const profile = await profileResponse.json();
                setUserProfile(profile);
                console.log(profile);
                setOriginalData({ user, profile });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!userData || !userProfile) return;
        const { name, value } = e.target;
        if (name in userData) {
            setUserData((prev) => ({ ...prev, [name]: value }));
        } else {
            setUserProfile((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userData || !userProfile) return;

        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                console.error("No token found");
                return;
            }
            const userUpdateResponse = await fetch(`http://localhost:5000/users/${userData.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    fname: userData.fname,
                    lname: userData.lname,
                    email: userData.email
                }),
            });

            if (!userUpdateResponse.ok) {
                throw new Error("Failed to update user details");
            }

            const profileUpdateResponse = await fetch(`http://localhost:5000/userProfile/${userProfile.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    dob: userProfile?.dob || "", 
                    gender: userProfile?.gender,
                    bio: userProfile?.bio || ""  
                }),
            });

            if (!profileUpdateResponse.ok) {
                throw new Error("Failed to update profile details");
            }

            console.log("User and profile updated successfully");

            setOriginalData({ user: userData, profile: userProfile });
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };


    const handleCancel = () => {
        setUserData(originalData.user);
        setUserProfile(originalData.profile);
        setIsEditing(false);
    };


    return (
        <div className="overflow-hidden px-4">
            <div className="flex items-center bg-yellow-300 h-40 rounded-xl p-6 my-10">
                <img height={108} width={108} src={userProfile?.profileImage || "https://www.indiarunning.com/images/DefaultUserProfile.svg"} alt="User Profile" />
                <h1 className="flex content-center mx-10 text-black text-4xl">{userData?.fname} {userData?.lname}</h1>
            </div>

            <h2 className="flex justify-between items-center text-2xl font-semibold text-gray-700 mb-4">
                Personal Information
                <button onClick={() => setIsEditing(!isEditing)} className="flex text-sm text-[rgb(0,179,146)]"> <img src="https://www.indiarunning.com/icons/pencil-edit.svg" alt="" />
                    {isEditing ? "cancel" : "Edit"}
                </button>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 ">
                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-5">
                        <label className="text-gray-700 flex-1">
                            First Name: <span className="text-lg text-red-600"> *</span>
                            <input
                                type="text"
                                name="fname"
                                value={userData?.fname || ""}
                                disabled
                                placeholder={userData?.fname || ""}
                                required
                                className="border p-3 w-full rounded bg-gray-100 text-gray-400"
                            />
                        </label>

                        <label className="text-gray-700 flex-1">
                            Last Name: <span className="text-lg text-red-600"> *</span>
                            <input
                                type="text"
                                name="lname"
                                value={userData?.lname || ""}
                                disabled
                                placeholder={userData?.lname || ""}
                                required
                                className="border p-3 w-full rounded bg-gray-100 text-gray-400"
                            />
                        </label>
                    </div>

                    <div className="flex flex-col md:flex-row gap-5">
                        <label className="text-gray-700 flex-1">
                            Email: <span className="text-lg text-red-600"> *</span>
                            <input
                                type="email"
                                name="email"
                                value={userData?.email || ""}
                                disabled
                                placeholder={userData?.email || ""}
                                required
                                className="border p-3 w-full rounded bg-gray-100 text-gray-400"
                            />
                        </label>

                        <label className="text-gray-700 flex-1">
                            Date of Birth: <span className="text-lg text-red-600"> *</span>
                            <input
                                type="date"
                                name="dob"
                                value={userProfile?.dob || ""}
                                onChange={handleChange}
                                disabled={!isEditing}
                                required
                                className="border p-3 w-full rounded bg-gray-100 text-gray-800"
                            />
                        </label>
                    </div>

                    <div className="flex items-center space-x-4">
                        <label className="text-gray-700">Gender: <span className="text-lg text-red-600"> *</span>
                            <div className="flex">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        checked={userProfile?.gender === "Male"}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        required
                                        className="text-black"
                                    />
                                    <span>Male</span>
                                </label>
                                <label className="flex items-center m-3 space-x-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        checked={userProfile?.gender === "Female"}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        required
                                    />
                                    <span>Female</span>
                                </label>
                            </div>
                        </label>
                    </div>

                    <div className="w-full">
                        <label className="text-gray-700 w-full block">
                            Bio: <span className="text-lg text-red-600"> *</span>
                            <textarea
                                name="bio"
                                value={userProfile?.bio || ""}
                                onChange={handleChange}
                                disabled={!isEditing}
                                placeholder="Enter bio (Max 100 characters)"
                                required
                                className="border p-3 w-full rounded bg-gray-100 text-gray-800 resize-none"
                            />
                        </label>
                    </div>
                </div>

                {isEditing && (
                    <div className="flex justify-end gap-4 mt-4">
                        <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg">Save</button>
                        <button type="button" onClick={handleCancel} className="bg-gray-400 text-white p-3 rounded-lg">Cancel</button>
                    </div>
                )}
            </form>
        </div>
    );
}


function AddressForm() {
    const [isEditing, setIsEditing] = useState(false);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [userData, setUserData] = useState<User | null>(null);
    const [originalData, setOriginalData] = useState<UserProfile | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) return console.error("No token found");

                const response = await fetch("http://localhost:5000/users/current", {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) throw new Error("Failed to fetch user");

                const user = await response.json();
                setUserData(user);
                console.log(user);

                const profileResponse = await fetch(`http://localhost:5000/userProfile/${user.id}`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });

                const profile = await profileResponse.json();
                setUserProfile(profile);
                console.log(profile);
                setOriginalData(profile);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        if (!userProfile) return;
        const { name, value } = e.target;
        setUserProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedData = { 
            country: userProfile?.country, 
            state: userProfile?.state, 
            pincode: userProfile?.pincode, 
            address: userProfile?.address,
            nationality: userProfile?.nationality 
        };
        if (!userProfile) return;
        try {
            await fetch(`http://localhost:5000/userProfile/${userProfile.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });
            setOriginalData(userProfile);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleCancel = () => {
        setUserProfile(originalData);
        setIsEditing(false);
    };
    return (
        <div className="overflow-hidden px-4 ">
            <div className="flex items-center bg-yellow-300 h-40 rounded-xl p-6 my-10 overflow-hidden">
                <img height={108} width={108} src={userProfile?.profileImage || "https://www.indiarunning.com/images/DefaultUserProfile.svg"} alt="User Profile" />
                <h1 className="flex content-center mx-10 text-black text-4xl">{userData?.fname} {userData?.lname}</h1>
            </div>
            <h2 className="flex justify-between items-center text-2xl font-semibold text-gray-700 mb-4">Address
                <button onClick={() => setIsEditing(!isEditing)} className="flex text-sm text-[rgb(0,179,146)]"> <img src="https://www.indiarunning.com/icons/pencil-edit.svg" alt="" />
                    {isEditing ? "cancel" : "Edit"}
                </button>
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <label className="text-gray-700 flex-1">Country:   <span className="text-lg text-red-600"> *</span>
                            <select name="country" value={userProfile?.country || ""} onChange={handleInputChange} disabled={!isEditing} className="border p-3 w-full rounded bg-gray-100 text-gray-800" required>
                                <option value="" >Select your country</option>
                                <option value="United States">United States</option>
                                <option value="Canada">Canada</option>
                                <option value="United Kingdom">United Kingdom</option>
                                <option value="Australia">Australia</option>
                                <option value="India">India</option>
                                <option value="Germany">Germany</option>
                                <option value="France">France</option>
                                <option value="Japan">Japan</option>
                                <option value="Brazil">Brazil</option>
                            </select>
                        </label>
                        <label className="text-gray-700 flex-1">Nationality: <span className="text-lg text-red-600"> *</span>
                            <select name="nationality" value={userProfile?.nationality || ""} onChange={handleInputChange} disabled={!isEditing} className="border p-3 w-full rounded bg-gray-100 text-gray-800" required>
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
                            <select name="state" value={userProfile?.state || ""} onChange={handleInputChange} disabled={!isEditing} className="border p-3 w-full rounded bg-gray-100 text-gray-800" required>
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
                            <input type="number" name="pincode" value={userProfile?.pincode || ""} onChange={handleInputChange} disabled={!isEditing} placeholder="Enter your pin code" required className="border p-3 w-full rounded bg-gray-100 text-gray-800" />
                        </label>
                    </div>

                    <div>
                        <label className="text-gray-700">Address: <span className="text-lg text-red-600"> *</span>
                            <textarea name="address" value={userProfile?.address || ""} onChange={handleInputChange} disabled={!isEditing} placeholder="sdf" required className="border p-3 w-full rounded bg-gray-100 text-gray-800"></textarea>
                        </label>
                    </div>
                </div>
                {isEditing && (
                    <div className="flex justify-end gap-4 mt-4">
                        <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg">Save</button>
                        <button type="button" onClick={handleCancel} className="bg-gray-400 text-white p-3 rounded-lg">Cancel</button>
                    </div>
                )}
            </form>
        </div>
    );
}



function EmergencyDetails() {
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [originalData, setOriginalData] = useState<{ user: User | null; profile: UserProfile | null }>({ user: null, profile: null });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) return console.error("No token found");

                const response = await fetch("http://localhost:5000/users/current", {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) throw new Error("Failed to fetch user");

                const user = await response.json();
                setUserData(user);
                console.log(user);

                const profileResponse = await fetch(`http://localhost:5000/userProfile/${user.id}`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });

                const profile = await profileResponse.json();
                setUserProfile(profile);
                console.log(profile);
                setOriginalData({ user, profile });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!userProfile) return;
        const { name, value } = e.target;
        setUserProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userProfile) return;
        try {
            await fetch(`http://localhost:5000/userProfile/${userProfile.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userProfile),
            });
            setOriginalData({ user: userData, profile: userProfile });
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleCancel = () => {
        setUserProfile(originalData.profile);
        setIsEditing(false);
    };

    return (
        <div className="overflow-hidden px-4 ">
            <div className="flex flex-col md:flex-row items-center bg-yellow-300 rounded-xl p-6 my-10">
                <img height={108} width={108} src={userProfile?.profileImage || "https://www.indiarunning.com/images/DefaultUserProfile.svg"} alt="User Profile" />
                <h1 className="flex content-center mx-10 text-black text-4xl">{userData?.fname} {userData?.lname}</h1>
            </div>



            <h2 className="flex justify-between items-center text-2xl font-semibold text-gray-700 mb-4">Emergency Details
                <button onClick={() => setIsEditing(!isEditing)} className="flex text-sm text-[rgb(0,179,146)]"> <img src="https://www.indiarunning.com/icons/pencil-edit.svg" alt="" />
                    {isEditing ? "cancel" : "Edit"}
                </button>
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <label className="text-gray-700 flex-1">Blood Group: <span className="text-lg text-red-600"> *</span>
                            <select name="bloodGroup" value={userProfile?.bloodGroup || ""} onChange={handleInputChange} disabled={!isEditing} className="border p-3 w-full rounded bg-gray-100 text-gray-800" required>
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
                            <input type="text" name="emergencyContactName" value={userProfile?.emergencyContactName || ""} onChange={handleInputChange} disabled={!isEditing} pattern="[A-Za-z ]*" placeholder="Enter Name" required className="border p-3 w-full rounded bg-gray-100 text-gray-800" />
                        </label>
                    </div>

                    <div>
                        <label className="text-gray-700">Emergency Contact Number: <span className="text-lg text-red-600"> *</span>
                            <input type="tel" name="emergencyContactNumber" value={userProfile?.emergencyContactNumber || ""} onChange={handleInputChange} disabled={!isEditing} pattern="[0-9]{10}" placeholder="Enter Mobile No." required className="border p-3 w-full rounded bg-gray-100 text-gray-800" />
                        </label>
                    </div>
                </div>
                {isEditing && (
                    <div className="flex justify-end gap-4 mt-4">
                        <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg">Save</button>
                        <button type="button" onClick={handleCancel} className="bg-gray-400 text-white p-3 rounded-lg">Cancel</button>
                    </div>
                )}
            </form>
        </div>



    )
}

function PhysicalMeasurements() {
    const [isEditing, setIsEditing] = useState(false);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [userData, setUserData] = useState<User | null>(null);
    const [originalData, setOriginalData] = useState<UserProfile | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) return console.error("No token found");

                const response = await fetch("http://localhost:5000/users/current", {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) throw new Error("Failed to fetch user");

                const user = await response.json();
                setUserData(user);
                console.log(user);

                const profileResponse = await fetch(`http://localhost:5000/userProfile/${user.id}`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });

                const profile = await profileResponse.json();
                setUserProfile(profile);
                console.log(profile);
                setOriginalData(profile);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!userProfile) return;
        const { name, value } = e.target;
        setUserProfile((prev) => ({ ...prev!, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userProfile) return;
        try {
            await fetch(`http://localhost:5000/userProfile/${userProfile.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userProfile),
            });
            setOriginalData(userProfile);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleCancel = () => {
        setUserProfile(originalData);
        setIsEditing(false);
    };
    return (
        <div className="overflow-hidden px-4 ">
            <div className="flex flex-col md:flex-row items-center bg-yellow-300 rounded-xl p-6 my-10">
                <img height={108} width={108} src={userProfile?.profileImage || "https://www.indiarunning.com/images/DefaultUserProfile.svg"} alt="User Profile" className="mb-4 md:mb-0" />
                <h1 className="text-black text-4xl text-pretty text-center md:text-left md:ml-10">{userData?.fname} {userData?.lname}</h1>
            </div>



            <h2 className="flex justify-between items-center text-2xl font-semibold text-gray-700 mb-4">Physical Measurements
                <button onClick={() => setIsEditing(!isEditing)} className="flex text-sm text-[rgb(0,179,146)]"> <img src="https://www.indiarunning.com/icons/pencil-edit.svg" alt="" />
                    {isEditing ? "cancel" : "Edit"}
                </button>
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <label className="text-gray-700 flex-1">Height: <span className="text-lg text-red-600"> *</span>
                            <input type="text" name="height" value={userProfile?.height || ""} onChange={handleInputChange} disabled={!isEditing} pattern="^\d+(\.\d{1,2})?$" placeholder="Enter height (ft)" required className="border p-3 w-full rounded bg-gray-100 text-gray-800" />
                        </label>
                        <label className="text-gray-700 flex-1">Weight: <span className="text-lg text-red-600"> *</span>
                            <input type="text" name="weight" value={userProfile?.weight || ""} onChange={handleInputChange} disabled={!isEditing} pattern="^\d+(\.\d{1,2})?$" placeholder="Enter weight (kg)" required className="border p-3 w-full rounded bg-gray-100 text-gray-800" />
                        </label>
                    </div>

                    <div>
                        <label className="text-gray-700">Shoe Size: <span className="text-lg text-red-600"> *</span>
                            <select name="shoesize" value={userProfile?.shoesize || ""} onChange={handleInputChange} disabled={!isEditing} className="border p-3 w-full rounded bg-gray-100 text-gray-800" required>
                                <option value="" disabled>Select your shoe size</option>
                                <option value="6 UK">6 UK</option>
                                <option value="7 UK">7 UK</option>
                                <option value="8 UK">8 UK</option>
                                <option value="9 UK">9 UK</option>
                                <option value="10 UK">10 UK</option>
                            </select>
                        </label>
                    </div>
                </div>
                {isEditing && (
                    <div className="flex justify-end gap-4 mt-4">
                        <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg">Save</button>
                        <button type="button" onClick={handleCancel} className="bg-gray-400 text-white p-3 rounded-lg">Cancel</button>
                    </div>
                )}
            </form>
        </div>

    )
}

function RaceKitShirtSize() {
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState<User | null>(null);
    const [userProfileData, setUserProfileData] = useState<UserProfile | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) return console.error("No token found");

                const response = await fetch("http://localhost:5000/users/current", {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) throw new Error("Failed to fetch user");

                const user = await response.json();
                setUserData(user);
                console.log(user);

                const profileResponse = await fetch(`http://localhost:5000/userProfile/${user.id}`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });

                const profile = await profileResponse.json();
                setUserProfileData(profile);
                console.log(profile);
                setSelectedSize(profile?.tshirtsize || null);
            } catch (error) {
                console.error("Error fetching user/profile data:", error);
            }
        };

        fetchData();
    }, []);

    const handleSizeClick = (size: string) => {
        if (isEditing) {
            setSelectedSize(size);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedSize || !userProfileData) return;

        try {
            await fetch(`http://localhost:5000/userProfile/${userProfileData.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ tshirtsize: selectedSize }),
            });

            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleCancel = () => {
        setSelectedSize(userProfileData?.tshirtsize || null);
        setIsEditing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="h-screen px-4">
                <div className="flex flex-col md:flex-row items-center bg-yellow-300 rounded-xl p-6 my-10">
                    <img
                        height={108}
                        width={108}
                        src={userProfileData?.profileImage || "https://www.indiarunning.com/images/DefaultUserProfile.svg"}
                        alt="User Profile"
                        className="mb-4 md:mb-0"
                    />
                    <h1 className="text-black text-4xl text-pretty text-center md:text-left md:ml-10">
                        {userData?.fname} {userData?.lname}
                    </h1>
                </div>

                <h2 className="flex justify-between items-center text-2xl font-semibold text-gray-700 mb-4">
                    Pick the Perfect Fit: T-shirt Size Selection
                    <button
                        type="button"
                        onClick={() => setIsEditing(!isEditing)}
                        className="flex text-sm text-[rgb(0,179,146)] ml-4"
                    ><img src="https://www.indiarunning.com/icons/pencil-edit.svg" alt="" />
                        {isEditing ? "Cancel" : "Edit"}
                    </button>
                </h2>
                <div className="text-sm font-normal w-full text-start">
                    <p>Select your T-shirt Size<span className="text-lg text-red-600"> *</span></p>
                </div>

                <div className="flex space-x-4 mb-6">
                    {['XS', 'S', 'M', 'L', 'XL', '2XL'].map((size) => (
                        <button
                            key={size}
                            type="button"
                            className={`border p-3 rounded ${selectedSize === size
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 text-gray-800'
                                }`}
                            onClick={() => handleSizeClick(size)}
                            disabled={!isEditing}
                        >
                            {size}
                        </button>
                    ))}
                </div>
                <div className="w-full flex justify-center md:w-1/2 mx-auto pb-10">
                    <img src="https://www.indiarunning.com/images/t-shirt-size.png" alt="input-guide-Image" />
                </div>
            </div>

            {isEditing && (
                <div className="flex justify-end gap-4 mt-4">
                    <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg">Save</button>
                    <button type="button" onClick={handleCancel} className="bg-gray-400 text-white p-3 rounded-lg">Cancel</button>
                </div>
            )}
        </form>
    );
}


function TimingCertificate() {
    const [selectedRace, setSelectedRace] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState<User | null>(null);
    const [userProfileData, setUserProfileData] = useState<UserProfile | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                

               
                

                const token = localStorage.getItem('access_token');
                if (!token) return console.error("No token found");

                const response = await fetch("http://localhost:5000/users/current", {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) throw new Error("Failed to fetch user");

                const user = await response.json();
                setUserData(user);
                console.log(user);

                const profileResponse = await fetch(`http://localhost:5000/userProfile/${user.id}`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });

                const profile = await profileResponse.json();
                setUserProfileData(profile);
                console.log(profile);
                setSelectedRace(profile?.raceType || null);
                // setOriginalData(profile);
            } catch (error) {
                console.error("Error fetching user/profile data:", error);
            }
        };

        fetchData();
    }, []);

    const handleRaceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (isEditing) {
            setSelectedRace(e.target.value);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedRace || !userProfileData) return;
    
        console.log("Updating raceType:", selectedRace); 
    
        try {
            const response = await fetch(`http://localhost:5000/userProfile/${userProfileData.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ raceType: selectedRace }),
            });
    
            const result = await response.json();
            console.log("Server response:", result); 
    
            if (!response.ok) {
                throw new Error("Failed to update raceType");
            }
    
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };
    

    const handleCancel = () => {
        setSelectedRace(userProfileData?.raceType || null);
        setIsEditing(false);
    };
    return (
        <div className="overflow-hidden px-4 ">
            <div className="flex flex-col md:flex-row items-center bg-yellow-300 rounded-xl p-6 my-10">
                <img height={108} width={108} src={userProfileData?.profileImage || "https://www.indiarunning.com/images/DefaultUserProfile.svg"} alt="User Profile" className="mb-4 md:mb-0" />
                <h1 className="text-black text-4xl text-pretty text-center md:text-left md:ml-10">{userData?.fname} {userData?.lname}</h1>
            </div>

            <h2 className="flex justify-between items-center text-2xl font-semibold text-gray-700 mb-4">Race Timing Certificate
                <button
                    type="button"
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex text-sm text-[rgb(0,179,146)] ml-4"
                ><img src="https://www.indiarunning.com/icons/pencil-edit.svg" alt="" />
                    {isEditing ? "Cancel" : "Edit"}
                </button>
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <label className="text-gray-700 flex-1">Race Type: <span className="text-lg text-red-600"> *</span>
                            <select
                                name="raceType"
                                value={selectedRace || ""}
                                onChange={handleRaceChange}
                                disabled={!isEditing}
                                className="border p-3 w-full rounded bg-gray-100 text-gray-800"
                                required
                            >                                
                                <option value="" disabled>Select Race Type</option>
                                <option value="10K">10K</option>
                                <option value="HALF MARATHON">Half Marathon</option>
                                <option value="FULL MARATHON">Full Marathon</option>
                                <option value="NOT APPLICABLE">Not Applicable</option>
                            </select>
                        </label>

                    </div>
                </div>
                {isEditing && (
                    <div className="flex justify-end gap-4 mt-4">
                        <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg">Save</button>
                        <button type="button" onClick={handleCancel} className="bg-gray-400 text-white p-3 rounded-lg">Cancel</button>
                    </div>
                )}
            </form>
        </div>
    );
}

function Documents() {
    const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
    const [frontPhoto, setFrontPhoto] = useState<File | null>(null);
    const [backPhoto, setBackPhoto] = useState<File | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState<User | null>(null);
    const [userProfileData, setUserProfileData] = useState<UserProfile | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) return console.error("No token found");

                const response = await fetch("http://localhost:5000/users/current", {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) throw new Error("Failed to fetch user");

                const user = await response.json();
                setUserData(user);
                console.log(user);

                const profileResponse = await fetch(`http://localhost:5000/userProfile/${user.id}`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });

                const profile = await profileResponse.json();
                setUserProfileData(profile);
                console.log(profile);
                setSelectedDocument(profile?.documentType || null);
            } catch (error) {
                console.error("Error fetching user/profile data:", error);
            }
        };

        fetchData();
    }, []);

    const handleDocumentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (isEditing) {
            setSelectedDocument(e.target.value);
        }
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>, setPhoto: Function) => {
        if (isEditing && e.target.files) {
            setPhoto(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedDocument || !userProfileData) return;

        try {
            await fetch(`/api/userProfile/${userProfileData}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ documentType: selectedDocument }),
            });

            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleCancel = () => {
        setSelectedDocument(userProfileData?.documentType || null);
        setIsEditing(false);
    };


    return (
        <div className="overflow-hidden px-4 ">
            <div className="flex items-center bg-yellow-300 h-40 rounded-xl p-6 my-10">
                <img height={108} width={108} src={userProfileData?.profileImage || "https://www.indiarunning.com/images/DefaultUserProfile.svg"} />
                <h1 className="flex content-center mx-10 text-black text-4xl">{userData?.fname} {userData?.lname}</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="flex justify-between items-center text-2xl font-semibold text-gray-700 mb-4">
                    Document Upload
                    <button
                        type="button"
                        onClick={() => setIsEditing(!isEditing)}
                        className="flex text-sm text-[rgb(0,179,146)] ml-4"
                    ><img src="https://www.indiarunning.com/icons/pencil-edit.svg" alt="" />
                        {isEditing ? "Cancel" : "Edit"}
                    </button>
                </h2>
                <div className="flex flex-col md:flex-row gap-4">
                    <label className="text-gray-700 flex-1">Select Document Type: <span className="text-lg text-red-600"> *</span>
                        <select
                            name="documentType"
                            value={selectedDocument || ""}
                            onChange={handleDocumentChange}
                            disabled={!isEditing}
                            className="border p-3 w-full rounded bg-gray-100 text-gray-800"
                            required
                        >
                            <option value="" disabled>Select Document Type</option>
                            <option value="Aadhar Card">Aadhar Card</option>
                            <option value="PAN Card">PAN Card</option>
                            <option value="Passport">Passport</option>
                            <option value="Driving License">Driving License</option>
                        </select>
                    </label>
                </div>

                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <label className="text-gray-700 flex-1">Front Photo (Identity Proof): <span className="text-lg text-red-600"> *</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handlePhotoChange(e, setFrontPhoto)}
                                disabled={!isEditing}
                                className="border p-3 w-full rounded bg-gray-100 text-gray-800"
                                required
                            />
                        </label>

                        <label className="text-gray-700 flex-1">Back Photo (Identity Proof): <span className="text-lg text-red-600"> *</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handlePhotoChange(e, setBackPhoto)}
                                disabled={!isEditing}
                                className="border p-3 w-full rounded bg-gray-100 text-gray-800"
                                required
                            />
                        </label>
                    </div>
                </div>

                {isEditing && (
                    <div className="flex justify-end gap-4 mt-4">
                        <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg">Save</button>
                        <button type="button" onClick={handleCancel} className="bg-gray-400 text-white p-3 rounded-lg">Cancel</button>
                    </div>
                )}
            </form>
        </div>
    );
}


