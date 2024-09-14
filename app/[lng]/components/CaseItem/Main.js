
import Banner from './Banner';
import Question from './Question';
import ServicesProvided from './ServicesProvided';
import Result from './Result';
import Images from './Images';

const CaseItemMain = () => {

	const exampleData = {
		"message": "string",
		"data": {
		  "id": 0,
		  "banner": {
			"id": 0,
			"title": {
			  "uz": "INTERMED INNOVATION",
			  "ru": "INTERMED INNOVATION",
			  "en": "INTERMED INNOVATION"
			},
			"link": "https://intermed-innovation.com",
			"shortDescription": {
			  "uz": "«INTERMED INNOVATION» надежный поставщик медицинского оборудования от ведущих производителей",
			  "ru": "«INTERMED INNOVATION» надежный поставщик медицинского оборудования от ведущих производителей",
			  "en": "«INTERMED INNOVATION» надежный поставщик медицинского оборудования от ведущих производителей"
			},
			"background": {
			  "id": 1,
			  "url": "https://ucarecdn.com/e74e2b4a-231d-415c-9ed6-5f89d90f3da6/-/preview/800x600/"
			},
			"photo": {
			  "id": 2,
			  "url": "https://ucarecdn.com/10ee97fe-71fc-4ffe-a907-f4bb3377abed/-/preview/500x500/"
			},
			"logo": {
			  "id": 3,
			  "url": "https://ucarecdn.com/67fd2b7e-e746-47a8-9f1a-91b8e135119e/-/preview/200x100/"
			}
		  },
		  "query": ["string"],
		  "providedService": [
			{
			  "id": 0,
			  "name": {
				"uz": "Услуга на узбекском",
				"ru": "Услуга на русском",
				"en": "Service in English"
			  },
			  "description": {
				"uz": "Описание услуги на узбекском",
				"ru": "Описание услуги на русском",
				"en": "Service description in English"
			  },
			  "orderNum": 0,
			  "active": true
			}
		  ]
		}
	  };
  return (
	<div className='px-[16px] bg-[#F8F8F8]'>
		  <Banner data={exampleData.data} />
		<Question/>
		<ServicesProvided/>
		<Result/>
		<Images/>
	</div>
  );
};

export default CaseItemMain;