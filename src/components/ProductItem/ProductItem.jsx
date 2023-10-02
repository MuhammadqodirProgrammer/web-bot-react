import React from 'react';
import { Link } from 'react-router-dom';
import Button from "../Button/Button";
import './ProductItem.css';

const ProductItem = ({clinic, className, onAdd}) => {

    const onAddHandler = () => {
        onAdd(clinic);
    }

    return (
        <div className={'clinic ' + className}>
          <img src={clinic?.img} alt="" className='img_clinic' />

            <div className={' '}>{clinic?.name}</div>
            <div className={'description'}>Tel: {clinic?.phone}</div>
            <p >Joylashuv {clinic?.location}</p>
            <p >Ish kuni  {clinic?.workingDays}</p>
            <p >Ish vaqti  {clinic?.workingHours}</p>
            <div className="flexer">
         <Link to={`clinic/${clinic?.id}`} className="more  " >
         More
        </Link>
            </div>
        </div>
    );
};

export default ProductItem;
