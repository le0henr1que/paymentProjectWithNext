import React from "react";
import Stripe from 'stripe';
import { GetStaticPaths, GetStaticProps } from 'next'

import stripeConfig from '../config/stripe'
import Link from "next/link";

interface Props {
    sku: Stripe.Product
}

export const getStaticPaths: GetStaticPaths = async () => {

    const stripe = new Stripe(stripeConfig.secretKey, {
        apiVersion:'2020-08-27',
    })

    const producst = await stripe.products.list()

    // console.log(producst)

    const paths = producst.data.map(sku =>({
        params:{
            skuId: sku.id,
        }
    }))

    console.log(paths)

    return {
        paths,
        fallback: false,
        
    }
}
export const getStaticProps: GetStaticProps = async ({params}) => {

    
    const stripe = new Stripe(stripeConfig.secretKey, {
        apiVersion:'2020-08-27',
    })

    const { skuId } = params

    const sku = await stripe.products.retrieve(skuId as string);


    console.log(sku)

    return {
        props:{
            sku
        }
    };
};

const Product: React.FC<Props> = ({sku}) => {
    return (
        <div>
            {sku.images && <img src={sku.images}/>}
            <h1>{sku.name}</h1>
            <h2>{sku.attributes}</h2>
            <Link href="/">Go Back</Link>
        </div>
        )
}


export default Product