import React from "react";
import Header from './components/Header';
import Footer from './components/Footer'
import InfoComponent from './components/InfoComponent';
import SearchPage from './components/search/SearchPage'


function App() {
  
  return (
    <div className="App">
      <Header/>
      <SearchPage/>
      <InfoComponent/>
      <Footer/>
    </div>
  );
}

export default App;
