import axios from 'axios';
import './App.css';

//models will be the string we send from our server
const apiCall = () => {
    axios.get('http://localhost:8080/products').then((data) => {
        //this console.log will be in our frontend console
        console.log(data)
    })
}

const App = () => {
  return (
      <div className="App">
        <header className="App-header">

          <button onClick={apiCall}>Make API Call</button>

        </header>
      </div>
  );
}

export default App;