import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
} from 'react-native';
// import confetti from 'canvas-confetti';
import { firestore } from '../../config/firebaseConfig';
import { ChildContext } from '../../providers/ChildProvider';
import generateFinishMessage from '../../util/finishMessages';
import colors from '../../GlobalStyles';
import Spinner from '../../components/Spinner';

const styles = StyleSheet.create({
	ChildDashboard: {
		flex: 1,
		alignContent: 'center',
		justifyContent: 'center',
		backgroundColor: colors.primary,
	},
	ChildDashboardDone: {
		backgroundColor: colors.mint,
	},
	content: {
		width: '80%',
		alignSelf: 'center',
	},
	childName: {
		color: colors.white,
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		borderWidth: 2,
		borderStyle: 'solid',
		borderColor: colors.white,
		borderRadius: 8,
		marginVertical: 20,
		paddingVertical: 16,
		paddingHorizontal: 48,
		textTransform: 'uppercase',
		fontSize: 32,
		fontWeight: 'bold',
		textAlign: 'center',
		maxWidth: 400,
		alignSelf: 'center',
	},
	doneMessage: {
		color: colors.primary,
		fontWeight: 'bold',
		fontSize: 48,
		textAlign: 'center',
	},
	taskItem: {
		color: colors.white,
		fontSize: 60,
		fontWeight: 'bold',
		textAlign: 'center',
		alignSelf: 'center',
	},
	taskButton: {
		marginTop: 32,
		width:
			Math.min(
				Dimensions.get('window').width,
				Dimensions.get('window').height
			) * 0.5,
		height:
			Math.min(
				Dimensions.get('window').width,
				Dimensions.get('window').height
			) * 0.5,
		backgroundColor: colors.secondary,
		alignSelf: 'center',
		borderRadius:
			Math.round(
				Math.min(
					Dimensions.get('window').width,
					Dimensions.get('window').height
				) * 0.5
			) +
			Math.round(
				Math.min(
					Dimensions.get('window').width,
					Dimensions.get('window').height
				) * 0.5
			) /
				2,

		textAlign: 'center',
		borderWidth: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
	taskButtonText: {
		fontSize: 48,
		fontWeight: 'bold',
		textTransform: 'uppercase',
		color: colors.white,
	},
	successMessageText: {
		fontSize: 32,
		color: colors.white,
		textAlign: 'center',
	},
});

const ChildDashboard = () => {
	const { child, childTasks, areChildTasksLoading, completeTask } =
		useContext(ChildContext);
	const [disableButton, setDisableButton] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');

	const [activeTask, setActiveTask] = useState(() => {
		if (childTasks && childTasks[0]) {
			return childTasks[0];
		}
		return {};
	});

	const completeChildTask = useCallback(
		(id) => {
			if (id) {
				setDisableButton(true);
				completeTask(id);
				setSuccessMessage(generateFinishMessage());
				// confetti();
				setTimeout(() => {
					setDisableButton(false);
					setSuccessMessage('');
				}, 15000);
			} else {
				console.log(
					'No id was passed to the complete child task component.'
				);
			}
		},
		[completeTask]
	);

	useEffect(() => {
		if (childTasks && childTasks[0]) {
			setActiveTask(childTasks[0]);
		} else {
			setActiveTask(undefined);
		}
	}, [childTasks]);

	useEffect(() => {
		if (activeTask && !activeTask.isActive) {
			const childActiveTask = firestore
				.collection('tasks')
				.doc(activeTask.id);

			childActiveTask.get().then((doc) => {
				if (doc.exists) {
					childActiveTask.set(
						{
							isActive: true,
						},
						{ merge: true }
					);
				}
			});
		}
	}, [child.parentid, childTasks, activeTask]);

	if (areChildTasksLoading) {
		return <Spinner />;
	}

	return (
		<View
			style={[
				styles.ChildDashboard,
				!activeTask && styles.ChildDashboardDone,
			]}
		>
			<View style={styles.content}>
				{activeTask ? (
					<>
						<Text style={styles.childName}>{child.name}</Text>

						{!disableButton ? (
							<>
								<Text style={styles.taskItem}>
									{activeTask.name}
								</Text>
								<TouchableOpacity
									type="button"
									style={styles.taskButton}
									onPress={() =>
										completeChildTask(activeTask.id)
									}
								>
									<Text style={styles.taskButtonText}>
										Done
									</Text>
								</TouchableOpacity>
							</>
						) : (
							successMessage && (
								<Text style={styles.successMessageText}>
									{successMessage}
								</Text>
							)
						)}
					</>
				) : (
					<Text style={styles.doneMessage}>
						Great Job {child.name}!{'\n'}You are all done for right
						now!
					</Text>
				)}
			</View>
		</View>
	);
};

export default ChildDashboard;
