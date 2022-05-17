import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";

interface props {
    title: string;
    description: string;
}
export const AlertMessage: React.FC<props> = (props) => {
    return (
        <Alert status="error">
            <AlertIcon />
            <AlertTitle>{props.title}
            </AlertTitle>
            <AlertDescription>{props.description}</AlertDescription>
        </Alert>
    );
}

export default AlertMessage;