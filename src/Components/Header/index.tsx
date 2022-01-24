import logo from '../../assets/logo.svg'
import {Container, Content} from "./styles";
import {FC} from "react";

interface HeaderProps {
    onOpenNewTransactionModal: () => void
}
export const Header:FC<HeaderProps> = ({onOpenNewTransactionModal}) => {

    return (
        <Container>
            <Content>
                <img src={logo} alt="rc money"/>
                <button type="button" onClick={onOpenNewTransactionModal}>
                    Nova transação
                </button>
            </Content>
        </Container>
    );
};

