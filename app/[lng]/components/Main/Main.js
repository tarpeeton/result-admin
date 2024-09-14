import Banner from './Banner'
import Result from './Results'
import Services from './Services'
import Cases from './Cases'
import ProsesWork from './ProsesWork'
import Blog from './Blog'
import Partners from './Partners'
import Puzzle from './Puzzle'
import Reviews from './Reviews'
import AboutUs from './AboutUs'
import Soon from './Soon'

const Main = () => {
	return (
		<div>
			<Banner />

			<div className='flex flex-col w-full px-[16px] mdl:px-[20px] 2xl:px-[30px]'>
				<Result />
				<Services/>
				<Puzzle/>
				<Cases/>
				<ProsesWork/>
				<Reviews />
				<Partners />
				<AboutUs/>
				<Soon/>
				<Blog/>
			</div>
		</div>
	)
}

export default Main
