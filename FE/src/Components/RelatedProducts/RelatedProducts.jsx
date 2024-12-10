import React from 'react';
import './RelatedProducts.css'
import Items from '../Item/Items';
import { data } from '../Assets/data';

const RelatedProducts = () => {
  return (
    <div className='relatedproducts'>
        <h1>Sản phẩm liên quan</h1>
        <hr />
        <div className="relatedproducts-item">
            {data.map((item,i)=>{
                return <Items key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })}
        </div>
    </div>
  )
}

export default RelatedProducts