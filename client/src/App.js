import './App.css';
import AppRouter from "./router/AppRouter";
import Login from "./pages/Login";

const App = () => {
  return (
      <div className="App">
        <header className="App-header">
             <AppRouter />

        </header>
      </div>
  );
}

export default App;