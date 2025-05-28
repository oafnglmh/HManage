import Header from './Header'
import './App.css'
import AppContent from './AppContent';
function App(){
    return (
        <div>
            <Header pageTitle="H-Connect" logoSrc="https://res-console.cloudinary.com/dzvxim3zn/media_explorer_thumbnails/1e97c894c2980e6fc90b7ef03e8ac275/detailed" />
            <AppContent/>
        </div>
    )
}
export default App;