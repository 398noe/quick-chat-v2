import './App.css';
import Chat from './components/Chat';
import Layout from './Layout/Layout';
import { useLocation } from "react-router-dom";
import { Box, Code, Text } from '@chakra-ui/react';

const APPURL = process.env.REACT_APP_URL;

function App() {
    const query = new URLSearchParams(useLocation().search);
    const id = query.get("id");

    const renderChat = () => {
        if (id === null) {
            return (
                <Box>
                    <Text>URL : <Code>{APPURL}/?id=*****</Code></Text>
                </Box>
            );
        } else {
            return (
                <Chat roomId={id} />
            );
        }
    }

    return (
        <Layout>
            {renderChat()}
        </Layout>
    );
}

export default App;
