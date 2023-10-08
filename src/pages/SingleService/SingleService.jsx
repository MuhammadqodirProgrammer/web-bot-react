import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
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
import { Modal } from '../../components/Modal/Modal.jsx';
import apiRoot, { baseUrlImg } from '../../api/api';

const SingleService = () => {
	const [activePage, setActivePage] = useState(1);
	const [data, setData] = useState([]);
	const [loginModal, setLoginModal] = useState(false);
	const [orderModal, setOrderModal] = useState(false);
	const [time, setTime] = useState();
	const [date, setDate] = useState();
	const [search, setSearch] = useState('');
	const [totalPage, setTotalPage] = useState(1);
	const [userId, setUserId] = useState();
	const [clinicDoctors, setClinicDoctors] = useState([]);
	const [clinicServices, setClinicServices] = useState([]);


	const nameRef = useRef();
	const emailRef = useRef();
	const pasRef = useRef();
	const phoneRef = useRef();
	const imgRef = useRef();


	const { service_id, clinic_id } = useParams();
	const patientId =localStorage.getItem("user_id")

	useEffect(() => {
		(async () => {
			// const data2 = await fetch(api).then((res) => res.json());
			setData(datamy);
		})();
		// }, [api]);
	}, []);

	const { tg, queryId } = useTelegram();

	const [doctorId, setDoctorId] = useState();

	async function GetService() {
		const data = await apiRoot.get(`/service/${service_id}`);

		if (data.status == 200) {
			const clinicData = data?.data?.data;
			setClinicServices(clinicData);
		}
	}

	async function GetDoctors() {
		const data = await apiRoot.get(`/doctorAll`);

		if (data.status == 200) {
			const Doctors = data?.data?.data;
			const serviceDoctors = Doctors.filter(
				(el) => el?.doctorServiceID?._id == service_id
			);
			setClinicDoctors(serviceDoctors);

			console.log(serviceDoctors, 'serviceDoctors');
		}
	}

	useEffect(() => {
		GetService();
		GetDoctors();
	}, [activePage]);

	const handleSubmit = async (evt) => {
		evt.preventDefault();

		if (!date) {
			alert('Pleace select  date ');
		} else if (!time) {
			alert('Pleace select time ');
		} else {
			const data ={
				scheduledDay:date,
				scheduledHour:time,
				serviceID:service_id,
				clinicID:clinic_id,
				doctorID:doctorId,
				patientID:userId,
			}
			console.log(data);

			const resp = await apiRoot.post("/order" , data);

			console.log(resp ,"resp");
		}

		console.log(time, date);
	};

	const CreatePatient = async (evt) => {
		evt.preventDefault();
const formData = new FormData()

formData.append("fullName", nameRef.current?.value)
formData.append("email", emailRef.current?.value)
formData.append("password", pasRef.current?.value)
formData.append("phone", phoneRef.current?.value)
formData.append("img", imgRef.current?.files[0])
	
const data =await apiRoot.post("patient" ,formData)

if(data.status ==201)
{

setOrderModal(true)
setLoginModal(false)

const user = data.data?.user 
localStorage.setItem("user_id" ,user._id)
 setUserId(user._id)

console.log(user);

}
	};

	return (
		<>
			<h2 className=' text-center font-semibold my-[20px] text-[32px] '>
				Biznig hizmatlarni tanlang va joy band qiling
			</h2>

			
						<div className='max-w-sm  min-w-[100%]  border-[1px] border-[teal] rounded-[8px] shadow '>
							<a href='#'>
								<img
									className='rounded-t-lg w-[100%] h-[150px] object-fill  '
									src={`${baseUrlImg}/${clinicServices?.img}`}
									alt='img'
								/>
							</a>
							<div className='p-5'>
								<h5 className='mb-2 text-2xl font-bold tracking-tight  '>
									{clinicServices?.name}
								</h5>

								<h5 className='mb-2 text-xl font-bold tracking-tight  '>
									bor doctorlar soni: {clinicDoctors?.length}
								</h5>
								<p className='mb-3 font-normal text-[20px] text-gray-300'>
									Price: {clinicServices?.cost} $
								</p>
							</div>
						</div>
			

		

			{/* clinic doctors */}
			<h2 className=' text-center font-semibold my-[20px] text-[32px] '>
				Clinic Doctors
			</h2>

			<div className='  flex items-center gap-[20px] py-[20px] my-[20px]  flex-wrap pb-[50px]  relative '>
				{clinicDoctors?.length
					? clinicDoctors.map((el) => (
							<div
								className='card  h-auto min-h-[300px] w-[100%] border-2 border-[teal] rounded-[8px] overflow-hidden  '
								key={el?.id}
							>
								<div className='card_top '>
									<img
										src={`${baseUrlImg}/${el?.img}`}
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
										<FaCalendarWeek className=' w-[20px] h-[20px]  ' />
										<p class=' font-normal text-[16px] dark:text-gray-400'>
											{el?.workingDays} , {el?.workingHours}
										</p>
									</div>

									<button
										className=' w-[100%] py-[15px] bg-[teal] text-[20px]  rounded-[8px] '
										onClick={() =>{
											setDoctorId(el?._id)
											patientId ? (setOrderModal(true)) :setLoginModal(true)
									
										} }
									>
										{' '}
										Reservation{' '}
									</button>
								</div>
							</div>
					  ))
					: ' docrorlar yoq ☹'}
			
			</div>
{/* register modal */}


			<Modal
				width={'90%'}
				title={'Navbat olish'}
				modal={loginModal}
				setModal={setLoginModal}
			>
				<div className=' '>
					<form className='bg-white  rounded pb-3 ' onSubmit={CreatePatient}>
						<div className='mb-4'>
						
							<input
								type='text'
								ref={nameRef}
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  ou  focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 
								dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none'
								placeholder='Enter your full name'
							/>
						</div>
						<div className='mb-4'>
						
						<input
							type='email'
							ref={emailRef}
							className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  ou  focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 
							dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none'
							placeholder='Enter your email'
						/>
					</div>

					<div className='mb-4'>
						
						<input
							type='password'
							ref={pasRef}
							className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  ou  focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 
							dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none'
							placeholder='Enter your password'
						/>
					</div>

					<div className='mb-4'>
						
						<input
							type='text'
							ref={phoneRef}
							className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  ou  focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 
							dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none'
							placeholder='Enter your phone number'
						/>
					</div>

						<div className='mb-6'>
							<label
								className='block text-gray-700 text-sm font-bold mb-2'
							
							>
								post your picture if you want
							</label>
							<input
								ref={imgRef}
								type='file'
								onChange={(e) => setTime(e.target.value)}
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
								placeholder='Select date'
							/>
						</div>

						<button
							type='submit'
							className='bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
						>
							Submit
						</button>
					</form>
				</div>
			</Modal>

			{/* order modal */}

			
			<Modal
				width={'90%'}
				title={'Navbat olish'}
				modal={orderModal}
				setModal={setOrderModal}
			>
				<div className=' '>
					<form className='bg-white  rounded pb-3 ' onSubmit={handleSubmit}>
						<div className='mb-4'>
							<label
								className='block text-gray-700 text-sm font-bold mb-2'
								htmlFor='username'
							>
								Which day
							</label>
							<input
								datepicker
								datepicker-format='mm/dd/yyyy'
								type='date'
								onChange={(e) => setDate(e.target.value)}
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
								placeholder='Select date'
							/>
						</div>
						<div className='mb-6'>
							<label
								className='block text-gray-700 text-sm font-bold mb-2'
								htmlFor='password'
							>
								Please choose time
							</label>
							<input
								datepicker
								datepicker-format='mm/dd/yyyy'
								type='time'
								onChange={(e) => setTime(e.target.value)}
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
								placeholder='Select date'
							/>
						</div>

						<button
							type='submit'
							className='bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
						>
							Book
						</button>
					</form>
				</div>
			</Modal>
		</>
	);
};

export default SingleService;
