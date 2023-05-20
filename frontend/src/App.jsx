import Footer from './components/Footer/Footer';
import HeaderForm from './components/HeaderForm/HeaderForm';
import Table from './components/Table/Table';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <div className='main-app'>
    <HeaderForm />
    <Table />
    <Footer />
    <Toaster position="top-right"/>
    </div>
  )
}

export default App;
