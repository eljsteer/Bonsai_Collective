import Featured from "../components/Featured";
import Dashboard from "../components/Dashboard";
import JourneyShowcase from "../components/JourneyShowcase";

// import "../styles/Header.css"

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