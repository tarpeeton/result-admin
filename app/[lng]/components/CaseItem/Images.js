'use client'

import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Image from 'next/image';
import { IoClose } from "react-icons/io5";
import { deleteImage } from '../../lib/api/delete.api';
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { CreateSliders } from '../Create/case.slider';
const responsive = {
	mobile: {
		breakpoint: { max: 768, min: 0 },
		items: 1, // Show 1 image on mobile
	},
	tablet: {
		breakpoint: { max: 1024, min: 769 },
		items: 2, // Show 2 images on tablets
	},
	desktop: {
		breakpoint: { max: 3000, min: 1025 },
		items: 2, // Show 2 images on desktop
	},
};

const Images = ({ slider , ID }) => {
	// Prevent rendering if slider is empty or null
	if (!slider || slider.length === 0) {
		return null;
	}

	const [open, setOpen] = useState(false);
	const toggleModalOpen = () => setOpen(!open);

	const DeleteImage = async (id) => {
		try {
			await deleteImage(id);
			toastr.success('Image deleted successfully!'); // Show success toast
			console.log(id);
		} catch (error) {
			toastr.error('Failed to delete the image.'); // Show error toast
			console.error(error);
		}
	};

	return (
		<div className='mt-[80px] mb-[80px] 3xl:mb-[200px]'>
			<div className='flex flex-row justify-between'>
				<h2 className='text-[28px] mdl:text-[50px] font-bold mb-[20px] mdl:mb-[40px]'>
					Галерея
				</h2>
				<button
					onClick={toggleModalOpen}
					className='w-[20%] bg-violet100 rounded-full h-[60px] py-[25px] px-[15px] text-white100 text-center text-[18px] font-bold flex items-center justify-center'
				>
					Добавить фото
				</button>
			</div>
				<CreateSliders  visible={open} close={toggleModalOpen} ID={ID}/>
			{/* Carousel */}
			<Carousel
				responsive={responsive}
				infinite={true}
				autoPlay={true}
				autoPlaySpeed={3000}
				arrows={false}
				containerClass='carousel-container'
				itemClass='carousel-item-padding-40-px'
			>
				{slider.map(item => (
					// Check if the URL exists before rendering the image
					item?.url && (
						<div key={item.id} className='px-2 cursor-pointer relative'>
							<Image
								width={1600}
								height={670}
								quality={100}
								src={item?.url}
								alt={`Slide ${item.id}`}
								className='object-cover w-full'
							/>
							<button onClick={() => DeleteImage(item.id)} className='bg-white100 rounded-full text-titleDark absolute top-[20px] right-[20px] flex items-center justify-center w-[60px] h-[60px]'>
								<IoClose size={25} />
							</button>
						</div>
					)
				))}
			</Carousel>
			
		</div>
	);
};

export default Images;
