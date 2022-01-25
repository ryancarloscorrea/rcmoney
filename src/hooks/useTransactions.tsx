import {createContext, FC, useContext, useEffect, useState} from 'react'
import {api} from "../services/api";

type TransctionInput = Omit<Transaction, 'id' | 'createdAt'>


interface TransactionsContactData {
    transactions: Transaction[];
    createTransaction: (transaction: TransctionInput) => Promise<void>}

export const TransactionsContext = createContext<TransactionsContactData>({} as TransactionsContactData)

interface Transaction {
    id: number
    title: string
    amount: number
    type: string
    category: string
    createdAt: string
}


export const TransactionsProvider:FC = ({children}) => {

    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions))
    }, [])

    const createTransaction = async (transactionsInput: TransctionInput) => {
        const response = await api.post('/transactions', {...transactionsInput, createdAt: new Date()})
        const {transaction} = response.data
        setTransactions([...transactions, transaction])
    }

    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}

export const useTransaction = () => {
    return  useContext(TransactionsContext)
}