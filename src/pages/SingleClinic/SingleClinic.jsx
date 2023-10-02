import React, { useState } from 'react';
import './SingleClinic.scss';
import { useTelegram } from '../../hooks/useTelegram';
import { useCallback, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';

const products = [
	{ id: '1', name: 'eshmat clinck', img: "https://qtxasset.com/quartz/qcloud5/media/image/fiercehealthcare/1598464584/Mayo%20Clinic%20logo.jpg/Mayo%20Clinic%20logo.jpg?VersionId=jVFvD2Xe_AYZKxIPgig..j8eMTZ9ijsA", phone: "940850818",location:"Tashket",workingDays: "du chor ju", workingHours:"10:00-18:00" },
	{ id: '2', name: 'Shifo clinck', img: "https://qtxasset.com/quartz/qcloud5/media/image/fiercehealthcare/1598464584/Mayo%20Clinic%20logo.jpg/Mayo%20Clinic%20logo.jpg?VersionId=jVFvD2Xe_AYZKxIPgig..j8eMTZ9ijsA", phone: "940850818",location:"Tashket",workingDays: "du chor ju", workingHours:"10:00-18:00" },

];



const SingleClinic = () => {
	const [addedItems, setAddedItems] = useState([]);
	const { tg, queryId } = useTelegram();

const { id } = useParams()

const clinic =products.find( el =>el.id ==id)

console.log(clinic);

console.log(id ,"id");
	return (
		<section className=''>
      
			<div className="clinic_box">
                <h1 className='text-red-600 text-9xl ' >hello</h1>
            </div>
		</section>
	);
};

export default SingleClinic;
