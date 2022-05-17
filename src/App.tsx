import './App.css';
import Chat from './components/Chat';
import Layout from './Layout/Layout';

function App() {
    return (
        <Layout>
            <Chat roomId={"test"}/>
        </Layout>
    );
}

export default App;
