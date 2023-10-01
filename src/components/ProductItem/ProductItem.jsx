import React from 'react';
import Button from "../Button/Button";
import './ProductItem.css';

const ProductItem = ({clinic, className, onAdd}) => {

    const onAddHandler = () => {
        onAdd(clinic);
    }

    return (
        <div className={'product ' + className}>
          <img src={clinic?.img} alt="" className='img_clinic' />

            <div className={' '}>{clinic?.name}</div>
            <div className={'description'}>{clinic?.phone}</div>
            <p >Joylashuv {clinic?.location}</p>
            <p >ish kuni  {clinic?.workingDays}</p>
            <p >ish vaqti  {clinic?.workingHours}</p>
            <Button className={'add-btn'} onClick={onAddHandler}>
                Karzinkaga q'oshish
            </Button>
        </div>
    );
};

export default ProductItem;
