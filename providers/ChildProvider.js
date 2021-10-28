import React, { createContext, useState, useEffect } from 'react';
import { useToast } from 'native-base';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useNavigation } from '@react-navigation/core';

import { firestore } from '../config/firebaseConfig';
import { clearData, getData, storeData } from '../util/helper';

export const ChildContext = createContext();

const ChildProvider = ({ children }) => {
	const toast = useToast();
	const navigation = useNavigation();
	const [child, setChild] = useState(() => {
		const localChild = getData('ito_child');
		return localChild?.name
			? localChild
			: {
					loggedInStatus: false,
					name: '',
					age: 0,
					parentemail: '',
					parentid: '',
			  };
	});

	useEffect(() => {
		storeData('ito_child', JSON.stringify(child));
	}, [child]);

	const [childTasks, areChildTasksLoading, childTasksErrors] =
		useCollectionData(
			firestore
				.collection('tasks')
				.where('authid', '==', child?.parentid)
				.where('assignedto', '==', child?.name || '')
				.where('completed', '==', false)
				.orderBy('isActive', 'desc')
				.orderBy('asap', 'desc')
				.orderBy('createdon', 'asc')
		);

	const completeTask = (id) => {
		const task = firestore.collection('tasks').doc(id);
		task.update({
			completed: true,
			datecompleted: new Date(),
			isActive: false,
		})
			.then(() => {
				toast.show({
					title: `Great job ${child.name}`,
					status: 'success',
					description: 'You did a great job with that one!',
					placement: 'bottom',
				});
			})
			.catch((err) => {
				console.log('complete task error:', err.message);
			});
	};

	const signChildOut = () => {
		clearData('ito_child');
		setChild({
			age: 0,
			name: '',
			parentid: '',
			parentemail: '',
			loggedInStatus: false,
		});
		navigation.navigate('Login');
	};

	return (
		<ChildContext.Provider
			value={{
				child,
				setChild,
				childTasks,
				areChildTasksLoading,
				childTasksErrors,
				completeTask,
				signChildOut,
			}}
		>
			{children}
		</ChildContext.Provider>
	);
};

export default ChildProvider;
