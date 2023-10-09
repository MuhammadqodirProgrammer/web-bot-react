import React, { useEffect ,useState ,useRef } from "react";
import { Modal } from "../../components/Modal/Modal";
import "./clinic.scss";
// tostifiy
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiRoot, { baseUrlImg } from '../../api/api';


export default function Clinic() {
	const [loginModal, setLoginModal] = useState(false);

	const loginToast = () => toast(" You have successfully registered");

  // login refs
	const nameRef = useRef();
	const emailRef = useRef();
	const pasRef = useRef();
	const phoneRef = useRef();
	const imgRef = useRef();
  const doctorId ="65227e7bbdbe68e4ab6535f0"

	async function GetDoctor() {
		const data = await apiRoot.get(
			`/doctor/${doctorId}`
		);
    console.log(data?.data?.data);
		if (data.status == 200) {
			const clinicData = data?.data?.data;
		
		}
	}

	useEffect(() => {
		GetDoctor();
	}, []);

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
	loginToast()
setOrderModal(true)
setLoginModal(false)

const user = data.data?.user 
localStorage.setItem("user_id" ,user._id)
 setUserId(user._id)
console.log(user);

}
	};


  return (
    <div className="">
      <h1 className="text-[35px] font-semibold">CLINIC</h1>
      <div>
        <div>
          <div className="border border-[grey] p-5 shadow rounded-lg">
            <img
              src="https://picsum.photos/seed/picsum/200/300"
              alt="pic"
              className="w-full mb-3 h-[450px] rounded-md"
            />
            <h1>Med Clinic</h1>
            <p>Phone: +998123465897</p>
            <div className="flex gap-3">
              <p>Du-Ju</p>
              <p className="font-semibold text-[#78ff60]">9:00</p>
              <p className="font-semibold text-[#ef4949]">17:00</p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h1 className="text-[25px]">Clients</h1>
          <table className="my-3">
            <tr>
              <th>Client</th>
              <th>Doctor</th>
              <th>number</th>
            </tr>
            <tr>
              <td className="flex items-center gap-3">
                <img
                  src="https://picsum.photos/seed/picsum/200/300"
                  alt="pic"
                  className="w-[30px] mb-3 h-[30px]  rounded-full"
                />
                <p>Hero</p>
              </td>
              <td>Maria Anders</td>
              <td>+99890123456987</td>
            </tr>
            <tr>
              <td className="flex items-center gap-3">
                <img
                  src="https://picsum.photos/seed/picsum/200/300"
                  alt="pic"
                  className="w-[30px] mb-3 h-[30px]  rounded-full"
                />
                <p>Hero</p>
              </td>
              <td>Maria Anders</td>
              <td>+99890123456987</td>
            </tr>
            <tr>
              <td className="flex items-center gap-3">
                <img
                  src="https://picsum.photos/seed/picsum/200/300"
                  alt="pic"
                  className="w-[30px] mb-3 h-[30px]  rounded-full"
                />
                <p>Hero</p>
              </td>
              <td>Maria Anders</td>
              <td>+99890123456987</td>
            </tr>
          </table>
        </div>
        <h1 className="text-[32px]">Apteka: 103</h1>
      </div>



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

	

						<button
							type='submit'
							className='bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
						>
							Submit
						</button>
					</form>
				</div>
			</Modal>
      <ToastContainer/>
    </div>
  );
}
