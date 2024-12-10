import React, { useEffect, useState  } from 'react';
import './Popular.css';
// import { data } from '../Assets/data';
import Items from '../Item/Items';

const Popular = () => {

  const [popularProduct, setPopularProduct] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:8080/hotitems')
    .then((response)=>response.json())
    .then((data)=>setPopularProduct(data));
  },[])


  return (
    <div className='popular'>
        <h1>Hot Items</h1>
        <hr />
        <div className="popular-item">
            {popularProduct.map((item,i) =>{
                return <Items key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })}
        </div>
    </div>
  )
}

export default Popular