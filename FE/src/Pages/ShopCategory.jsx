import  { React,useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item/Items'
// import { all_product } from '../Components/Assets/all_product';

const ShopCategory = (props) => {

    const {all_product} = useContext(ShopContext);

  return (
    
    <div className='shop-category'>
        <img className='shopcategory-banner' src={props.banner} alt="" />
        <div className="shopcategory-indexSort">
          <p>
            <span>Hiển thị 1 -12</span> trong tổng số 12 sản phẩm
          </p>
          <div className="shopcategory-sort">
            Sắp xếp theo
          </div>
        </div>
        <div className="shopcategory-products">
          {all_product.map((item,i)=>{
            if (props.category===item.category) {
              return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            }
            else{
              return null;
            }
          })}
        </div>
        <div className="shopcategory-loadmore">
          Tìm hiểu thêm
        </div>
    </div>
  )
}

export default ShopCategory