import React, { useState } from 'react';
import './SingleClinic.scss';
import { useTelegram } from '../../hooks/useTelegram';
import { useCallback, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import { FaPhone } from 'react-icons/fa';
import { FaCalendarWeek } from 'react-icons/fa';
import { MdLocationPin } from 'react-icons/md';
import { BiSolidTimeFive } from 'react-icons/bi';

import datamy from '../../db/clinic.json';
import { Pagination } from '../../components/Pagination/Pagination';


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
const doctors =data?.clinicDoctors
	console.log(data);

	console.log(id, 'id');
	return (
		<section className='w-[100%]  mx-auto sm:w-[50%]'>
			<div className='clinic_box'>
				<h2 className=' text-center font-semibold my-[20px] text-[32px] '>
					{' '}
					Clicika haqida bavsil{' '}
				</h2>

				<div className='card  min-h-[300px] border-2 border-[teal] rounded-[8px] overflow-hidden  '>
					<div className='card_top '>
						<img
							src={data?.img}
							alt='img'
							className='w-[100%] h-[230px] object-cover '
						/>
					</div>
					<div className='card_body  py-[15px] px-[10px] '>
						<h2 className=' text-[32px]  font-semibold mb-3 '>
							{' '}
							{data?.name}{' '}
						</h2>
						<div className='flex items-center mb-3  gap-x-[15px]'>
							<FaPhone className=' w-[20px] h-[20px]  ' />
							<p class=' font-normal text-[22px] dark:text-gray-400'>
								Tel:{data?.phone}
							</p>
						</div>
						<div className='flex items-center mb-3  gap-x-[15px]'>
							<MdLocationPin className='w-[25px] h-[25px]   ' />
							<p class=' font-normal text-[22px] dark:text-gray-400'>
								{data?.location}
							</p>
						</div>
						<div className='flex items-center mb-3  gap-x-[15px]'>
							<FaCalendarWeek className=' w-[20px] h-[20px]  ' />
							<p class=' font-normal text-[22px] dark:text-gray-400'>
								{data?.workingDays}
							</p>
						</div>
						<div className='flex items-center mb-3  gap-x-[15px]'>
							<BiSolidTimeFive className=' w-[25px] h-[25px]  ' />
							<p class=' font-normal text-[22px] dark:text-gray-400'>
								{data?.workingHours}
							</p>
						</div>
					</div>
				</div>

{/* clinic doctors */}

<div className="  flex items-center gap-x-[20px] py-[20px] my-[20px] ">
{
	doctors?.length ? (
		doctors.map(el => <div className='card  min-h-[300px] w-[250px] border-2 border-[teal] rounded-[8px] overflow-hidden  '>
					<div className='card_top '>
						<img
							src={data?.img}
							alt='img'
							className='w-[100%] h-[230px] object-cover '
						/>
					</div>
					<div className='card_body  py-[15px] px-[10px] '>
						<h2 className=' text-[32px]  font-semibold mb-3 '>
							{' '}
							{data?.name}{' '}
						</h2>
						<div className='flex items-center mb-3  gap-x-[15px]'>
							<FaPhone className=' w-[20px] h-[20px]  ' />
							<p class=' font-normal text-[22px] dark:text-gray-400'>
								Tel:{data?.phone}
							</p>
						</div>
						<div className='flex items-center mb-3  gap-x-[15px]'>
							<MdLocationPin className='w-[25px] h-[25px]   ' />
							<p class=' font-normal text-[22px] dark:text-gray-400'>
								{data?.location}
							</p>
						</div>
						<div className='flex items-center mb-3  gap-x-[15px]'>
							<FaCalendarWeek className=' w-[20px] h-[20px]  ' />
							<p class=' font-normal text-[22px] dark:text-gray-400'>
								{data?.workingDays}
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

  

			</div>







		</section>
	);
};

export default SingleClinic;
