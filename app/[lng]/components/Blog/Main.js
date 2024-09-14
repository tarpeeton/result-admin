
import Cases from '../Main/Cases'
import BlogTitle from './BlogTitle';
import Blogs from './Blogs';

const BlogMain = () => {
  return (
	<div className='bg-[#F8F8F8] pt-[30px] mdl:pt-[50px] 3xl:pt-[80px]'>
		<BlogTitle/>
		<Blogs/>
		<div className='pb-[60px] mdl:pb-[100px] 3xl:pb-[120px] px-[16px] mdl:px-[20px] 3xl:px-[30px]'>
		<Cases/>

		</div>
	</div>
  );
};

export default BlogMain;