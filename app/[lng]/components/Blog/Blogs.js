"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GrLinkNext } from 'react-icons/gr';
import { getAllBlogs } from '../../lib/api/get.api';
import { useParams } from 'next/navigation';

const Blogs = () => {
  const [visibleCount, setVisibleCount] = useState(6); // Initially show 6 blogs
  const [blogData, setBlogData] = useState([]);  // Initialize with an empty array
  const [loading, setLoading] = useState(true);  // Loading state
  const { lng } = useParams();

  // Handler for showing more blogs
  const showMoreBlogs = () => {
    setVisibleCount((prevCount) => prevCount + 6); // Show 6 more blogs when clicked
  };

  // Fetch blog data when the component mounts or when `lng` changes
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await getAllBlogs(lng);  // Fetch the blogs using the API
        setBlogData(res.data);  // Assuming the response has a `data` field
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);  // Set loading to false after the fetch
      }
    };

    fetchBlogs();
  }, [lng]);

  if (loading) {
    return <p>Loading...</p>;  // Display loading message while blogs are being fetched
  }

  if (!blogData || blogData.length === 0) {
    return <p>No blogs found.</p>;  // Display message if no blogs are found
  }

  return (
    <div className='flex flex-col mt-[40px] mdl:mt-[60px] gap-[40px] py-[30px] px-[12px] w-full rounded-[30px] mdl:rounded-[60px] 4xl:rounded-[100px] bg-[#F8F8F8] mdl:px-[40px]'>
      {/* Blog Cards */}
      <div className='flex flex-col mdl:flex mdl:flex-row mdl:flex-wrap gap-[40px] mdl:gap-[50px] slg:flex-row slg:flex-wrap relative'>
        {blogData.slice(0, visibleCount).map((item) => (
          <Link
            href={`/blog/${item.slug}`}
            key={item.id}
            className='card__blog slg:w-[45%] cursor-pointer 2xl:w-[30%] relative'
          >
            {/* Only display the image if the URL is not empty */}
            {item.option[0]?.photo?.url ? (
              <div className='slg:h-[230px] '>
                <Image
                  width={600}
                  height={600}
                  quality={100}
                  alt='blog image'
                  src={item.option[0]?.photo?.url}  // Accessing the photo URL
                  className='object-cover w-full h-full'
                />
              </div>
            ) : null}
            <div className='mt-[14px] flex flex-col gap-[8px] mb-[40px]'>
              <p className='w-full text-[20px] text-titleDark font-semibold mdl:text-[25px] mdl:leading-[30.48px]'>
                {item.option[0]?.title || "Untitled"} {/* Safely accessing the title */}
              </p>
            </div>
            <div className='mt-[8px] mdl:mt-[20px] absolute bottom-[0]'>
              <span className='text-violet100 text-[14px] font-bold flex items-center mdl:text-[18px]'>
                Подробнее
                <GrLinkNext className='text-violet100 ml-[8px]' />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < blogData.length && (
        <div className='hidden mdl:flex justify-center mt-[40px]'>
          <button
            onClick={showMoreBlogs}
            className='px-[24px] py-[12px] bg-violet100 text-white rounded-full text-[18px]'
          >
            Загрузить еще
          </button>
        </div>
      )}
    </div>
  );
};

export default Blogs;
