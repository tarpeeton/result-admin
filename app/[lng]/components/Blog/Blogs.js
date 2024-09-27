"use client"
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GrLinkNext } from 'react-icons/gr';
import medicalMarketin from '@/public/images/blog/medicalMarketin.jpg'
import blogImage from '@/public/images/blog/meditsiniskiySe0.jpg'
import videoMarketing from '@/public/images/blog/video.jpg'
import klinikcastniy from '@/public/images/blog/klinikcastniy.jpg'
import target from '@/public/images/blog/Target.jpg'
import patient from '@/public/images/blog/patient.jpg'
import like from '@/public/images/blog/like.jpg'
import brand from '@/public/images/blog/brand.jpg'
import tv from '@/public/images/blog/tv.jpg'
import crm from '@/public/images/blog/crm.jpg'
import equipment from '@/public/images/blog/equipment.jpg'


const blogData = [
	{
	  id: 0,
	  slug: 'blog1',
	  title: {
		uz: 'Как социальные сети могут улучшить репутацию вашей компании',
		ru: 'Эффективный маркетинг для частных медицинских клиник: ключевые особенности',
		en: 'How social media can improve your company’s reputation',
	  },
	  description: {
		uz: 'Lorem ipsum dolor sit amet consectetur. Vel a sit id venenatis vitae...',
		ru: 'Узнайте, как продвигать частную медицинскую клинику, привлекать больше пациентов и усиливать доверие с помощью проверенных маркетинговых стратегий.',
		en: 'Learn how to promote a private medical clinic, attract more patients, and build trust using proven marketing strategies.',
	  },
	  photo: {
		id: 0,
		url: medicalMarketin,
	  },
	  orderNum: 0,
	  text: `
		В мире частной медицины конкуренция растет с каждым днём, и просто предоставлять качественные медицинские услуги уже недостаточно. Клиника должна быть на слуху и в сердце пациента. Поэтому маркетинг для частных медицинских учреждений — это не роскошь, а необходимость. А как выделиться среди конкурентов? Рассмотрим это детально.
  
		
	  `,
	},
	{
	  id: 1,
	  slug: 'blog2',
	  title: {
		uz: 'SEO uchun tibbiy saytlar: ko\'rinishni yaxshilash bo\'yicha maslahatlar',
		ru: 'SEO для медицинских сайтов: лучшие советы для повышения видимости в интернете',
		en: 'SEO for Medical Websites: Best Tips for Improving Online Visibility',
	  },
	  description: {
		uz: 'Lorem ipsum dolor sit amet consectetur. Vel a sit id venenatis vitae...',
		ru: 'Узнайте, как с помощью SEO улучшить видимость медицинского сайта в поисковых системах, привлечь больше пациентов и повысить рейтинг клиники.',
		en: 'Learn how SEO can improve your medical website’s visibility in search engines, attract more patients, and improve your clinic’s ranking.',
	  },
	  photo: {
		id: 1,
		url: blogImage,
	  },
	  orderNum: 1,
	  text: `
		Когда у людей возникают проблемы со здоровьем, куда они обращаются в первую очередь? Правильно, в Google! Они ищут ближайшие клиники, специалистов, читают отзывы, смотрят, что предлагает ваша клиника. Но как сделать так, чтобы ваш сайт был среди первых в поисковой выдаче? Это задача для SEO — поисковой оптимизации. Готовы узнать, как вывести свой сайт на первую страницу?
  
		**Что такое SEO**
  
		SEO — это процесс оптимизации сайта для того, чтобы он был легче найден поисковыми системами, такими как Google. Включает улучшение структуры сайта, контента, ключевых слов и других факторов, которые помогают сайтам подниматься в поисковой выдаче.
  
		
	  `,
	},
	{
	  id: 2,
	  slug: 'blog3',
	  title: {
		uz: 'Tibbiy kompaniya uchun samarali kontent-marketing strategiyasi',
		ru: 'Эффективная стратегия контент-маркетинга для медицинской компании: как привлечь пациентов',
		en: 'Effective Content Marketing Strategy for a Medical Company: How to Attract Patients',
	  },
	  description: {
		uz: 'Lorem ipsum dolor sit amet consectetur. Vel a sit id venenatis vitae...',
		ru: 'Узнайте, как разработать стратегию контент-маркетинга для медицинской компании, чтобы привлечь больше пациентов и повысить доверие к вашей клинике.',
		en: 'Learn how to develop a content marketing strategy for a medical company to attract more patients and build trust in your clinic.',
	  },
	  photo: {
		id: 2,
		url: klinikcastniy, // Placeholder URL
	  },
	  orderNum: 2,
	  text: `
		Контент — это король. Но даже у короля должны быть подданные, которые будут выполнять его приказы. В мире маркетинга контент сам по себе не работает, ему нужна стратегия. Как сделать так, чтобы ваш медицинский сайт привлекал пациентов с помощью контент-маркетинга?
	  `,
	},
	{
	  id: 3,
	  slug: 'blog4',
	  title: {
		uz: 'Tibbiy sohada video-marketingdan foydalanish: nima samarali?',
		ru: 'Как использовать видео-маркетинг в медицинской сфере для привлечения пациентов',
		en: 'How to Use Video Marketing in the Medical Field to Attract Patients',
	  },
	  description: {
		uz: 'Lorem ipsum dolor sit amet consectetur. Vel a sit id venenatis vitae...',
		ru: 'Откройте для себя лучшие практики видео-маркетинга для медицинских клиник и узнайте, какие видео действительно работают.',
		en: 'Discover the best video marketing practices for medical clinics and learn which videos truly work.',
	  },
	  photo: {
		id: 3,
		url: videoMarketing, // Placeholder URL
	  },
	  orderNum: 3,
	  text: `
		Видео — это мощный инструмент, который привлекает внимание и вызывает доверие. Если фото может сказать тысячу слов, то видео может показать вашу клинику в действии. Как видео-маркетинг работает в медицинской сфере? Давайте разберёмся!
  
		**Что такое видео-маркетинг**
  
		Видео-маркетинг — это использование видеоконтента для продвижения ваших услуг. Это могут быть интервью с врачами, обзоры процедур, истории пациентов или даже виртуальные экскурсии по клинике.
  
		**Как он работает**
  
		Видео помогает потенциальным пациентам увидеть вашу клинику и врачей вживую, что уменьшает страхи и сомнения. Качественное видео — это отличный способ показать, как проходят процедуры, познакомить с врачами и продемонстрировать оборудование клиники.
  
		**Как видео-маркетинг поможет привлечь ЦА**
  
		Видео помогает привлечь пациентов, которые предпочитают визуальное восприятие информации. Для клиник это способ показать свой профессионализм и установить контакт с пациентами до того, как они придут на приём.
  
	
	  `,
	},
	{
	  id: 4,
	  slug: 'blog5',
	  title: {
		uz: 'Tibbiy klinikalar uchun target reklama: hususiyatlar',
		ru: 'Особенности таргетированной рекламы для медицинских клиник: привлечение пациентов',
		en: 'Targeted Advertising for Medical Clinics: Key Features',
	  },
	  description: {
		uz: 'Lorem ipsum dolor sit amet consectetur. Vel a sit id venenatis vitae...',
		ru: 'Узнайте, как правильно настроить таргетированную рекламу для медицинской клиники и увеличить поток пациентов.',
		en: 'Learn how to properly set up targeted advertising for a medical clinic and increase patient flow.',
	  },
	  photo: {
		id: 4,
		url: target, // Placeholder URL
	  },
	  orderNum: 4,
	  text: `
		В современном мире мало просто создать сайт клиники — его нужно ещё и продвигать. Один из эффективных способов привлечь внимание пациентов — таргетированная реклама. Но как её правильно настроить и каких ошибок избегать?
  
		
	  `,
	},
	{
	  id: 5,
	  slug: 'blog6',
	  title: {
		uz: 'Klinikalar uchun mijozga yo\'naltirilgan marketing: yangi mijozlarni jalb qilish va xizmatni yaxshilash',
		ru: 'Пациентоориентированный маркетинг для клиник: как улучшить сервис и привлечь пациентов',
		en: 'Patient-Oriented Marketing for Clinics: How to Improve Service and Attract Patients',
	  },
	  description: {
		uz: 'Lorem ipsum dolor sit amet consectetur. Vel a sit id venenatis vitae...',
		ru: 'Как пациентоориентированный подход в маркетинге помогает улучшить сервис клиники и привлечь новых клиентов. Простые шаги для достижения успеха.',
		en: 'How a patient-oriented approach to marketing helps improve clinic service and attract new customers. Simple steps to success.',
	  },
	  photo: {
		id: 5,
		url: patient, // Placeholder URL
	  },
	  orderNum: 5,
	  text: `
		Пациенты хотят не просто лечиться — они хотят получать заботу, внимание и отличный сервис. В век цифровых технологий пациенты стали более требовательными, и задача клиник — не только предоставлять качественные медицинские услуги, но и делать это с максимальным удобством и вниманием к каждому клиенту.
  
		
	  `,
	},
	{
	  id: 6,
	  slug: 'blog7',
	  title: {
		uz: 'Tibbiyot marketingida bemorlarning fikr-mulohazalari: qanday ishlaydi?',
		ru: 'Как отзывы пациентов помогают продвигать клинику и привлекать новых клиентов',
		en: 'How Patient Reviews Help Promote Your Clinic and Attract New Clients',
	  },
	  description: {
		uz: 'Lorem ipsum dolor sit amet consectetur. Vel a sit id venenatis vitae...',
		ru: 'Узнайте, как работать с отзывами пациентов, чтобы улучшить репутацию клиники и привлечь больше клиентов.',
		en: 'Learn how to work with patient reviews to improve your clinic’s reputation and attract more clients.',
	  },
	  photo: {
		id: 6,
		url: like, // Placeholder URL
	  },
	  orderNum: 6,
	  text: `
		В современном мире, где большинство решений принимается на основе отзывов в интернете, отзывы пациентов играют ключевую роль в продвижении медицинских клиник. Потенциальные клиенты перед выбором клиники читают отзывы других пациентов, и эти отзывы могут стать решающим фактором в их решении.
  
		
	  `,
	},
	{
	  id: 7,
	  slug: 'blog8',
	  title: {
		uz: 'Klinika brendini yaratish: kontseptsiyadan reklama qilishgacha',
		ru: 'Как создать бренд клиники: шаги от концепции до успешного продвижения',
		en: 'How to Create a Clinic Brand: Steps from Concept to Successful Promotion',
	  },
	  description: {
		uz: 'Lorem ipsum dolor sit amet consectetur. Vel a sit id venenatis vitae...',
		ru: 'Узнайте, как создать и развить бренд медицинской клиники, чтобы выделиться среди конкурентов и привлечь больше пациентов.',
		en: 'Learn how to create and develop a medical clinic brand to stand out from competitors and attract more patients.',
	  },
	  photo: {
		id: 7,
		url: brand, // Placeholder URL
	  },
	  orderNum: 7,
	  text: `
		В современном мире медицинских услуг конкуренция среди частных клиник становится всё жёстче. Чтобы выделиться, клинике нужно не только предоставлять качественное лечение, но и иметь сильный и запоминающийся бренд. Бренд — это то, что пациенты вспоминают, когда думают о вашей клинике, и это не только логотип или слоган, но и то, как вы себя позиционируете на рынке.
  
	  `,
	},
	{
	  id: 9,
	  slug: 'blog10',
	  title: {
		uz: '',
		ru: 'Как работает телемедицина: преимущества и возможности онлайн-консультаций',
		en: '',
	  },
	  description: {
		uz: '',
		ru: 'Узнайте, как внедрить телемедицину в вашу клинику и какие преимущества онлайн-консультации предлагают пациентам и врачам.',
		en: '',
	  },
	  photo: {
		id: 9,
		url: tv, // Placeholder URL
	  },
	  orderNum: 9,
	  text: `
		Сегодня телемедицина становится всё более популярной. Возможность получить консультацию врача, не выходя из дома, привлекает всё больше пациентов. Это удобно, быстро и безопасно, особенно в условиях ограничений, связанных с пандемией. Но как работает телемедицина и стоит ли её внедрять в вашу клинику?
  
		
	  `,
	},
	{
	  id: 10,
	  slug: 'blog11',
	  title: {
		uz: '',
		ru: 'Как использовать CRM в медицинской клинике: улучшение работы с пациентами',
		en: '',
	  },
	  description: {
		uz: '',
		ru: 'Узнайте, как CRM-система помогает медицинским клиникам улучшить обслуживание пациентов и организовать внутренние процессы.',
		en: '',
	  },
	  photo: {
		id: 10,
		url: crm, // Placeholder URL
	  },
	  orderNum: 10,
	  text: `
		Управление медицинской клиникой — это не только приём пациентов, но и работа с документами, расписанием, напоминаниями и многим другим. Чтобы всё это было организовано эффективно, клинике нужна CRM-система. Она упрощает работу с пациентами, улучшает взаимодействие и помогает увеличить поток клиентов.
  
	
	  `,
	},
	{
	  id: 11,
	  slug: 'blog12',
	  title: {
		uz: '',
		ru: 'Как продвигать медицинское оборудование и услуги в B2B-сегменте: ключевые стратегии',
		en: '',
	  },
	  description: {
		uz: '',
		ru: 'Разбираемся, как эффективно продвигать медицинское оборудование и услуги в сегменте B2B с использованием современных маркетинговых инструментов.',
		en: '',
	  },
	  photo: {
		id: 11,
		url: equipment, // Placeholder URL
	  },
	  orderNum: 11,
	  text: `
		Продвижение медицинских услуг и оборудования для бизнеса — задача сложная, но не невозможная. В B2B-сегменте акцент делается на другие аспекты, чем в маркетинге для частных клиник. Здесь важны доверие, долгосрочные отношения и профессионализм. Но как правильно организовать маркетинг, чтобы привлечь компании и клиники к покупке ваших товаров и услуг?
  
		
	  `,
	},
  ];
  

const Blogs = () => {
  const [visibleCount, setVisibleCount] = useState(6); // Initially show 6 blogs

  // Handler for showing more blogs
  const showMoreBlogs = () => {
    setVisibleCount((prevCount) => prevCount + 6); // Show 6 more blogs when clicked
  };

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
            {item.photo && item.photo.url ? (
              <div className='slg:h-[230px] '>
                <Image
                  width={600}
                  height={600}
                  quality={100}
                  alt='blog image'
                  src={item.photo.url}
                  className='object-cover w-full h-full'
                />
              </div>
            ) : null}
            <div className='mt-[14px] flex flex-col gap-[8px] mb-[40px]'>
              <p className='w-full text-[20px] text-titleDark font-semibold mdl:text-[25px] mdl:leading-[30.48px]'>
                {item.title.ru} {/* Adjust language as needed */}
              </p>
              <p className='text-[14px] text-[#7B7B7B] leading-[24.38px] mdl:text-[18px] mdl:leading-[23px]'>
                {item.description.ru} {/* Adjust language as needed */}
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