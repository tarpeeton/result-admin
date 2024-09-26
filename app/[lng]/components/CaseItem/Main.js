
import Banner from './Banner';
import Question from './Question';
import ServicesProvided from './ServicesProvided';
import Result from './Result';
import Images from './Images';

const CaseItemMain = ({data}) => {
	const { banner } = data;
	
  return (
	<div className='px-[16px] bg-[#F8F8F8]'>
		  <Banner data={banner} />
		<Question/>
		<ServicesProvided/>
		<Result/>
		<Images/>
	</div>
  );
};

export default CaseItemMain;