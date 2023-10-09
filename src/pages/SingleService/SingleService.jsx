import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Pagination } from '../../components/Pagination/Pagination';
import { FaPhone } from 'react-icons/fa';
import { FaCalendarWeek } from 'react-icons/fa';
import { useTelegram } from '../../hooks/useTelegram';
// tostifiy
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import datamy from '../../db/clinic.json';
import { Modal } from '../../components/Modal/Modal.jsx';
import apiRoot, { baseUrlImg } from '../../api/api';

import clinicImg from '../../assets/images/clinic2.png';
import serviseImg from '../../assets/images/service1.png';
import DoctorImg from '../../assets/images/docrorImg.png';

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
	const [order, setOrder] = useState([]);
	const [clinicServices, setClinicServices] = useState([]);

// login refs
	const nameRef = useRef();
	const emailRef = useRef();
	const pasRef = useRef();
	const phoneRef = useRef();
	const imgRef = useRef();
// my toasts
	const orderSuccess = () => toast("You have successfully   booked ");
	const orderFaild = () => toast("Wow somthing went wrong!");
	const registerToast = () => toast(" You have successfully registered");
	const testToast = () => toast(" test");


	const { service_id, clinic_id ,patient_id } = useParams();

	useEffect(() => {
		(async () => {
			// const data2 = await fetch(api).then((res) => res.json());
			setData(datamy);
		})();
		// }, [api]);
	}, []);



	
	

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

		}
	}

	useEffect(() => {
		GetService();
		GetDoctors();
	}, [activePage]);
	const orders = JSON.parse(localStorage.getItem("order"))

	const handleSubmit = async (evt) => {
		evt.preventDefault();


console.log(orders ,"orders");
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
				patientID:patient_id,
			}
			console.log(data);

			const resp = await apiRoot.post("/order" , data);

			console.log(resp?.data ,"order data");

			if(resp.status ==201){
				orderSuccess()
				setOrderModal(false)
				 const doctorOne = clinicDoctors.filter(el => {
					console.log(el?._id ==doctorId)
					return el?._id ==doctorId
				})
				console.log(doctorOne,"doctorOne");
				const myData ={
					doctorName:doctorOne[0]?.fullName,
					doctorPhone:doctorOne[0]?.phone,
					doctorWorkDays:doctorOne[0]?.workingDays + " " +doctorOne[0]?.workingHours,
					scheduledDay:data?.scheduledDay,
					scheduledHour:data?.scheduledHour,
				}
				setOrder([...order ,myData])
console.log([...order ,myData] ,"order last");

				localStorage.setItem("order" , JSON.stringify([...order ,myData]))
			} else {
				orderFaild()
			}
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
	registerToast()
setOrderModal(true)
setLoginModal(false)

const user = data.data?.user 
localStorage.setItem("user_id" ,user._id)
 setUserId(user._id)
console.log(user);

}
	};

	console.log(orders ,"orders tashqari");

	return (
		<>
			<h2 className=' text-center font-semibold my-[20px] text-[32px] '>
				Choose our service and booking
			</h2>

			
						<div className='max-w-sm  min-w-[100%]  border-[1px] border-[teal] rounded-[8px] shadow '>
							<a href='#'>
								<img
									className='rounded-t-lg w-[100%] h-[150px] object-contain mt-2  '
									src={serviseImg}
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

			<div className='  flex items-center gap-[20px] py-[20px] my-[20px]  flex-wrap pb-[20px]  relative '>
				{clinicDoctors?.length
					? clinicDoctors.map((el) => (
							<div
								className='card  h-auto min-h-[300px] w-[100%] border-2 border-[teal] rounded-[8px] overflow-hidden  '
								key={el?.id}
							>
								<div className='card_top '>
									<img
										src={DoctorImg}
										alt='img'
										className='w-[100%] h-[230px] object-contain mt-2 '
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
											patient_id ? (setOrderModal(true)) :setLoginModal(true)
									
										} }
									>
										{' '}
										Reservation{' '}
									</button>
								</div>
							</div>
					  ))
					: <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-neutral-100 motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
</div>}
			
			</div>








			<h2 className=' text-center font-semibold my-[20px] text-[32px] '>
				Your orders
			</h2>

<div className="flex items-center justify-center flex-col  gap-3 ">

{
	orders?.length  ? (
		orders.map( el=><div className='max-w-sm  min-w-[100%]  border-[1px] border-[teal] rounded-[8px] shadow '>
						
							<div className='p-3'>

							<p className='mb-3 font-bold text-[18px] text-white'>
								scheduledDay : {el?.scheduledDay} 
								</p>
								<p className='mb-3 font-bold text-[18px] text-white'>
								scheduledHour : {el?.scheduledHour} 
								</p>
								<p className='mb-3 font-normal text-[18px] text-white '>
								doctor name	{el?.doctorName}
								</p>

								<p className='mb-3 font-normal text-[18px] text-white '>
								doctor Phone: {el?.doctorPhone}
								</p>
								<p className='mb-3 font-normal text-[18px] text-white'>
								doctor time : {el?.doctorWorkDays} 
								</p>
								
							</div>
						</div>)
	) : " orderlar yoq "
}



</div>








{/* register modal */}


			<Modal
				width={'90%'}
				title={'Register'}
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

			<ToastContainer />
		</>
	);
};

export default SingleService;
