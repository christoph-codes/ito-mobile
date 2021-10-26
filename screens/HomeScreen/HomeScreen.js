import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import InputText from '../../components/InputText';
// import InputRadio from '../../components/InputRadio';
import Button from '../../components/Button';
import Container from '../../components/Container';
import FeedbackText from '../../components/FeedbackText/FeedbackText';
import H1 from '../../components/H1';
import Logo from '../../components/Logo';
import { firestore } from '../../config/firebaseConfig';
import colors from '../../GlobalStyles';

const styles = StyleSheet.create({
	centerView: {
		flex: 1,
		justifyContent: 'center',
		width: '100%',
		maxWidth: 400,
		alignSelf: 'center',
	},
	radios: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 16,
	},
	copyright: {
		backgroundColor: colors.primary,
		textAlign: 'center',
		paddingBottom: 32,
		justifyContent: 'flex-end',
		color: colors['primary-light'],
	},
});

const HomeScreen = ({ navigation }) => {
	const [familyCode, setFamilyCode] = useState('');
	// const [userType, setUserType] = useState('');
	const [feedback, setFeedback] = useState('');
	const login = () => {
		if (familyCode) {
			const users = firestore
				.collection('users')
				.where('familycode', '==', familyCode);
			users.get().then((snapshot) => {
				// console.log('snapshot:', snapshot.docs);
				if (!snapshot.empty) {
					snapshot.docs.forEach((doc) => {
						setFeedback('');
						const parent = doc.data();
						navigation.navigate('ChildLogin', parent);
						// if (userType === 'parent') {
						// 	history.push('/parent-login', parent.email);
						// } else {
						// 	history.push('/child-login', parent);
						// }
					});
				} else {
					setFeedback('This is not a valid family code.');
				}
			});

			// if (userType) {
			// 	if (userType === 'child') {
			// 		navigation.navigate('ChildLogin');
			// 		setFamilyCode('');
			// 		setUserType('');
			// 		setFeedback('');
			// 	}
			// 	if (userType === 'parent') {
			// 		navigation.navigate('ParentLogin');
			// 		setFamilyCode('');
			// 		setUserType('');
			// 		setFeedback('');
			// 	}
			// 	console.log('Loggin In');
			// } else {
			// 	setFeedback('You must select a type of user.');
			// }
		} else {
			setFeedback('You must enter a family code.');
		}
	};
	return (
		<>
			<Container>
				<View style={styles.centerView}>
					<Logo variant="light" />
					<H1>Login</H1>
					<InputText
						label="Family Code"
						autoCompleteType="username"
						placeholder="jones5"
						onChangeText={setFamilyCode}
						value={familyCode.toLowerCase()}
						onFocus={() => setFeedback('')}
					/>
					{/* <View style={styles.radios}>
					<InputRadio
						label="Parent"
						className="mr-3"
						id="parent"
						name="userType"
						value={userType === 'parent'}
						onChange={() => setUserType('parent')}
					/>
					<InputRadio
						label="Child"
						id="child"
						name="userType"
						value={userType === 'child'}
						onChange={() => setUserType('child')}
					/>
				</View> */}
					<FeedbackText feedback={feedback}>{feedback}</FeedbackText>
					<Button onPress={login}>Login</Button>
				</View>
			</Container>
			<Text style={styles.copyright}>
				Copyright {new Date().getFullYear()} &#169; InThisOrder. All
				Rights Reserved.
			</Text>
		</>
	);
};

export default HomeScreen;
