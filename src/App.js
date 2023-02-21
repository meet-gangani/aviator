import './App.css';

function App() {
  return (
    <div className="App">
      <div className="sidebar">hello</div>
      <div className="main-container">
        <div className="image-container">
          <img className="bg" src={require('./assets/img/background.svg').default} alt=""/>
        </div>
      </div>
    </div>
  );
}

export default App;
