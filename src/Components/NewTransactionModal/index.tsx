import React, {FC, FormEvent, useState} from 'react';
import ReactModal from "react-modal";
import {Container, RadioBox, TransactionTypeContainer} from './styles';
import closeImage from '../../assets/close.svg'
import incomeImage from '../../assets/income.svg'
import outcomeImage from '../../assets/outcome.svg'
import {api} from "../../services/api";


interface NewTransactionModalProps {
    isOpen: boolean
    onRequestClose: () => void
}

export const NewTransactionModal: FC<NewTransactionModalProps> = ({isOpen, onRequestClose}) => {
    const [type, setType] = useState<'deposit' | 'withdraw'>('deposit')
    const [title, setTitle] = useState<string>('')
    const [value, setValue] = useState(0)
    const [category, setCategory] = useState<string>('')

    const handleCreateNewTransaction = (event: FormEvent) => {
        event.preventDefault()
        const data = {
            type,
            title,
            value,
            category
        }

        api.post('/transactions', data)
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
                <input placeholder="Valor" type="number" value={value} onChange={event => setValue(Number(event.target.value))}/>
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

