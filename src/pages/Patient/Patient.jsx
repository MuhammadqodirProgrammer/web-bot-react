import React, { useState } from 'react';
import { useCallback, useEffect } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';

import { FaPhone } from 'react-icons/fa';
import { FaCalendarWeek } from 'react-icons/fa';
import { MdLocationPin } from 'react-icons/md';
import { BiSolidTimeFive } from 'react-icons/bi';

import apiRoot, { baseUrlImg } from '../../api/api';
import { Pagination } from '../../components/Pagination/Pagination';

import clinicImg from '../../assets/images/clinic.png';
import clinicImg2 from '../../assets/images/clinic2.png';
import userImg from '../../assets/images/user.png';

const Patient = () => {
	const [activePage, setActivePage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const [clinics, setClinics] = useState([]);
	const [patient, setPatient] = useState({});

	const { patient_id } = useParams();

	console.log(patient_id, 'patient');
	async function GetClinics() {
		const data = await apiRoot.get(`/clinic/skip=${activePage}/limit=${4}`);

		if (data.status == 200) {
			console.log(data?.data);
			setClinics(data?.data?.data);
			setTotalPage(data?.data?.total_page);
		}
	}

	async function GetPatient() {
		const data = await apiRoot.get(`/patient/${patient_id}`);
		if (data.status == 200) {
			console.log(data?.data?.data);
			setPatient(data?.data?.data);
			// setClinics(data?.data?.data)
			// setTotalPage(data?.data?.total_page)
		}
	}

	useEffect(() => {
		GetPatient();
	}, []);

	useEffect(() => {
		GetClinics();
	}, [activePage]);

	return (
		<div className={'  '}>
			<h2 className=' text-center font-semibold my-[20px] text-[26px] '>
				Your information
			</h2>

			<div className=' min-w-[95%]  min-h-[300px] border-2 border-[teal] rounded-[8px] overflow-hidden  '>
				<div className='card_top '>
					<img
						src={userImg}
						alt='img'
						className='w-[100%] h-[230px] object-contain mt-2 '
					/>
				</div>
				<div className='card_body  py-[15px] px-[10px] '>
					<h2 className=' text-[28px]  font-semibold mb-3 '>
						{patient?.fullName}
					</h2>
					<div className='flex items-center mb-3  gap-x-[15px]'>
						<FaPhone className=' w-[20px] h-[20px]  ' />
						<p class=' font-normal text-[22px] dark:text-gray-400'>
							Tel:{patient?.phone}
						</p>
					</div>

					<div className='flex items-center mb-3  gap-x-[15px]'>
						<FaCalendarWeek className=' w-[20px] h-[20px]  ' />
						<p class=' font-normal text-[22px] dark:text-gray-400'>
							{patient?.email}
						</p>
					</div>
				</div>
			</div>

			<h2 className=' text-center font-semibold my-[20px] text-[22px] '>
				Our clinics , enter the clinic, choose a service and book a place
			</h2>

			<div className='  flex items-center  justify-center gap-[20px] py-[20px] my-[20px]  flex-wrap mb-[0px]  relative '>
				{clinics?.length ? (
					clinics.map((el) => (
						<div className=' min-w-[95%]  min-h-[300px] border-2 border-[teal] rounded-[8px] overflow-hidden  '>
							<div className='card_top '>
								<img
									src={clinicImg2}
									alt='img'
									className='w-[100%] h-[230px] object-contain  mt-2'
								/>
							</div>
							<div className='card_body  py-[15px] px-[10px] '>
								<h2 className=' text-[32px]  font-semibold mb-3 '>
									{el?.name}
								</h2>
								<div className='flex items-center mb-3  gap-x-[15px]'>
									<FaPhone className=' w-[20px] h-[20px]  ' />
									<p class=' font-normal text-[22px] dark:text-gray-400'>
										Tel:{el?.phone}
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
									<p class=' font-normal text-[22px] dark:text-gray-400'>
										{el?.workingDays}
									</p>
								</div>
								<div className='flex items-center mb-3  gap-x-[15px]'>
									<BiSolidTimeFive className=' w-[25px] h-[25px]  ' />
									<p class=' font-normal text-[22px] dark:text-gray-400'>
										{el?.workingHours}
									</p>
								</div>

								<Link
									to={`clinic/${el?._id}`}
									className=' items-center w-[100%] block text-[20px]   py-2  font-medium text-center  text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  mx-auto '
								>
									More
								</Link>
							</div>
						</div>
					))
				) : (
					<div
						className='inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-neutral-100 motion-reduce:animate-[spin_1.5s_linear_infinite]'
						role='status'
					>
						<span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
							Loading...
						</span>
					</div>
				)}

				<Pagination
					activePage={activePage}
					setActivePage={setActivePage}
					totalPage={totalPage}
				/>
			</div>

			{/* {products.map((item) => (
				<ProductItem clinic={item} onAdd={onAdd} className={'item'} />
			))} */}
			<Outlet />
		</div>
	);
};

export default Patient;
