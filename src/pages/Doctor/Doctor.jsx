import React, { useEffect ,useState ,useRef } from "react";
import { Modal } from "../../components/Modal/Modal";
import "./Doctor.scss";
// tostifiy
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiRoot, { baseUrlImg } from '../../api/api';
import { useParams } from "react-router-dom";

import {BsFillCheckCircleFill} from "react-icons/bs"
import doctorImg from "../../assets/images/docrorImg.png"

export default function Doctor() {
	const [loginModal, setLoginModal] = useState(false);
	const [orders, setOrders] = useState([]);
	const [doctorInfo, setDoctorInfo] = useState([]);
	const [orderId, setOrderId] = useState();
 const { doctor_id} =  useParams()
	const loginToast = () => toast(" You have successfully registered");
console.log(doctor_id);
  // login refs
	const nameRef = useRef();
	const emailRef = useRef();
	const pasRef = useRef();
	const phoneRef = useRef();
	const imgRef = useRef();
  const doctorId ="65227e7bbdbe68e4ab6535f0"

	async function GetDoctor() {
		const data = await apiRoot.get(
			`/doctor/${doctor_id}`
		);
    console.log(data?.data?.data ,"------------");
		if (data.status == 200) {
			const doctorData = data?.data?.data;

      setOrders(doctorData?.doctorOrders)
      setDoctorInfo(doctorData)
		
		}
	}

	useEffect(() => {
		GetDoctor();
	}, []);

  const CreatePatient = async (evt) => {
		evt.preventDefault();

	
const data = await apiRoot.put(`/orderStatus/${orderId}`)
console.log(data ,"data");
if(data?.status ==200)
{
	loginToast()
  setLoginModal(false)
}
	};

console.log(orderId ,"orderId");

  return (
    <div className="">
      <h4 className="text-[32px] mb-2 text-center font-semibold">Your information</h4>
      <div>
        <div>
          <div className="border border-[grey] p-5 shadow rounded-lg">
            <img
              src={doctorImg}
              alt="pic"
              className="w-full  object-contain bg-white mb-3 h-[250px] rounded-md"
            />
            <h3  className=" font-semibold " > { doctorInfo?.fullName }</h3>
            <p  className=" my-[5px] " >Phone: { doctorInfo?.phone }</p>
            {/* <p  className=" my-[5px] " >Email: { doctorInfo?.email }</p>
            <p  className=" my-[5px] " >Password: { doctorInfo?.password }</p> */}
            <div className="flex gap-3">
              <p>{ doctorInfo?.workingDays } </p>
              <div>

              <span className="font-semibold text-[#78ff60]">{ doctorInfo?.workingHours?.split("-")[0] }-</span>
              <span className="font-semibold text-[#ef4949]">{ doctorInfo?.workingHours?.split("-")[1] }</span>
              </div>
            </div>
          </div>
        </div>








          <h4 className=" font-medium  my-5 text-[28px] ">Orders Count: {orders?.length} </h4>

        <div className="relative overflow-x-auto  mt-2">
              <table className="w-full text-sm text-left text-gray-500  dark:text-gray-400">
                <thead>
                  <tr className="grid grid-cols-3   py-2   text-[#A098AE]  ">
                    <th className="text-center  ">Patient</th>
                    <th className="text-center "> Day</th>
                    <th className="text-center  "> Time</th>
                  </tr>
                </thead>
                <tbody className="border-none">
                  {orders?.map((el) => (
                    <tr className=" grid grid-cols-3 items-center  border-b  my-3  text-white  ">
                      <td className=" flex items-center gap-x-2  border-none  ">
                        <img
                          src={`https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png`}
                          alt="img "
                          className=" lg:w-[48px] lg:h-[48px] md:w-[35px] md:h-[35px]  w-[30px] h-[30px] max-w-none  block object-cover rounded-full "
                        />

                        <span>
                         name
                        </span>
                      </td>
                      <td className="   md:text-[18px] border-none   text-[16px] text-center">
                        {el?.scheduledDay}  
                      </td>
                      <td className="  text-[14px] border-none  text-center  flex items-center justify-around ">
                      <span>

                      {el?.scheduledHour}
                      </span>
<BsFillCheckCircleFill  className="  w-[23px] h-[23px]  " onClick={ ()=>{
  setLoginModal(true); setOrderId(el?._id)} }  />

                      </td>

                     
                   
                    </tr>
                  ))}
                </tbody>
              </table>

          
            </div>



      
      </div>



      <Modal
				width={'90%'}
				title={' You are check this patient'}
				modal={loginModal}
				setModal={setLoginModal}
			>
				<div className=' '>
					<form className='bg-white  rounded pb-3 flex items-center justify-center gap-x-4 ' onSubmit={CreatePatient}>
						<button
							type='submit'
							className='bg-blue-500   hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
						>
							Submit
						</button>
            <button
							type='button'
							className='bg-red-500   hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'

              onClick={()=>setLoginModal(false)}
						>
							Censel
						</button>
					</form>
				</div>
			</Modal>
      <ToastContainer/>
    </div>
  );
}
