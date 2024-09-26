import Banner from './Banner'
import Question from './Question'
import ServicesProvided from './ServicesProvided'
import Result from './Result'
import Images from './Images'

const CaseItemMain = ({ data }) => {
	const {
		banner,
		providedService,
		query,
		slider,
		obtainedResult,
		queryDescription,
		resultDescription,
		resultSiteLink,
		resultInstagramLink,
		resultTelegramLink,
	} = data
	return (
		<div className='px-[16px] bg-[#F8F8F8]'>
			<Banner data={banner}   ID={data.id}/> 
		 <Question queryData={query} description={queryDescription} />
			<ServicesProvided result={providedService} />
			<Result
				resultDescription={resultDescription}
				obtainedResult={obtainedResult}
				resultSiteLink={resultSiteLink}
				resultInstagramLink={resultInstagramLink}
				resultTelegramLink={resultTelegramLink}
			/>
			<Images  slider={slider}/>
		</div>
	)
}

export default CaseItemMain
