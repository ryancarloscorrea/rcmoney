import {GlobalStyle} from "./styles/global";
import {Header} from "./Components/Header";
import {Dashboard} from "./Components/Dashboard";
import ReactModal from "react-modal";
import {useState} from "react";
import {NewTransactionModal} from "./Components/NewTransactionModal";
import {TransactionsProvider} from "./hooks/useTransactions";

export const App = () => {

    ReactModal.setAppElement('#root')

    const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState<boolean>(false)

    const handleOpenNewTransactionModal = () => {
        setIsNewTransactionModalOpen(true)
    }

    const handleCloseNewTransactionModal = () => {
        setIsNewTransactionModalOpen(false)
    }

  return (
    <TransactionsProvider>
        <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
        <Dashboard/>
        <GlobalStyle/>
        <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransactionModal}/>
    </TransactionsProvider>
  );
}

