import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect } from 'react';

export const ChildContext = createContext();

const ChildProvider = ({ children }) => {
	const [child, setChild] = useState(() => {
		const localChild = AsyncStorage.getItem('ito_child');
		return (
			localChild || {
				loggedInStatus: false,
				name: '',
				age: 0,
				parentemail: '',
				parentid: '',
			}
		);
	});

	useEffect(() => {
		AsyncStorage.setItem('ito_child', child);
	}, [child]);

	// const [childTasks, areChildTasksLoading, childTasksErrors] =
	// 	useCollectionData(
	// 		firestore
	// 			.collection('tasks')
	// 			.where('authid', '==', child.parentid)
	// 			.where('assignedto', '==', child.name)
	// 			.where('completed', '==', false)
	// 			.orderBy('isActive', 'desc')
	// 			.orderBy('asap', 'desc')
	// 			.orderBy('createdon', 'asc')
	// 	);

	// const completeTask = (id) => {
	// 	const task = firestore.collection('tasks').doc(id);
	// 	task.update({
	// 		completed: true,
	// 		datecompleted: new Date(),
	// 		isActive: false,
	// 	}).then(() => {
	// 		setToast(
	// 			`Great job ${child.name}`,
	// 			'You did a great job with that one!',
	// 			'mint'
	// 		);
	// 		// TODO: Make playful animation?
	// 	});
	// };

	// const signChildOut = () => {
	// 	clearItem('ito_child');
	// 	setChild({
	// 		age: 0,
	// 		name: '',
	// 		parentid: '',
	// 		parentemail: '',
	// 		loggedInStatus: false,
	// 	});
	// 	history.push('/login');
	// };
	return (
		<ChildContext.Provider value={{ child, setChild }}>
			{children}
		</ChildContext.Provider>
	);
};

export default ChildProvider;
