import React, { useContext } from 'react';
import './ProductDisplay.css';
import { ShopContext } from '../../Context/ShopContext';


const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);
  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-img-list">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>
            <div className="productdisplay-img">
                <img className='productdisplay-main-img' src={product.image} alt="" />
            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-price-old">{product.old_price}VNĐ</div>
                <div className="productdisplay-right-price-new">{product.new_price}VNĐ</div>
            </div>
            <div className="productdisplay-right-size">
                <h1>Size:</h1>
                <div className="productdisplay-right-sizes">
                    <div>39</div>
                    <div>40</div>
                    <div>41</div>
                    <div>42</div>
                    <div>43</div>
                </div>
            </div>
            <button onClick={()=>{addToCart(product.id)}}>THÊM VÀO GIỎ</button>
        </div>
    </div>
  )
}

export default ProductDisplay