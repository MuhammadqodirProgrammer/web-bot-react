import React, { useState } from "react";
import "./SingleClinic.scss";
import { useTelegram } from "../../hooks/useTelegram";
import { useCallback, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";

import { FaPhone } from "react-icons/fa";
import { FaCalendarWeek } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { BiSolidTimeFive } from "react-icons/bi";

import jobIcon from "../../assets/images/job.png"
import doctorIcon from "../../assets/images/doctor2.png"
import serviceIcon from "../../assets/images/service.png"
import datamy from "../../db/clinic.json";
import { Pagination } from "../../components/Pagination/Pagination";

const SingleClinic = () => {
  const [activePage, setActivePage] = useState(1);
  const [search, setSearch] = useState("");

  // let api = `https://rickandmortyapi.com/api/character/?page=${activePage}&name=${search}&status=${status}`;
  const [data, setData] = useState([]);
  const { info, results } = data;
  useEffect(() => {
    (async () => {
      // const data2 = await fetch(api).then((res) => res.json());
      setData(datamy);
    })();
    // }, [api]);
  }, []);

  const { tg, queryId } = useTelegram();

  const { id } = useParams();

  // const clinic = data.find((el) => el.id == id);
  const doctors = data?.clinicDoctors;
  const services = data?.clinicServices;
  console.log(data);

  console.log(id, "id");
  return (
    <section className="w-[100%]  mx-auto sm:w-[50%]" key={data.id}>
      <div className="clinic_box">
        <h2 className=" text-center font-semibold my-[20px] text-[32px] ">
          Clicika haqida batafsil
        </h2>

        <div className="card  min-h-[300px] border-2 border-[teal] rounded-[8px] overflow-hidden  ">
          <div className="card_top ">
            <img
              src={data?.img}
              alt="img"
              className="w-[100%] h-[230px] object-cover "
            />
          </div>
          <div className="card_body  py-[15px] px-[10px] ">
            <h2 className=" text-[32px]  font-semibold mb-3 ">{data?.name}</h2>
            <div className="flex items-center mb-3  gap-x-[15px]">
              <FaPhone className=" w-[20px] h-[20px]  " />
              <p class=" font-normal text-[22px] dark:text-gray-400">
                Tel:{data?.phone}
              </p>
            </div>
            <div className="flex items-center mb-3  gap-x-[15px]">
              <MdLocationPin className="w-[25px] h-[25px]   " />
              <p class=" font-normal text-[22px] dark:text-gray-400">
                {data?.location}
              </p>
            </div>
            <div className="flex items-center mb-3  gap-x-[15px]">
              <FaCalendarWeek className=" w-[20px] h-[20px]  " />
              <p class=" font-normal text-[22px] dark:text-gray-400">
                {data?.workingDays}
              </p>
            </div>
            <div className="flex items-center mb-3  gap-x-[15px]">
              <BiSolidTimeFive className=" w-[25px] h-[25px]  " />
              <p class=" font-normal text-[22px] dark:text-gray-400">
                {data?.workingHours}
              </p>
            </div>

			<div className="flex items-center mb-3  gap-x-[15px]">
              {/* <BiSolidTimeFive className=" w-[25px] h-[25px]  " /> */}
			  <img src={doctorIcon} alt="doctor"  className=" w-[25px] h-[25px]  img_filter" />
              <p class=" font-normal text-[22px] dark:text-gray-400">
			  Count Of Doctors {data?.clinicDoctors?.length}
              </p>
            </div>

			<div className="flex items-center mb-3  gap-x-[15px]">
			<img src={serviceIcon} alt="doctor"  className=" w-[25px] h-[25px]  img_filter" />

              <p class=" font-normal text-[22px] dark:text-gray-400">
			  
			  Count Of Services {data?.clinicServices?.length}
              </p>
            </div>
			

          </div>
        </div>

        {/* clinic doctors */}
		<h2 className=" text-center font-semibold my-[20px] text-[32px] ">
         Our  Doctors
        </h2>

<div className="  flex items-center gap-[20px] py-[20px] my-[20px]  flex-wrap pb-[50px]  relative ">
{
	doctors?.length ? (
		doctors.map(el => <div className='card  h-auto min-h-[300px] w-[100%] border-2 border-[teal] rounded-[8px] overflow-hidden  '>
					<div className='card_top '>
						<img
							src={el?.img}
							alt='img'
							className='w-[100%] h-[230px] object-cover '
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
						<img src={jobIcon} alt="doctor"  className=" w-[22px] h-[22px]  img_filter" />

							<p class=' font-normal text-[22px] dark:text-gray-400'>
								{el?.doctorSkills} 
							</p>
						</div>
					
					</div>
				</div>)
	) :" docrorlar yoq ☹"
	
}
<Pagination
        activePage={activePage}
        setActivePage={setActivePage}
        totalPage={5}
		
      />
</div>

  


{/* our servise */}

<div className="mt-[80px]  ">
<h2 className=" text-center font-semibold my-[20px] text-[32px] ">
         Biznig hizmatlarni tanlang va joy band qiling
        </h2>














<div className="  flex items-center gap-[20px] py-[20px] my-[20px]  flex-wrap pb-[50px]  relative ">
{
	services?.length ? (
		services.map(el => <div className="max-w-sm  min-w-[45%] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  <a href="#">
    <img className="rounded-t-lg w-[100%] h-[150px] object-fill  " src="https://picsum.photos/id/117/200/300" alt="img"   />
  </a>
  <div className="p-5">
    <a href="#">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{el?.name} </h5>
    </a>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Price: {el?.cost} </p>
    <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      Read more
      <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5h12m0 0L9 1m4 4L9 9" />
      </svg>
    </a>
  </div>
</div>
          )
	) :" no services ☹"
	
}
<Pagination
        activePage={activePage}
        setActivePage={setActivePage}
        totalPage={5}
		
      />
</div>








</div>




			</div>







		</section>
	);
};

export default SingleClinic;
