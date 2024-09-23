import Main from "@/app/[lng]/components/About/Main";



export default async function Home() {
  return (
    <div>
      {/* Pass the fetched data (members) and lng to the Main component */}
      <Main  />
    </div>
  );
}
