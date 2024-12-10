import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross-icon.png'


const ListProduct = () => {
    const [allproducts, setAllProducts] = useState([]);

    const fetchInfo = async () => {
        await fetch('http://localhost:8080/allproduct')
        .then((res)=>res.json())
        .then((data)=>{setAllProducts(data.data)
            console.log(allproducts);
        });
        
    }

    useEffect(()=>{
        fetchInfo();
    },[]);

    const remove_product = async (id)=>{
        await fetch('http://localhost:8080/removeproduct',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({id:id})
        })
        await fetchInfo();
    }


    return (
        <div className='list-product'>
            <h1>List sản phẩm</h1>
            <div className="listproduct-format-main">
                <p>Sản phẩm</p>
                <p>Tên</p>
                <p>Giá Ưu Đãi</p>
                <p>Giá</p>
                <p>Loại Sản Phẩm</p>
                <p>Xoá</p>
            </div>
            <div className="product-allproducts">
                <hr />
                {allproducts.map((product,index)=>{
                    return <> 
                        <div key={index} className="listproduct-format-main listproduct-format">
                        <img src={product.image} alt="" className="listproduct-product-icon" />
                        <p>{product.name}</p>
                        <p>{product.old_price}VNĐ</p>
                        <p>{product.new_price}VNĐ</p>
                        <p>{product.category}</p>
                        <img onClick={()=>{remove_product(product.id)}} className='listproduct-remove-icon' src={cross_icon} alt="" />
                        </div>
                    </>
                })}
            </div>
        </div>
    )
}

export default ListProduct