import { GetStaticPaths, GetStaticProps } from 'next'
import stripeConfig from '../config/stripe'
import Stripe from 'stripe';
import Link from "next/link";


interface Props {
  skus:Stripe.Product 
}



export const getStaticProps: GetStaticProps = async () => {

  const stripe = new Stripe(stripeConfig.secretKey, {
      apiVersion:'2020-08-27',
  })

  const producst = await stripe.products.list()

  
  return {
      props:{
        skus: producst.data
      }
      
  }
}

const  HomePage: React.FC<Props> = ({skus}) => {
  return (
    <>
      <h1>Simple Stripe Store</h1>
      {skus.map(sku =>(
        <div key={sku.id}>
 
            {sku.images && <img src={sku.images}/>}
            <h1>{sku.name}</h1>
            <h2>{sku.attributes}</h2>
            <Link href={"/"+ sku.id}>Visit page</Link>
            
          <hr/>
        </div>
      ))}
    </>
  )
}

export default HomePage