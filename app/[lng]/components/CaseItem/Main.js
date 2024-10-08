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
			<Banner data={banner} ID={data.id} />
			<Question queryData={query} description={queryDescription} ID={data.id} />
			<ServicesProvided result={providedService} ID={data.id} />
			<Result
				resultDescription={resultDescription}
				obtainedResult={obtainedResult}
				resultSiteLink={resultSiteLink}
				resultInstagramLink={resultInstagramLink}
				resultTelegramLink={resultTelegramLink}
				ID={data.id}
			/>
			<Images slider={slider} ID={data.id}  />
		</div>
	)
}

export default CaseItemMain
