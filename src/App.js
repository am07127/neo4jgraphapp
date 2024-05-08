import logo from './logo.svg';
import './App.css';
import PresidentialVotes from './components/president';
import Navbar from './components/navbar';
import CandidateSeats from './components/seats';
import CandidatePredictions from './components/prediction';
import CandidateInfluence from './components/centrality';
import { Routes, Route } from 'react-router-dom';
import Statistics from './components/statistics';
import Weakly from './components/weakly';

function App() {
  return (
    <div className="App">
     <Navbar /> 
      <Routes>
        <Route exact path="/" element={<PresidentialVotes />} />
        <Route path="/seats" element={<CandidateSeats />} />
        <Route path="/predictions" element={<CandidatePredictions />} />
        <Route path="/betweenness" element={<CandidateInfluence />} />
        <Route path="/statistics" element= {<Statistics/>}/>
        <Route path="/weakly" element= {<Weakly/>}/>
      </Routes>
    </div>
  );
}

export default App;
