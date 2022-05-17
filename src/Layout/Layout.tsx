import { Container } from "@chakra-ui/react";
import Footer from "../components/Footer";
import Header from "../components/Header";
interface props {
    children: React.ReactNode;
}

export const Layout: React.FC<props> = ({ children }) => {
    return (
        <>
            <Header />
            <Container
                w={"full"}
                pt={20}
                minH={"92.48vh"}
            >
                {children}
            </Container>
            <Footer />
        </>
    );
}

export default Layout;