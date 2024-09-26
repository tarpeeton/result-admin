import Main from "@/app/[lng]/components/CaseItem/Main";
import { getSingleCase } from '../../lib/api/get.api';

export default async function Cases({ params }) {
  const { lng, id } = params; // Destructure lng and id from params

  // Fetch the single case data using the id from params
  let mapData = [];
  try {
    mapData = await getSingleCase(id, lng); // Pass id and lng to the API call
  } catch (error) {
    console.error("Error fetching case data:", error);
  }

  return (
    <div>
      <Main data={mapData} /> {/* Pass the fetched data to the Main component */}
    </div>
  );
}
