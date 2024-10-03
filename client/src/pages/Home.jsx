import Featured from "../components/Featured";
import Dashboard from "../components/MainApp/Dashboard";
import JourneyShowcase from "../components/JourneyShowcase";

//// ------ Homepage layout component ------>>
//// --------------------------------------->>
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