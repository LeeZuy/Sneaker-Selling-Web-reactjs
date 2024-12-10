import React, { useContext } from 'react';
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/remove_icon.jpg';


const CartItems = () => {
    const {getTotalCartAmount,all_product,cartItems,removeFromCart} = useContext(ShopContext);
  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Sản phẩm</p>
            <p>Tên sản phẩm</p>
            <p>Giá</p>
            <p>Số lượng</p>
            <p>Tổng tiền</p>
            <p>Xoá</p>
        </div>
        <hr />
        
            {all_product.map((e)=>{
                if(cartItems[e.id]>0)
                {
                    return (
                        <div>
                            <div className="cartitems-format cartitems-format-main">
                                <img src={e.image} alt="" className='carticon-product-icon' />
                                <p>{e.name}</p>
                                <p>{e.new_price}VNĐ</p>
                                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                <p>{e.new_price*cartItems[e.id]}VNĐ</p>
                                <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
                            </div>
                            <hr />
                        </div>
                        )
                }
                return null;
            })}

            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Thanh toán</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Tổng tiền hàng</p>
                            <p>{getTotalCartAmount()}VNĐ</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Phí ship</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Tổng thanh toán</h3>
                            <h3>{getTotalCartAmount()}VNĐ</h3>
                        </div>
                    </div>
                    <button className='submit'>Đặt hàng</button>
                </div>
            </div>
        
    </div>
  )
}

export default CartItems