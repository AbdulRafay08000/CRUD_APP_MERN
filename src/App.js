
import './App.css';
import axios from 'axios'
import CreateUser from './components/CreateUser';
import DisplayUser from './components/DisplayUser';

function App() {


  
  return (
<div className="container mx-auto">
<h1 className="text-center text-4xl font-bold mt-10">CRUD Application</h1>
   <CreateUser/>
  <DisplayUser/>
    </div>
  );
}

export default App;
