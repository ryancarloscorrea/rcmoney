import React, {FC, FormEvent, useState} from 'react';
import ReactModal from "react-modal";
import {Container, RadioBox, TransactionTypeContainer} from './styles';
import {useTransaction} from "../../hooks/useTransactions";

import closeImage from '../../assets/close.svg'
import incomeImage from '../../assets/income.svg'
import outcomeImage from '../../assets/outcome.svg'

interface NewTransactionModalProps {
    isOpen: boolean
    onRequestClose: () => void
}

export const NewTransactionModal: FC<NewTransactionModalProps> = ({isOpen, onRequestClose}) => {
    const [type, setType] = useState<'deposit' | 'withdraw'>('deposit')
    const [title, setTitle] = useState<string>('')
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState<string>('')

    const {createTransaction} = useTransaction()

    const handleCreateNewTransaction = async (event: FormEvent) => {
        event.preventDefault()
        await createTransaction({
            type,
            title,
            category,
            amount
        })

        setTitle('')
        setAmount(0)
        setCategory('')
        setType('deposit')

        onRequestClose()
    }

    return (
        <ReactModal isOpen={isOpen}
                    onRequestClose={onRequestClose}
                    overlayClassName="react-modal-overlay"
                    className="react-modal-content" >
            <button type="button"
                    onClick={onRequestClose}
                    className="react-modal-close">
                <img src={closeImage} alt="Fechar Modal"/>
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transação</h2>
                <input placeholder="Título" value={title} onChange={event => setTitle(event.target.value)}/>
                <input placeholder="Valor" type="number" value={amount} onChange={event => setAmount(Number(event.target.value))}/>
                <TransactionTypeContainer>
                    <RadioBox type="button"
                              isActive={type === 'deposit'}
                              onClick={() => setType('deposit')}
                              activeColor="green"
                    >
                        <img src={incomeImage} alt="Entrada"/>
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox type="button"
                              isActive={type === 'withdraw'}
                              onClick={() => setType('withdraw')}
                              activeColor="red"
                    >
                        <img src={outcomeImage} alt="Saída"/>
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>
                <input placeholder="Categoria" value={category} onChange={event => setCategory(event.target.value)}/>
                <button type="submit">Cadastrar</button>
            </Container>

        </ReactModal>
    );
};

