import Header from './Header'
import './App.css'
import AppContent from './Auth/js/AppContent';
function App(){
    return (
        <div>
            <Header pageTitle="H-Connect" logoSrc="/Images/HManage.png" />
            <AppContent/>
        </div>
    )
}
export default App;