import Footer from './components/Footer';
import HeaderForm from './components/HeaderForm';
import Table from './components/Table';
import { Toaster } from 'react-hot-toast';
import { GlobalStyles } from './styles/GlobalStyles';


function App() {
  return (
    <div id='app-container'>
      <GlobalStyles />
      <HeaderForm />
      <Table />
      <Footer />
      <Toaster position="top-right"/>
    </div>
  )
}

export default App;
