'use client'
import { getBlogWithSlug } from '@/app/[lng]/lib/api/get.api'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import SimilarNews from './SimilarNews'

const MainBlogItem = () => {
    const languages = ['uz', 'ru', 'en']
    const [language, setLanguage] = useState('uz')
    const { slug } = useParams()
    const [blog, setBlogData] = useState(null)
		console.log(blog)
    useEffect(() => {
        const dataBlog = async () => {
            const res = await getBlogWithSlug(slug)
            setBlogData(res.data)
        }
        dataBlog()
    }, [slug])

    return (
        <div className='bg-[#F8F8F8] 3xl:flex 3xl:flex-row 3xl:px-[30px]'>
            <div className='bg-white rounded-[30px] py-[24px] px-[16px] mdl:py-[40px] mdl:px-[20px] 3xl:mt-[70px] 3xl:flex 3xl:flex-col 3xl:w-[80%] 3xl:px-[138px] 3xl:py-[70px] mb-[60px] 3xl:mb-[120px]'>

                {/* Language Selection Buttons */}
                <div className="flex space-x-4 mb-4">
                    {languages.map((lang) => (
                        <button
                            key={lang}
                            className={`text-[16px] ${language === lang ? 'text-red' : 'text-black'}`}
                            onClick={() => setLanguage(lang)}
                        >
                            {lang.toUpperCase()}
                        </button>
                    ))}
                </div>

                {/* Render the title */}
                {!blog ? (
                    <p>Blog post not found</p>
                ) : (
                    blog.option.map(optio => (
                        <p
                            key={optio.id}
                            className='text-[23px] font-bold mdl:text-[40px] 3xl:text-[45px] text-titleDark'
                        >
                            {optio.title[language]}
                        </p>
                    ))
                )}

                {/* Render the image only if it exists */}
                {blog?.option?.url && (
                    <div className='mt-[15px] mdl:mt-[40px]'>
                        <Image
                            width={1117}
                            height={635}
                            quality={100}
                            src={blog.photo.url}
                            alt='Blog Image'
                            className='object-contain'
                        />
                    </div>
                )}
            </div>

            <div className='3xl:w-[40%] 3xl:mt-[70px] mb-[60px] 3xl:mb-[120px] order-[-1]'>
                <SimilarNews />
            </div>
        </div>
    )
}

export default MainBlogItem
