import Info from './Info'
import MissinResult from './Mission'
import Team from './Team';
import Partners from '../Main/Partners';
import Job from './Job'
import Contact from './Contact'

const MainAbout = () => {
  return (
	<div className='bg-[#F8F8F8]'>
		<Info/>
		<MissinResult/>
		<Team/>
		<Partners/>
		<Job/>
		<Contact/>
	</div>
  );
};

export default MainAbout;