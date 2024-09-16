import FAQAccordion from './Accordion'
import Navigation from './Navigation'
import Services from './Services'
import Title from './Title'

const ServicesMain = () => {
	return (
		<div>
			<Navigation />
			<div className='bg-[#F8F8F8]'>
				<Title />
				<Services />
				<FAQAccordion />
			</div>
		</div>
	)
}

export default ServicesMain
