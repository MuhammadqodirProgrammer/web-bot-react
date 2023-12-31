import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination as pg, Scrollbar, A11y } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useTelegram } from '../../hooks/useTelegram';
import { useCallback, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import './SingleClinic.scss';

import { useHistory } from 'react-router-dom';

import clinicImg from '../../assets/images/clinic2.png';
import serviseImg from '../../assets/images/service1.png';
import DoctorImg from '../../assets/images/docrorImg.png';

// images and icons
import { FaPhone } from 'react-icons/fa';
import { FaCalendarWeek } from 'react-icons/fa';
import { MdLocationPin } from 'react-icons/md';
import { BiSolidTimeFive } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import jobIcon from '../../assets/images/job.png';
import doctorIcon from '../../assets/images/doctor2.png';
import serviceIcon from '../../assets/images/service.png';
import { Pagination } from '../../components/Pagination/Pagination';
import apiRoot, { baseUrlImg } from '../../api/api';

const SingleClinic = () => {
	const [search, setSearch] = useState('');
	const [data, setData] = useState([]);
	const [activePage, setActivePage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const [clinic, setClinic] = useState([]);
	const [clinicDoctors, setClinicDoctors] = useState([]);
	const [clinicServices, setClinicServices] = useState([]);
	const { clinic_id, patient_id } = useParams();
	const limit = 5;

	console.log(clinic_id, 'clinic_id');
	const total_page = Math.ceil(clinicDoctors.length / limit);
	async function GetClinic() {
		const data = await apiRoot.get(
			`/clinic/${clinic_id}/skip=${activePage}/limit=${limit}`
		);
		if (data.status == 200) {
			console.log(data?.data?.data);
			const clinicData = data?.data?.data;
			setClinicDoctors(clinicData?.clinicDoctors);
			setClinicServices(clinicData?.clinicServices);
			setClinic(clinicData);
			// setTotalPage(data?.data?.total_page)
		}
	}

	useEffect(() => {
		GetClinic();
	}, [activePage]);

	console.log(clinic_id, 'id');
	return (
		<section className='' key={data._id}>
			<div className='clinic_box'>
				<h2 className=' text-center font-semibold my-[20px] text-[32px] '>
				More about Clicika
				</h2>

				<div className='card  min-h-[300px] border-2 border-[teal] rounded-[8px] overflow-hidden  '>
					<div className='card_top '>
						<img
							src={clinicImg}
							alt='img'
							className='w-[100%] h-[230px] object-contain mt-2 '
						/>
					</div>
					<div className='card_body  py-[15px] px-[10px] '>
						<h2 className=' text-[32px]  font-semibold mb-3 '>
							{clinic?.name}
						</h2>
						<div className='flex items-center mb-3  gap-x-[15px]'>
							<FaPhone className=' w-[20px] h-[20px]  ' />
							<p class=' font-normal text-[22px] dark:text-gray-400'>
								Tel:{clinic?.phone}
							</p>
						</div>
						<div className='flex items-center mb-3  gap-x-[15px]'>
							<MdLocationPin className='w-[25px] h-[25px]   ' />
							<p class=' font-normal text-[22px] dark:text-gray-400'>
								{clinic?.location}
							</p>
						</div>
						<div className='flex items-center mb-3  gap-x-[15px]'>
							<FaCalendarWeek className=' w-[20px] h-[20px]  ' />
							<p class=' font-normal text-[22px] dark:text-gray-400'>
								{clinic?.workingDays}
							</p>
						</div>
						<div className='flex items-center mb-3  gap-x-[15px]'>
							<BiSolidTimeFive className=' w-[25px] h-[25px]  ' />
							<p class=' font-normal text-[22px] dark:text-gray-400'>
								{clinic?.workingHours}
							</p>
						</div>

						<div className='flex items-center mb-3  gap-x-[15px]'>
							{/* <BiSolidTimeFive className=" w-[25px] h-[25px]  " /> */}
							<img
								src={doctorIcon}
								alt='doctor'
								className=' w-[25px] h-[25px]  img_filter'
							/>
							<p class=' font-normal text-[22px] dark:text-gray-400'>
								Count Of Doctors {clinic?.clinicDoctors?.length}
							</p>
						</div>

						<div className='flex items-center mb-3  gap-x-[15px]'>
							<img
								src={serviceIcon}
								alt='doctor'
								className=' w-[25px] h-[25px]  img_filter'
							/>

							<p class=' font-normal text-[22px] dark:text-gray-400'>
								Count Of Services {clinic?.clinicServices?.length}
							</p>
						</div>
					</div>
				</div>

				{/* our servise */}

				<div className='mt-[80px]  '>
					<h2 className=' text-center font-semibold my-[20px] text-[32px] '>
						Choose our service
					</h2>

					<Swiper
						// install Swiper modules
						modules={[Navigation, pg]}
						spaceBetween={25}
						slidesPerView={2}
						navigation
						pagination={{ clickable: true }}
						scrollbar={{ draggable: false }}
						onSwiper={(swiper) => console.log(swiper)}
						onSlideChange={() => console.log('slide change')}
					>
						{clinicServices?.length ? (
							clinicServices.map((el) => (
								<SwiperSlide>
									<div className='max-w-sm  min-w-[100%]  border-[1px] border-[teal] rounded-[8px] shadow '>
										<a href='#'>
											<img
												className='rounded-t-lg w-[100%] h-[150px] object-fill  '
												src={serviseImg}
												alt='img'
											/>
										</a>
										<div className='p-5'>
											<h5 className='mb-2 text-2xl font-bold tracking-tight  '>
												{el?.name}{' '}
											</h5>
											<p className='mb-3 font-normal text-gray-300'>
												Price: {el?.cost} $
											</p>
											<Link
												to={`service/${el?._id}`}
												className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
											>
												reservation
												<svg
													className='w-3.5 h-3.5 ml-2'
													aria-hidden='true'
													xmlns='http://www.w3.org/2000/svg'
													fill='none'
													viewBox='0 0 14 10'
												>
													<path
														stroke='currentColor'
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth={2}
														d='M1 5h12m0 0L9 1m4 4L9 9'
													/>
												</svg>
											</Link>
										</div>
									</div>
								</SwiperSlide>
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
					</Swiper>
				</div>

				{/* clinic doctors */}
				<h2 className=' text-center font-semibold my-[20px] text-[32px] '>
					Our Doctors
				</h2>

				<div className='  flex items-center gap-[20px] py-[20px] my-[20px]  flex-wrap pb-[50px]  relative '>
					{clinicDoctors?.length ? (
						clinicDoctors.map((el) => (
							<div className='card  h-auto min-h-[300px] w-[100%] border-2 border-[teal] rounded-[8px] overflow-hidden  '>
								<div className='card_top ' key={el?._id}>
									<img
										src={DoctorImg}
										alt='img'
										className='w-[100%] h-[230px] object-contain mt-2 '
									/>
								</div>
								<div className='card_body  py-[15px] px-[10px] '>
									<h2 className=' text-[22px]  font-semibold mb-3 '>
										{' '}
										{el?.fullName}{' '}
									</h2>
									<div className='flex items-center mb-3  gap-x-[15px]'>
										<FaPhone className=' w-[20px] h-[20px]  ' />
										<p class=' font-normal text-[16px] dark:text-gray-400'>
											{el?.phone}
										</p>
									</div>

									<div className='flex items-center mb-3  gap-x-[15px]'>
										<FaCalendarWeek className=' w-[20px] h-[20px]  ' />
										<p class=' font-normal text-[16px] dark:text-gray-400'>
											{el?.workingDays} , {el?.workingHours}
										</p>
									</div>
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
						totalPage={total_page}
					/>
				</div>
			</div>
		</section>
	);
};

export default SingleClinic;
