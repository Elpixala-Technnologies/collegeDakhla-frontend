"use client";
import { useEffect, useState } from "react";
import { MdOutlineSort } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";
import { getFeaturedCourses, searchCourses, getCourses } from "@/query/schema";
import { useQuery } from "@apollo/client";
import CourseListItem from "@/components/courseListItem/courseListItem";
import Carousel from "@/components/carousel/carousel";
import CourseCard from "@/components/card/courseCard";
import CourseFilters from "@/components/filters/courseFilters/courseFilters";
import SortButton from "@/components/sortButton/SortButton";
import Spinner from "@/components/Loader/loader";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function CourseList() {
  // const [Search, setSearch] = useState<string>("");
  const [MobileFilter, setMobileFilter] = useState(false);
  const [DurationFilter, setDurationFilter] = useState<string>("");
  const [SpecializationFilter, setSpecializationFilter] = useState<string>("");
  const [showReadMore, setShowReadMore] = useState(true);
  const [showFullContent, setShowFullContent] = useState(false);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [displayCount, setDisplayCount] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [sortOption, setSortOption] = useState<any>([]);

  //query to get searched courses
  const {
    loading: coursesLoader,
    error: coursesError,
    data: coursesData,
  } = useQuery(searchCourses, {
    variables: {
      searchValue,
      // DurationFilter,
      // SpecializationFilter,
    },
  });
  // query to get all courses
  const {
    loading: allCoursesLoader,
    error: allCoursesError,
    data: allCoursesData,
  } = useQuery(getCourses);

  // sorting
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSort = (option: React.SetStateAction<string>) => {
    setSortOption(option ? [option] : []);
    setIsOpen(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  // End

  //query to get featured courses
  const {
    loading: featuredLoader,
    error: featuredError,
    data: featuredCourses,
  } = useQuery(getFeaturedCourses);

  const handleSearch = (event: any) => {
    const value = event.target.value.trim();
    setSearchValue(value);
  };

  const handleReadMoreClick = () => {
    setShowFullContent(true);
    setShowReadMore(false);
  };

  const handleReadLessClick = () => {
    setShowFullContent(false);
    setShowReadMore(true);
  };

  const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + 5);
  };

  const handleFilterOptionClick = (option: any) => {
    if (option === "a-z") {
      const sortedData: any = [...allCoursesData?.courses?.data].sort(
        (a: any, b: any) => {
          return a?.attributes?.name.localeCompare(b?.attributes?.name);
        }
      );
      setFilteredData(sortedData.slice(0, displayCount));
    } else if (option === "reset") {
      const resetArray: any = [...allCoursesData?.courses?.data].slice(
        0,
        displayCount
      );
      setFilteredData(resetArray);
    }
  };

  useEffect(() => {
    if (allCoursesData && allCoursesData?.courses?.data) {
      if (searchValue.trim() === "") {
        setFilteredData(allCoursesData?.courses?.data.slice(0, displayCount));
      } else {
        const filtered = allCoursesData?.courses?.data.filter((course: any) =>
          course.attributes.name
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        );
        setFilteredData(filtered?.slice(0, displayCount));
      }
    }
  }, [searchValue, allCoursesData, displayCount]);

  // useEffect(() => {
  //   console.log(allCoursesData?.courses?.data, "pppp");
  // }, [allCoursesData?.courses?.data]);

  return (
    <>
      <div className="max-w-screen-xl mx-auto">
        <section className="heroSection">
          <div className="m-4 px-8 pt-8 bg-white flex flex-col rounded-xl">
            <h1 className="text-xl font-bold mb-3 text-center text-primary">
              All Exams 2023-2024, Dates, Application Forms & Alerts
            </h1>
            <p
              className={`${
                showFullContent ? "text-justify" : " text-center"
              } text-base mb-3`}
            >
              At <span className="text-primary">College Dakhla</span>, we're
              dedicated to helping students discover and pursue the best courses
              India has to offer. With a myriad of options available, selecting
              the right course can be overwhelming. Our expertise lies in
              simplifying this process.From engineering and medicine to
              management and humanities, we provide personalized guidance
              tailored to your interests and career goals.
            </p>
            {showFullContent && (
              <div>
                <p>
                  Aspirants must remain vigilant and proactive in tracking exam
                  Our team assists you in exploring top institutions,
                  understanding curriculum structures, and navigating admission
                  procedures, ensuring a smooth transition into your chosen
                  field of study. With{" "}
                  <span className="text-primary">College Dakhla</span>, embark
                  on your educational journey confidently, knowing you've chosen
                  the perfect course to unlock your full potential and pave the
                  way for a successful future.
                </p>
              </div>
            )}

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
        <section className="topCourses">
          <div className="m-4 bg-white py-4 px-4">
            <Carousel
              slidesDesktop={4}
              slidesTablet={3}
              title="Featured Courses"
              showPagination={false}
              slides={featuredCourses?.courses?.data?.map(
                (course: any, index: number) => {
                  return <CourseCard key={index} featuredCourse={course} />;
                }
              )}
            />
          </div>
        </section>
        <section className="collegeList">
          <div className="flex  md:flex-row gap-3 px-4 my-5">
            {/* aside Filter  */}
            <aside
              className={`min-w-[300px] h-min border border-zinc-300 rounded-md px-3 [flex:2] max-md:bg-black max-md:bg-opacity-80 ${
                MobileFilter
                  ? "fixed left-0 top-0 z-40 h-screen w-full overflow-y-scroll pr-[20%]"
                  : "max-md:hidden"
              }`}
            >
              <button
                className="fixed right-5 top-24 text-3xl text-white md:hidden"
                onClick={() => setMobileFilter(false)}
              >
                <IoIosCloseCircleOutline />
              </button>
              <CourseFilters
                DurationFilter={DurationFilter}
                setDurationFilter={setDurationFilter}
                SpecializationFilter={SpecializationFilter}
                setSpecializationFilter={setSpecializationFilter}
                totalCourses={coursesData?.courses?.meta?.pagination?.total}
              />
            </aside>
            {/* main Exam Search and List Section  */}
            <main className="flex w-full flex-col p-5 pt-0  md:min-w-[550px] md:[flex:8]">
              <div className="mb-4 flex gap-4 items-stretch relative max-md:flex-col">
                <div className="bg-white h-12 flex border border-zinc-300 rounded-md flex-1 items-center text-primary-text px-2 focus-within:border-secondary-text">
                  <RiSearchLine />
                  <input
                    className="w-full flex-1 text-sm px-2 py-1 outline-none  max-md:h-12"
                    type="text"
                    placeholder="Search Courses..."
                    onChange={handleSearch}
                  />
                </div>
                <div className="flex gap-4">
                  {/* sort button  */}
                  <SortButton
                    handleFilterOptionClick={handleFilterOptionClick}
                  />
                  {/* Filter Button  */}
                  <div className="max-md:block hidden">
                  <div className="group flex h-12 cursor-pointer items-center gap-2 rounded-md border border-zinc-300 bg-white px-2 text-black">
                      <span onClick={() => setMobileFilter(true)}>Filter</span>
                      <MdOutlineSort />
                    </div>
                  </div>
                </div>
              </div>
              {allCoursesData?.courses?.data ? (
                <CourseListItem courses={filteredData} />
              ) : (
                <div className="w-full h-full p-20 item-center flex justify-center">
                  <Spinner />
                </div>
              )}

              {filteredData?.length >= 10 &&
                filteredData?.length < allCoursesData?.courses?.data.length && (
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
            </main>
          </div>
        </section>
      </div>
    </>
  );
}
