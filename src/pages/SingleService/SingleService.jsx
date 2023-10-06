import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Pagination } from '../../components/Pagination/Pagination';
import { FaPhone } from 'react-icons/fa';
import { FaCalendarWeek } from 'react-icons/fa';
import { MdLocationPin } from 'react-icons/md';
import { BiSolidTimeFive } from 'react-icons/bi';
import { useTelegram } from '../../hooks/useTelegram';


import jobIcon from '../../assets/images/job.png';
import doctorIcon from '../../assets/images/doctor2.png';
import serviceIcon from '../../assets/images/service.png';

import datamy from '../../db/clinic.json';




const SingleService = () => {
	const [activePage, setActivePage] = useState(1);
  const [data, setData] = useState([]);

   const {service_id ,clinic_id} =   useParams()


   	// let api = `https://rickandmortyapi.com/api/character/?page=${activePage}&name=${search}&status=${status}`;
	const { info, results } = data;
	useEffect(() => {
		(async () => {
			// const data2 = await fetch(api).then((res) => res.json());
			setData(datamy);
		})();
		// }, [api]);
	}, []);

	const { tg, queryId } = useTelegram();

	// const clinic = data.find((el) => el.id == clinic_id);
	const doctors = data?.clinicDoctors;
	const services = data?.clinicServices;
	console.log(data);
  console.log(service_id);





  // send for data bot started

  const [addedItems, setAddedItems] = useState([]);


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
    <>









					<h2 className=' text-center font-semibold my-[20px] text-[32px] '>
						Biznig hizmatlarni tanlang va joy band qiling
					</h2>

						{services?.length
							? services.map((el) => (
									<div className='max-w-sm  min-w-[100%]  border-[1px] border-[teal] rounded-[8px] shadow '>
										<a href='#'>
											<img
												className='rounded-t-lg w-[100%] h-[150px] object-fill  '
												src='https://picsum.photos/id/117/200/300'
												alt='img'
											/>
										</a>
										<div className='p-5'>
												<h5 className='mb-2 text-2xl font-bold tracking-tight  '>
													{el?.name}
												</h5>

                        <h5 className='mb-2 text-xl font-bold tracking-tight  '>
												 bor doctorlar soni:	{services?.length}
												</h5>
											<p className='mb-3 font-normal text-[20px] text-gray-300'>
												Price: {el?.cost} $
											</p>
											
										</div>
									</div>
							  ))
							: ' no services ☹'}
					







				{/* clinic doctors */}
				<h2 className=' text-center font-semibold my-[20px] text-[32px] '>
					Clinic Doctors
				</h2>

				<div className='  flex items-center gap-[20px] py-[20px] my-[20px]  flex-wrap pb-[50px]  relative '>
					{doctors?.length
						? doctors.map((el) => (
								<div className='card  h-auto min-h-[300px] w-[100%] border-2 border-[teal] rounded-[8px] overflow-hidden  '>
									<div className='card_top '>
										<img
											src={el?.img}
											alt='img'
											className='w-[100%] h-[230px] object-cover '
										/>
									</div>
									<div className='card_body  py-[15px] px-[10px] '>
										<h2 className=' text-[22px]  font-semibold mb-3 '>
											
											{el?.fullName}
										</h2>
										<div className='flex items-center mb-3  gap-x-[15px]'>
											<FaPhone className=' w-[20px] h-[20px]  ' />
											<p class=' font-normal text-[16px] dark:text-gray-400'>
												{el?.phone}
											</p>
										</div>
										<div className='flex items-center mb-3  gap-x-[15px]'>
											<MdLocationPin className='w-[25px] h-[25px]   ' />
											<p class=' font-normal text-[22px] dark:text-gray-400'>
												{el?.location}
											</p>
										</div>
										<div className='flex items-center mb-3  gap-x-[15px]'>
											<FaCalendarWeek className=' w-[20px] h-[20px]  ' />
											<p class=' font-normal text-[16px] dark:text-gray-400'>
												{el?.workingDays} , {el?.workingHours}
											</p>
										</div>

										<div className='flex items-center mb-3  gap-x-[15px]'>
											<img
												src={jobIcon}
												alt='doctor'
												className=' w-[22px] h-[22px]  img_filter'
											/>

											<p class=' font-normal text-[22px] dark:text-gray-400'>
												{el?.doctorSkills}
											</p>
										</div>

                    <button className=' w-[100%] py-[15px] bg-[teal] text-[20px]  rounded-[8px] ' > Reservation </button>
									</div>
								</div>
						  ))
						: ' docrorlar yoq ☹'}
					<Pagination
						activePage={activePage}
						setActivePage={setActivePage}
						totalPage={5}
					/>
				</div>



    </>
  )
}

export default SingleService
