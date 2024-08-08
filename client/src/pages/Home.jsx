import Featured from "../components/AppAndHomePage/Featured";
import Dashboard from "../components/AppAndHomePage/Dashboard";
import JourneyShowcase from "../components/AppAndHomePage/JourneyShowcase";

function Home() {
  return (
    <div className="homePage">
      <Dashboard />
      <JourneyShowcase />
      <Featured/>
    </div>
  ) 
}

export default Home;