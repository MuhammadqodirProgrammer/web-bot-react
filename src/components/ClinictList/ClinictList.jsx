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
import apiRoot, { baseUrlImg } from '../../api/api';



const ClinictList = () => {
	const [activePage, setActivePage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const [clinics, setClinics] = useState([]);


	
	async function GetClinics() {
		const data = await apiRoot.get(`/clinic/skip=${activePage}/limit=${4}`)

		if(data.status ==200){
			console.log(data?.data);
			setClinics(data?.data?.data)
			setTotalPage(data?.data?.total_page)
		}
	}

	useEffect(() => {
		GetClinics()
	}, [activePage]);


	return (
		<div className={'  '}>





<h2 className=" text-center font-semibold my-[20px] text-[32px] ">
          Our clinics
        </h2>

        




<div className="  flex items-center  justify-center gap-[20px] py-[20px] my-[20px]  flex-wrap mb-[0px]  relative ">
{
	clinics?.length ? (
		clinics.map(el =><div className=" min-w-[95%]  min-h-[300px] border-2 border-[teal] rounded-[8px] overflow-hidden  ">
          <div className="card_top ">
            <img
              src={`${baseUrlImg}/${el?.img}`}
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

		
			
			<Link to={`clinic/${el?._id}`} className="more text-center  " >
         More
        </Link>
          </div>
        </div> )
	) :<h2 className=" text-center  w-[100%] font-semibold my-[20px] text-[24px] ">
	no clinics ☹ 
        </h2> 
	
}
<Pagination
        activePage={activePage}
        setActivePage={setActivePage}
        totalPage={totalPage}
		
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
