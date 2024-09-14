'use client';
import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

// Import images directly
import One from '@/public/images/puzzle/Part1.png';
import Two from '@/public/images/puzzle/Part2.png';
import Three from '@/public/images/puzzle/Part3.png';
import Four from '@/public/images/puzzle/Part4.png';
import Five from '@/public/images/puzzle/Part5.png';
import Six from '@/public/images/puzzle/Part6.png';
import Winner from '@/public/images/puzzle/winner.png';
import arrowWinner from '@/public/images/puzzle/arrowWinner.png';
import Link from 'next/link'

const PuzzlePiece = ({ id, imagePart, onClick, rotation }) => {
  useEffect(() => {
    // GSAP entry animation for each piece
    gsap.fromTo(`.piece-${id}`, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 1, delay: id * 0.2 });
  }, [id]);

  return (
    <div
      className={`piece-${id} cursor-pointer border-[1px] border-white`}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
      onClick={() => onClick(id)}
    >
      <Image src={imagePart} width={400} height={400} quality={100} alt={`Puzzle piece ${id}`} />
    </div>
  );
};

const WinnerInfo = () => {
  useEffect(() => {
    // GSAP animation for WinnerInfo appearance
    const timeline = gsap.timeline();
    timeline
      .fromTo('.winner-container', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' })
      .fromTo('.winner-text', { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.5')
      .fromTo('.winner-button', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.3')
      .fromTo('.winner-arrow', { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.7');
  }, []);

  return (
    <div className='winner-container flex flex-col w-full rounded-[30px] bg-violet100 relative overflow-hidden pb-[30px] mt-[20px] mdl:mt-[25px] 3xl:mt-[30px] mdl:pb-[100px] xl:pb-[20px] '>
      <div className='relative overflow-hidden h-[116px] mdl:h-[160px] 4xl:h-[295px] 2xl:h-[250px]'>
        <Image src={Winner} width={131} height={121} quality={100} alt='Winner Image' className='absolute top-0 right-[-50px] mdl:top-[20px] mdl:right-[30px] 2xl:w-[200px] 2xl:h-[250px] 4xl:w-[291px] 4xl:h-[291px] object-contain'/>
      </div>
      <div className='flex flex-col gap-[8px] mdl:gap-[10px] 4xl:gap-[30px] w-[80%] mx-auto 4xl:w-[70%]'>
        <div className='text-center'>
          <p className='winner-text text-[12px] leading-[19px] text-white100 mdl:text-[18px] mdl:leading-[28px] 4xl:text-[25px] 4xl:leading-[30.48px] xl:text-[30px] '>Поздравляем! Вы получили подарок</p>
        </div>
        <div className='text-center'>
          <h2 className='winner-text text-[28px] font-bold text-white100 leading-[34.13px] mdl:text-[40px] mdl:leading-[48.76px] 4xl:text-[90px] xl:text-[45px] xl:mt-[30px] 4xl:leading-[109.71px]'>БЕСПЛАТНЫЙ РАЗБОР ВАШЕГО ПРОЕКТА</h2>
        </div>
      </div>  

      <div className='flex flex-col 4xl:flex-col 4xl:mt-[200px] '>
      <div className='relative w-[70px] h-[70px] mt-[20px] mdl:w-[137px]  mdl:h-[179px] xl:h-[300px] 4xl:h-[353px] 4xl:w-[250px] 4xl:order-1  '>
        <Image src={arrowWinner} width={400} height={400} quality={100} alt='Winner Image' className='winner-arrow absolute left-[40px] top-[-20px] mdl:left-[40px] 2xl:left-[150px] 4xl:left-[150px] '/>
      </div>
      <Link href='tel:/+998905092562' className='mt-[15px] winner-button bg-white100 w-[70%] mx-auto py-[20px] px-[30px] rounded-[100px] text-center mdl:w-[40%] xl:w-[30%]  4xl:w-[30%] mdl:mt-[-150px]'>
        <p href='zayafka' className=' text-violet100 text-[14px] font-bold mdl:text-[18px]'> 
          Связаться с нами
        </p>
      </Link>
      </div>
      
    </div>
  );
};

const Puzzle = () => {
  const [rotations, setRotations] = useState({});
  const [win , setWin] = useState(false)

  const correctRotations = {
    1: 180,
    2: 270,
    3: 90,
    4: 270,
    5: 180,
    6: 270
  };

  useEffect(() => {
    const initialRotations = [1, 2, 3, 4, 5, 6].reduce((acc, piece) => {
      acc[piece] = 0;
      return acc;
    }, {});
    setRotations(initialRotations);
  }, []);

  const handleClick = (id) => {
    const newRotation = (rotations[id] + 90) % 360;

    gsap.to(`.piece-${id}`, { duration: 0.5, rotate: newRotation });

    setRotations((prevRotations) => ({
      ...prevRotations,
      [id]: newRotation
    }));
  };

  const checkIfSolved = () => {
    const allCorrect = [1, 2, 3, 4, 5, 6].every((piece) => rotations[piece] === correctRotations[piece]);

    if (allCorrect) {
      setWin(true);
    }
  };

  useEffect(() => {
    checkIfSolved();
  }, [rotations]);

  const imageMap = {
    1: One,
    2: Two,
    3: Three,
    4: Four,
    5: Five,
    6: Six,
  };

  return (
    <>
      {win ? (
        <WinnerInfo />
      ) : (
        <div className="flex px-[12px] py-[30px] flex-col items-center justify-center bg-violet100 rounded-[30px] mdl:rounded-[60px] 4xl:rounded-[100px] mt-[20px] mdl:mt-[25px] 4xl:mt-[30px] 4xl:py-[80px]">
          <h1 className="text-white text-[28px] mx-auto w-[90%] mdl:w-[60%] 2xl:w-[30%] mdl:text-[40px] 4xl:text-[50px] mb-4 font-bold text-center ">Соберите пазл и получите подарок!</h1>
          <div className="grid grid-cols-3 grid-rows-2 gap-0 w-full max-w-[600px] mdl:max-w-[800px] 4xl:max-w-[1200px]">
            <PuzzlePiece id={1} imagePart={imageMap[1]} onClick={handleClick} rotation={rotations[1]} />
            <PuzzlePiece id={2} imagePart={imageMap[2]} onClick={handleClick} rotation={rotations[2]} />
            <PuzzlePiece id={3} imagePart={imageMap[3]} onClick={handleClick} rotation={rotations[3]} />
            <PuzzlePiece id={4} imagePart={imageMap[4]} onClick={handleClick} rotation={rotations[4]} />
            <PuzzlePiece id={5} imagePart={imageMap[5]} onClick={handleClick} rotation={rotations[5]} />
            <PuzzlePiece id={6} imagePart={imageMap[6]} onClick={handleClick} rotation={rotations[6]} />
          </div>
          <p className="text-white font-semibold mt-[30px] 4xl:mt-[80px] text-[14px] mdl:text-[20px] 4xl:text-[25px]">Не пролистывайте просто так :)</p>
        </div>
      )}
    </>
  );
};

export default Puzzle;
