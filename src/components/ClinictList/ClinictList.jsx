import React, { useState } from 'react';
import ProductItem from '../ProductItem/ProductItem';
import { useTelegram } from '../../hooks/useTelegram';
import { useCallback, useEffect } from 'react';
import { Pagination } from '../Pagination/Pagination';
import { Link, Outlet, useParams } from "react-router-dom";

import { FaPhone } from "react-icons/fa";
import { FaCalendarWeek } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { BiSolidTimeFive } from "react-icons/bi";

import jobIcon from "../../assets/images/job.png"
import doctorIcon from "../../assets/images/doctor2.png"
import serviceIcon from "../../assets/images/service.png"
import datamy from "../../db/clinic.json";





const products = [
	{ id: '1', name: 'eshmat clinck', img: "https://qtxasset.com/quartz/qcloud5/media/image/fiercehealthcare/1598464584/Mayo%20Clinic%20logo.jpg/Mayo%20Clinic%20logo.jpg?VersionId=jVFvD2Xe_AYZKxIPgig..j8eMTZ9ijsA", phone: "940850818",location:"Tashket",workingDays: "du chor ju", workingHours:"10:00-18:00" },
	{ id: '2', name: 'Shifo clinck', img: "https://qtxasset.com/quartz/qcloud5/media/image/fiercehealthcare/1598464584/Mayo%20Clinic%20logo.jpg/Mayo%20Clinic%20logo.jpg?VersionId=jVFvD2Xe_AYZKxIPgig..j8eMTZ9ijsA", phone: "940850818",location:"Tashket",workingDays: "du chor ju", workingHours:"10:00-18:00" },

];

const getTotalPrice = (items = []) => {
	return items.reduce((acc, item) => {
		return (acc += item.price);
	}, 0);
};

const ClinictList = () => {
	const [addedItems, setAddedItems] = useState([]);
	const [activePage, setActivePage] = useState(1);

	const { tg, queryId } = useTelegram();

	const onSendData = useCallback(() => {
		const data = {
			products: addedItems,
			totalPrice: getTotalPrice(addedItems),
			queryId,
		};
        console.log(data);
		fetch('http://localhost:8000/web-data', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
	}, [addedItems]);

	useEffect(() => {
		tg.onEvent('mainButtonClicked', onSendData);
		return () => {
			tg.offEvent('mainButtonClicked', onSendData);
		};
	}, [onSendData]);

	const onAdd = (product) => {
		const alreadyAdded = addedItems.find((item) => item.id === product.id);
		let newItems = [];

		if (alreadyAdded) {
			newItems = addedItems.filter((item) => item.id !== product.id);
		} else {
			newItems = [...addedItems, product];
		}

		setAddedItems(newItems);

		if (newItems.length === 0) {
			tg.MainButton.hide();
		} else {
			tg.MainButton.show();
			tg.MainButton.setParams({
				text: `Sotib olish ${getTotalPrice(newItems)}`,
			});
		}
	};

	return (
		<div className={'w-[100%]  mx-auto sm:w-[50%]  '}>





<h2 className=" text-center font-semibold my-[20px] text-[32px] ">
          Our clinics
        </h2>

        




<div className="  flex items-center  justify-center gap-[20px] py-[20px] my-[20px]  flex-wrap pb-[50px]  relative ">
{
	products?.length ? (
		products.map(el =><div className=" min-w-[45%]  min-h-[300px] border-2 border-[teal] rounded-[8px] overflow-hidden  ">
          <div className="card_top ">
            <img
              src={el?.img}
              alt="img"
              className="w-[100%] h-[230px] object-cover "
            />
          </div>
          <div className="card_body  py-[15px] px-[10px] ">
            <h2 className=" text-[32px]  font-semibold mb-3 ">{el?.name}</h2>
            <div className="flex items-center mb-3  gap-x-[15px]">
              <FaPhone className=" w-[20px] h-[20px]  " />
              <p class=" font-normal text-[22px] dark:text-gray-400">
                Tel:{el?.phone}
              </p>
            </div>
            <div className="flex items-center mb-3  gap-x-[15px]">
              <MdLocationPin className="w-[25px] h-[25px]   " />
              <p class=" font-normal text-[22px] dark:text-gray-400">
                {el?.location}
              </p>
            </div>
            <div className="flex items-center mb-3  gap-x-[15px]">
              <FaCalendarWeek className=" w-[20px] h-[20px]  " />
              <p class=" font-normal text-[22px] dark:text-gray-400">
                {el?.workingDays}
              </p>
            </div>
            <div className="flex items-center mb-3  gap-x-[15px]">
              <BiSolidTimeFive className=" w-[25px] h-[25px]  " />
              <p class=" font-normal text-[22px] dark:text-gray-400">
                {el?.workingHours}
              </p>
            </div>

		
			
			<Link to={`clinic/${el?.id}`} className="more text-center  " >
         More
        </Link>
          </div>
        </div> )
	) :" no services ☹"
	
}
<Pagination
        activePage={activePage}
        setActivePage={setActivePage}
        totalPage={5}
		
      />
</div>














			{/* {products.map((item) => (
				<ProductItem clinic={item} onAdd={onAdd} className={'item'} />
			))} */}
			<Outlet/>
			
		</div>
	);
};

export default ClinictList;
