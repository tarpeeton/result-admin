import ServiceItem from "@/app/[lng]/components/Services/Item";
import ItemInfo from "@/app/[lng]/components/Services/ItemInfo";
import InfoCard from "@/app/[lng]/components/Services/InfoCard";
import CostCard from "@/app/[lng]/components/Services/CostCard";
import Case from "@/app/[lng]/components/Main/Cases";
import Blog from "@/app/[lng]/components/Main/Blog";

const Service = () => {
  return (
	<div className='bg-[#F8F8F8] relative'>
		<div className='pt-[20px] mdl:pt-[30px]'>
		<ServiceItem/>
		<ItemInfo/>
		<InfoCard/>
		<CostCard/>
		<div className='px-[24px]'>
		<Case/>
		</div>
		<Blog/>
		</div>
	</div>
  );
};

export default Service;

