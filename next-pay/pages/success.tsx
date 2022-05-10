import react from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'

const SuccessPage: React.FC = () =>{
    const { query } = useRouter()
    return (
        <>
        <h1>Obrigado por comprar {query.itemName}</h1>
        <Link href="/">Voltar</Link>
        </>
        
    )
}

export default SuccessPage

