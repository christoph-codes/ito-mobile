import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import colors from '../../GlobalStyles';
import Container from '../../components/Container';
import H1 from '../../components/H1';
import InputText from '../../components/InputText';
import FeedbackText from '../../components/FeedbackText';
import Button from '../../components/Button';
import Logo from '../../components/Logo';

const styles = StyleSheet.create({
	ChildLogin: {
		backgroundColor: 'green',
	},
});

const ChildLogin = ({ parentData }) => {
	const [childName, setChildName] = useState('');
	const [childPin, setChildPin] = useState('');
	const [feedback, setFeedback] = useState('');
	const [children, setChildren] = useState([]);

	useEffect(() => {
		if (parentData?.email) {
			const kids = firestore
				.collection('users')
				.doc(parentData.email)
				.collection('kids');

			// kids.get()
			// 	.then((snapshot) => {
			// 		setChildren(
			// 			snapshot.docs.map((doc) => {
			// 				const kid = doc.data();
			// 				kid.id = doc.id;
			// 				return kid;
			// 			})
			// 		);
			// 	})
			// 	.catch((err) => {
			// 		setFeedback(err);
			// 	});
		} else {
			navigator.navigate('Login');
		}

		console.log();
	}, []);

	const login = () => {
		if (childName && childPin) {
			setFeedback('');
		} else {
			setFeedback('You must select a name and enter a pin');
		}
		console.log('Logging child in');
	};
	return (
		<Container bgColor={colors.secondary} style={styles.ChildLogin}>
			<View>
				<View style={styles.container}>
					<Logo />
					<H1>Child Login</H1>
					<InputText
						label="Name"
						autoCompleteType="name"
						placeholder="Please Choose"
						onChangeText={setChildName}
						value={childName}
					/>
					<Picker
						selectedValue={childName}
						onValueChange={(itemValue) => setChildName(itemValue)}
					>
						{children.map((child, index) => {
							return (
								<Picker.Item
									key={index}
									label={child.name}
									value={child.name}
								/>
							);
						})}
						<Picker.Item label="Java" value="java" />
						<Picker.Item label="JavaScript" value="js" />
					</Picker>
					<InputText
						label="Password"
						autoCompleteType="password"
						placeholder="••••••••"
						secureTextEntry
						onChangeText={setChildPin}
						value={childPin}
					/>
					<FeedbackText feedback={feedback}>{feedback}</FeedbackText>
					<Button variant="primary" onPress={login}>
						Login
					</Button>
				</View>
			</View>
		</Container>
	);
};

export default ChildLogin;
