import Main from "@/app/[lng]/components/About/Main";
import { getAllMembers } from '../lib/api/get.api';



export default async function Home({ params }) {
  const {lng} = params
  const members = await getAllMembers(lng);
  return (
    <div>
      {/* Pass the fetched data (members) and lng to the Main component */}
      <Main members={members}  />
    </div>
  );
}
