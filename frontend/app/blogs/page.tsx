'use client';
import Image from "next/image";
import {  useState } from "react";
import Link from "next/link";

export default function Stories() {
    const [showMore, setShowMore] = useState(false);

    const stories = [
        {
            title: "Bahadur Prasad",
            description: "India’s Middle-Distance Marvel of the 90s",
            date: "28th Nov",
            views: 71,
            imageUrl:
                "https://race-registration-production-media.s3-ap-south-1.amazonaws.com/stories-and-blogs/2fd6b9b5-b60d-4196-bf19-6e6087d4b965-1732792498218-5HPLIGF5AZ/BP-thumb1732792498219.jpg",
            authorImage:
                "https://race-registration-production-media.s3-ap-south-1.amazonaws.com/profile-data/0055aa89-fb17-4d82-b4ab-26be2cdda113-1723108798919-2KVWLH1RDW/photo.png",
        },
        {
            title: "Gopal Saini",
            description: "The Olympic champion from the 80s",
            date: "11th Nov",
            views: 84,
            imageUrl:
                "https://race-registration-production-media.s3-ap-south-1.amazonaws.com/stories-and-blogs/69af0ba8-dea9-47c7-8a42-455433de0e63-1731316744382-UXJQJLDPND/Gopal-Saini1731316744382.png",
            authorImage:
                "https://race-registration-production-media.s3-ap-south-1.amazonaws.com/profile-data/0055aa89-fb17-4d82-b4ab-26be2cdda113-1723108798919-2KVWLH1RDW/photo.png",
        },
        {
            title: "Adille Sumariwalla",
            description: "Champion Sprinter and Media Entrepreneur",
            date: "5th Nov",
            views: 60,
            imageUrl:
                "https://race-registration-production-media.s3-ap-south-1.amazonaws.com/stories-and-blogs/687ff1aa-cc9a-407a-ae51-34bba057d44b-1730734144300-UVSTOVJCNF/Screenshot-2024-11-04-2051381730734144300.png",
            authorImage:
                "https://race-registration-production-media.s3-ap-south-1.amazonaws.com/profile-data/0055aa89-fb17-4d82-b4ab-26be2cdda113-1723108798919-2KVWLH1RDW/photo.png",
        },
        {
            title: "Rajesh Ramesh",
            description: "From Ticket Collector to Track Champion",
            date: "5th Nov",
            readTime: "5 min read",
            imageUrl: "https://race-registration-production-media.s3-ap-south-1.amazonaws.com/stories-and-blogs/4e896be6-026f-428e-b6df-952acbeebf66-1730727806757-8LTTGTJPJX/Screenshot-2024-11-04-1852141730727806757.jpg",
            views: 57,
        },
        {
            title: "Sri Ram Singh Shekhawat",
            description: "Asia’s best athlete in the 70s",
            date: "17th Oct",
            readTime: "8 min read",
            imageUrl: "https://race-registration-production-media.s3-ap-south-1.amazonaws.com/stories-and-blogs/bd5708fb-9f2c-4f8c-be32-e8b2f859dfd2-1729155056873-K9HHF4JFUP/SRIRAMSINGH-THAjpg1729155056873.jpg",
            views: 78,
        },
        {
            title: "Milkha Singh",
            description: "The Legend",
            date: "12th Oct",
            readTime: "6 min read",
            imageUrl: "https://race-registration-production-media.s3-ap-south-1.amazonaws.com/stories-and-blogs/991363c0-0018-4977-a797-afd703b398d5-1720089859958-GYZMQDSCKO/41720089859958.jpg",
            views: 100,
        },
        {
            title: "India at Olympic Marathons",
            description: "Analysis of India at Olympic Marathons",
            date: "22nd Sep",
            readTime: "10 min read",
            imageUrl: "https://race-registration-production-media.s3-ap-south-1.amazonaws.com/stories-and-blogs/010127a3-81a0-486f-9974-28aab7413338-1718442824388-TAQYMQ1QGR/india-at-olympic-thumbnail1718442824388.jpg",
            views: 150,
        },
        {
            title: "Avinash Sable",
            description: "From Mandwa to Global Athletics, a Record-Breaking Journey.",
            date: "1st Jan",
            readTime: "12 min read",
            imageUrl: "https://race-registration-production-media.s3-ap-south-1.amazonaws.com/stories-and-blogs/675ea76c-f6b0-478d-ab07-57de3c27b36d-1717740366937-ZAJTJKLCOJ/1_270x1801717740366937.jpg",
            views: 120,
        },
    ];

    const displayedBlogs = showMore ? stories : stories.slice(0, 4);

    const mostReadStories = [
        {
            title: "Rajesh Ramesh",
            subtitle: "From Ticket Collector to Track Champion",
            date: "5th Nov",
            views: 57,
            imageUrl:
                "https://race-registration-production-media.s3-ap-south-1.amazonaws.com/stories-and-blogs/4e896be6-026f-428e-b6df-952acbeebf66-1730727806757-8LTTGTJPJX/Screenshot-2024-11-04-1852141730727806757.jpg",
        },
        {
            title: "Sri Ram Singh Shekhawat",
            subtitle: "Asia’s best athlete in the 70s",
            date: "17th Oct",
            views: 78,
            imageUrl:
                "https://race-registration-production-media.s3-ap-south-1.amazonaws.com/stories-and-blogs/bd5708fb-9f2c-4f8c-be32-e8b2f859dfd2-1729155056873-K9HHF4JFUP/SRIRAMSINGH-THAjpg1729155056873.jpg",
        },
    ];

    return (
        <div>
            <header className="relative w-full h-16 md:h-20 md:px-0 bg-header-bg">
                <div className="flex items-center justify-between w-full h-full gap-3 pl-4 mx-auto xl:px-0" style={{ maxWidth: '1280px' }}>
                    <Link href="/" ><img src="https://www.indiarunning.com/icons/IR-logo.svg" alt="logo" className="cursor-pointer h-9 md:h-10" /></Link>
                    <div className="flex items-center justify-between h-full gap-1">
                        <div className="hidden md:flex text-green-700 bg-white py-2 font-semibold rounded-2xl md:rounded-lg items-center mx-1 px-4 border-2 border-green-700 text-sm h-12 hover:cursor-pointer">
                            <a href="/training">
                                <div className="flex gap-2 justify-center items-center mx-auto lg:text-sm">
                                    <span className="lg:text-sm text-center flex items-center">
                                        Training
                                        <img
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiIGMJsI9PEbNW3AD3YnKvw5lDjjXnOd1q7A&s"
                                            alt="cart"
                                            className="ml-2 w-5 h-5"
                                        />
                                    </span>
                                </div>
                            </a>
                        </div>
                        {/* Shop Button */}
                        <div className="hidden md:flex text-green-700 bg-green-300 py-2 font-semibold rounded-2xl md:rounded-lg items-center mx-1 px-4 text-sm h-12 hover:cursor-pointer">
                            <a href="/shop">
                                <div className="flex gap-2 bg-green-300 justify-center items-center mx-auto lg:text-sm">
                                    <span className="lg:text-sm text-center flex items-center">
                                        Shop
                                        <img
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB9wokEmhg7IZvdBA8Zqfp6FoT5ZvUhEPj3A&s"
                                            alt="cart"
                                            className="ml-2 w-5 h-5"
                                        />
                                    </span>
                                </div>
                            </a>
                        </div>

                        <div className="hidden md:flex text-pink-800 bg-pink-200 py-2 font-semibold rounded-2xl md:rounded-lg items-center mx-1 px-4 text-sm h-12 hover:cursor-pointer">
                        <Link href="/events/dashboard" passHref>
                        <div className="flex gap-2 justify-center items-center mx-auto lg:text-sm cursor-pointer">
                            <span className="lg:text-sm text-center">Create Event</span>
                        </div>
                        </Link>
                        </div>


                        <div className="hidden px-1 font-semibold md:block">
                            <div className="bg-neutral-300 h-[52px] w-[52px] rounded-full p-[2px] flex justify-center items-center">
                                <span style={{ display: 'inline-block', overflow: 'hidden', width: '50px', height: '50px' }}>
                                    <Link href="/userProfile"><img alt="user-profile-pic" src="https://www.indiarunning.com/images/DefaultUserProfile.svg" className="rounded-full hover:cursor-pointer" /></Link>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center h-full gap-4 px-4 md:hidden">
                        <div className="flex h-full w-7 z-30 items-center ">
                            <img src="/icons/menu-icon.svg" alt="menu-icon" className="w-6 h-6 " />
                        </div>
                    </div>
                </div>
            </header>

            <div className="bg-[#F4F4F4] p-2">
                <div className="mx-4 max-w-[1136px] md:mx-auto mb-16 md:mb-1">
                    <div className="py-2 mb-2">
                        <h1 className="my-0 text-2xl font-bold md:my-2 md:mt-4 md:text-[42px] font-redHat text-neutral-800">
                            Stories that Inspire
                        </h1>
                    </div>
                    <div className="flex flex-col mt-6 md:flex-row pb-12  gap-10">
                        <div className="w-full h-full mr-8 md:w-2/3  gap-4">
                            {displayedBlogs.map((story, index) => (
                                <div key={index} className="flex flex-col p-2 m-2 md:p-3 mt-4 border md:mt-0 border-neutral-300 md:border-none rounded-2xl bg-white relative">
                                    <div className="flex flex-row h-full md:h-[180px] gap-2 md:gap-0.5 w-full cursor-pointer m-2 p-2">
                                        <img alt="listing-story-card-image" src={story.imageUrl} className="w-[112px] md:w-[270px] h-[130px] md:h-[180px] rounded-2xl " />
                                        <div className="flex flex-col justify-between w-full mx-0 md:mx-6">
                                            <div className="h-full md:h-auto flex flex-col justify-between">
                                                <div className="flex flex-col">
                                                    <h2 className="pt-3 text-sm font-bold md:pt-1 md:text-2xl text-neutral-800 line-clamp-1">{story.title}</h2>
                                                    <p className="line-clamp-1 text-xs md:text-base text-neutral-600">{story.description}</p>
                                                </div>
                                                <div className="flex text-neutral-400 items-center justify-between md:justify-start pt-3 md:pt-4 text-xs md:text-sm">
                                                    <div className="flex gap-2 items-center">
                                                        <span>5 min read </span>
                                                        <div className="flex justify-center gap-0.5 md:gap-1 pr-1 md:pr-0 md:hidden">
                                                            <img alt="view-icon" src="/icons/view.svg" className="h-3.5 w-3.5 md:h-4 md:w-4 pt-1" />
                                                            <p className="text-xs md:text-sm text-neutral-400">{story.views}</p>
                                                        </div>
                                                    </div>
                                                    <div className="h-1 md:h-1.5 w-1 md:w-1.5 mx-2 md:mx-3 bg-neutral-400 rounded-full hidden md:block"></div>
                                                    <span>{story.date}</span>
                                                </div>
                                                <div className="flex items-center justify-between mt-4">
                                                    <div className="flex items-center justify-between w-full ">
                                                        <div className="flex items-center gap-2 md:gap-3">
                                                            <div className="flex justify-center gap-0.5 md:gap-1 pr-1 md:pr-0  md:flex">
                                                                <img alt="view-icon" src="https://www.indiarunning.com/icons/view.svg" className="h-3.5 w-3.5 md:h-4 md:w-4 pt-1" />
                                                                <p className="text-xs md:text-sm text-neutral-400">{story.views}</p>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <img alt="story-like" src="https://www.indiarunning.com/icons/story-like.svg" className="h-[18px] w-[18px] md:h-[22px] md:w-[22px]" />
                                                                <span className="pl-1 text-sm font-normal text-neutral-500">0</span>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <img alt="story-comment" src="https://www.indiarunning.com/icons/story-chat.svg" className="h-[18px] w-[18px] md:h-[22px] md:w-[22px]" />
                                                                <span className="pl-1 text-sm font-normal text-neutral-500">0</span>
                                                            </div>
                                                        </div>
                                                        <div className="relative md:invisible md:group">
                                                            <img
                                                                alt="author-profile-pic"
                                                                src={story.authorImage}
                                                                className="absolute w-9 h-9 rounded-full left-[-10px] top-[-20px] md:left-auto md:top-auto md:right-1"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-start absolute bottom-2 w-full">
                                                    <span className="mr-2">
                                                        <img
                                                            src="https://race-registration-production-media.s3-ap-south-1.amazonaws.com/profile-data/0055aa89-fb17-4d82-b4ab-26be2cdda113-1723108798919-2KVWLH1RDW/photo.png"
                                                            alt=""
                                                            className="w-3"
                                                        />
                                                    </span>
                                                    <span>India running</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {/* Show More Button */}
                            <div className="flex justify-center mt-4">
                                <button
                                    onClick={() => setShowMore(!showMore)}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg"
                                >
                                    {showMore ? "Show Less" : "Show More"}
                                </button>
                            </div>
                        </div>



                        {/* Most Read Section */}
                        <div className="mt-4 space-y-4 pl-5 ">
                            <div className="mt-4 space-y-4 text-lg font-bold text-neutral-800">Most Read</div>

                            {mostReadStories.map((story, index) => (
                                <div key={index} className="flex flex-col bg-white border-white rounded-xl border-2 shadow-md pb-4">
                                    <div className="flex gap-2">
                                        <img
                                            alt="most-read-story-image"
                                            src={story.imageUrl}
                                            className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-xl m-2"
                                        />
                                        <div className="flex flex-col">
                                            <h3 className="text-sm font-semibold text-neutral-700">{story.title}</h3>
                                            <p className="text-xs text-neutral-500">{story.subtitle}</p>
                                            <p className="text-xs text-neutral-400">Views: {story.views}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

