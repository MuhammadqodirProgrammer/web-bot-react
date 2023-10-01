import React, { useState } from 'react';
import './ProductList.css';
import ProductItem from '../ProductItem/ProductItem';
import { useTelegram } from '../../hooks/useTelegram';
import { useCallback, useEffect } from 'react';

const products = [
	{ id: '1', name: 'eshmat clinck', img: "https://qtxasset.com/quartz/qcloud5/media/image/fiercehealthcare/1598464584/Mayo%20Clinic%20logo.jpg/Mayo%20Clinic%20logo.jpg?VersionId=jVFvD2Xe_AYZKxIPgig..j8eMTZ9ijsA", phone: "940850818",location:"Tashket",workingDays: "du chor ju", workingHours:"10:00-18:00" },

];

const getTotalPrice = (items = []) => {
	return items.reduce((acc, item) => {
		return (acc += item.price);
	}, 0);
};

const ProductList = () => {
	const [addedItems, setAddedItems] = useState([]);
	const { tg, queryId } = useTelegram();

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
		<div className={'list'}>
			{products.map((item) => (
				<ProductItem clinic={item} onAdd={onAdd} className={'item'} />
			))}
		</div>
	);
};

export default ProductList;
