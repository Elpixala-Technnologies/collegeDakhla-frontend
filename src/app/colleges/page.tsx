"use client";
import CollegeListItem from "@/components/collegeListItem/collegeListItem";
import CollegeFilters from "@/components/filters/collegeFilters/collegeFilters";
import { useEffect, useRef, useState } from "react";
import { MdEmail, MdOutlineSort } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";
import {
  getColleges,
  getCollegesFilter,
  getStreamData,
  searchCollege,
  topColleges,
} from "@/query/schema";
import { useQuery } from "@apollo/client";
import Carousel from "@/components/carousel/carousel";
import CollegeCard from "@/components/card/collegeCard";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaTwitter,
} from "react-icons/fa";
import Link from "next/link";
import { FaCircleChevronRight } from "react-icons/fa6";

export default function CollegeList() {
  const [Search, setSearch] = useState("");
  const [MobileFilter, setMobileFilter] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [Stream, setStream] = useState<string>("default");
  // const [TopStream, setTopStream] = useState<string>("")
  const [Limit, setLimit] = useState<number>(10);

  const [showFullContent, setShowFullContent] = useState(false);
  const [showReadMore, setShowReadMore] = useState(true);

  const handleReadMoreClick = () => {
    setShowFullContent(true);
    setShowReadMore(false);
  };

  const handleReadLessClick = () => {
    setShowFullContent(false);
    setShowReadMore(true);
  };

  // get college data
  const { loading, error, data: initialData } = useQuery(getColleges);

  const {
    loading: filterLoader,
    error: filterError,
    data: filteredCollege,
  } = useQuery(searchCollege, {
    variables: {
      Search,
    },
  });

  //query to get top colleges
  const {
    loading: topCollegesLoader,
    error: topCollegesError,
    data: topCollegesData,
  } = useQuery(topColleges, {
    variables: { Limit },
  });

  const {
    loading: streamLoader,
    error: streamError,
    data: streamData,
  } = useQuery(getStreamData, {
    variables: { Stream },
  });
  const aboutStream =
    streamData?.streams?.data[0]?.attributes?.contentForColleges;

  const handleMobileFilter = () => {
    setMobileFilter(!MobileFilter);
    if (MobileFilter) {
      document.body.style.overflow = "hidden";
    }
  };

  const handleClick = () => {
    console.log(filteredData);
    console.log("Filtered Colleges:", filteredCollege);
  };

  useEffect(() => {
    const content = document.getElementById("content")!;
    const readMore = document.getElementById("readMore")!;

    if (content?.scrollHeight > content?.clientHeight) {
      setShowReadMore(true);
    }
  }, []);

  const [showAll, setShowAll] = useState(false);
  const initialColleges = showAll
    ? initialData?.colleges?.data
    : initialData?.colleges?.data;

  const handleLoadMore = () => {
    setShowAll(true);
  };


  const handleSearch = (event: any) => {
    const searchValue = event.target.value.toLowerCase();
    console.log(searchValue ,"search value",searchValue.length>0);

    // If search query is empty, set filtered data to initial data and return
    if (!searchValue.trim() && searchValue.length > 0) {
      setFilteredData(initialData?.colleges?.data);
      return;
    }

    // Memoize filtered data to avoid re-filtering unnecessarily
    if(searchValue.length>0){
      const filtered = filteredCollege?.colleges?.data.filter((item: any) =>
        item.attributes.collegeName.toLowerCase().includes(searchValue)
      );
      setFilteredData(filtered);
    }
    

    
  };



  return (
    <>
      <div className="max-w-screen-xl mx-auto">
        <section className="w-full items-center justify-center inline-flex flex-nowrap overflow-hidden sm:[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll m-2">
            <div className="flex flex-row items-center justify-between lg:gap-80 md:gap-48 ">
              <div className="flex items-center flex-row gap-8">
                <div className="gap-1 flex items-center">
                  <FaPhone />
                  <span className="ml-2">+919899880100</span>
                </div>
                <div className="gap-1 flex items-center">
                  <MdEmail />
                  <span className="ml-2">director@collegedakhla.com</span>
                </div>
              </div>
              <div className=" items-center flex-row gap-2 sm:flex hidden">
                <span className="md:flex hidden">
                  We're on your favourite social media!
                </span>
                <span>
                  <Link href="/">
                    <FaInstagram />
                  </Link>
                </span>
                <span>
                  <Link href="/">
                    <FaFacebook />
                  </Link>
                </span>
                <span>
                  <Link href="/">
                    <FaTwitter />
                  </Link>
                </span>
                <span>
                  <Link href="/">
                    <FaLinkedin />
                  </Link>
                </span>
              </div>
            </div>
          </ul>
        </section>
        <section className="heroSection">
          <div className="m-4 px-8 pt-8 bg-white flex flex-col rounded-sm">
            <h1 className="text-xl font-bold mb-3 text-center text-primary">
              Showing Top {filteredCollege?.colleges?.data?.length} Colleges in
              India
            </h1>
            <p
              className={`${
                showFullContent ? "text-justify" : " text-center"
              } text-base mb-3`}
            >
              The list of top engineering colleges in India 2024 includes IT
              Madras, IIT Bombay, IIT Kanpur, IIT Roorkee, IIT Kharagpur, etc.
              Out of the total engineering colleges in India 95 colleges are
              privately owned and 92 colleges are administered by the
              government. The best engineering colleges in India 2024 include a
              total of 23 lITs, 31 NITs and 25 IIITS, JEE Main and Advanced
              being the major entrance exams accepted to these best engineering
              institutes is conducted every year for enrolling students in the
              B.lech courses.
            </p>
            {showFullContent && (
              <div>
                <p>
                  JEE Main 2024 schedule has been released for admission to the
                  top engineering colleges in india. JEE Main 2024 session 2
                  will be held from April 4 to April 15, 2024. In addition to
                  JEE scores, some other entrances accepted by the best
                  engineering colleges in India are EAPCET, MHT CET, SRMJEEE,
                  VITEEE, WBJEE and many more. Let's take a look at the top
                  engineering colleges in India 2024. As per the previous year
                  NIRF Ranking, the top 5 engineering colleges in India include
                  IT Madras, IT Delhi IT Bombay, IT Kanpur and Ill Roorkee.
                  Seeing the previous year's trends, it Is expected that these
                  ITs will once again secure the top positions amongst the top
                  engineering colleges in India in the NIRF Ranking 2024 as
                  well. We have listed the top 10 engineering colleges in India
                  based on the prestigious NIRF Ranking 2023.
                </p>
              </div>
            )}
            <div
              dangerouslySetInnerHTML={{ __html: aboutStream }}
              className="font-poppins text-base text-wrap"
              style={{
                display: showFullContent ? "block" : "none",
              }}
            ></div>
            <div className="py-2 text-primary text-sm text-right">
              {showReadMore && !showFullContent && (
                <div className="readMore">
                  <span
                    onClick={handleReadMoreClick}
                    className="hover:underline cursor-pointer"
                  >
                    Show more
                  </span>
                </div>
              )}
              {showFullContent && (
                <div className="cursor-n-resize">
                  <span
                    onClick={handleReadLessClick}
                    className="hover:underline"
                  >
                    Show less
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>
        <section className="topCollege">
          <div className="m-4 bg-white py-8 my-4 px-4">
            <h2 className="text-xl font-bold mb-3"></h2>
            <Carousel
              slidesDesktop={4}
              slidesTablet={3}
              title="Featured Colleges"
              showPagination={false}
              slides={topCollegesData?.colleges?.data?.map(
                (college: any, index: number) => {
                  return <CollegeCard key={index} featuredCollege={college} />;
                }
              )}
            />
          </div>
        </section>
        <section className="collegeList">
          <div className="flex flex-col md:flex-row gap-4 px-4">
            <div className="flex-none w-64 h-full drop-shadow-md hover:drop-shadow-xl">
              <CollegeFilters
                allColleges={initialData}
                setFilteredData={setFilteredData}
                isMobile={MobileFilter}
                handleMobileFilter={handleMobileFilter}
                setStream={setStream}
              />
            </div>
            <div className="flex-1 w-full">
              <div className="mb-4 flex gap-4 items-stretch relative max-md:flex-col">
                <div className="bg-white h-12 flex border-2 border-extra-light-text rounded-md flex-1 items-center text-primary-text px-2 focus-within:border-secondary-text">
                  <RiSearchLine />
                  <input
                   className="w-full focus:outline-none"
                   type="text"
                   placeholder="Search colleges..."
                   onChange={handleSearch}
                  />
                </div>
                <div className="flex gap-4">
                  <div
                    className="flex border-2 h-10 items-center px-2 border-extra-light-text gap-2 rounded-md cursor-pointer"
                    onClick={handleClick}
                  >
                    <span>Sort</span> <MdOutlineSort />
                  </div>
                  <div className="max-md:block hidden">
                    <div className="flex border-2 items-center px-2 border-extra-light-text gap-2 rounded-md cursor-pointer">
                      <span onClick={handleMobileFilter}>Filter</span>
                      <MdOutlineSort />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex sm:flex-col flex-row overflow-x-scroll">
                <CollegeListItem colleges={filteredData} />
                {!showAll && (
                  <button
                    className="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow m-6"
                    onClick={handleLoadMore}
                  >
                    <div className="absolute inset-0 w-3 bg-amber-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                    <span className="relative text-black group-hover:text-white">
                      Load More
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
