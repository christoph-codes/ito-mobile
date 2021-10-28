import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Select } from 'native-base';
import { firestore } from '../../config/firebaseConfig';
import { ChildContext } from '../../providers/ChildProvider';
import colors from '../../GlobalStyles';
import Container from '../../components/Container';
import H1 from '../../components/H1';
import InputText from '../../components/InputText';
import FeedbackText from '../../components/FeedbackText';
import Button from '../../components/Button';
import Logo from '../../components/Logo';

const styles = StyleSheet.create({
	centerView: {
		flex: 1,
		justifyContent: 'center',
		width: '100%',
		maxWidth: 400,
		alignSelf: 'center',
	},
	select: {
		backgroundColor: 'rgba(255,255,255,0.1)',
		borderColor: colors.white,
		borderStyle: 'solid',
		borderWidth: 2,
		borderRadius: 8,
		paddingHorizontal: 8,
		paddingVertical: 24,
		color: colors.white,
		fontSize: 24,
		textAlign: 'center',
		marginBottom: 16,
		flexShrink: 1,
		fontWeight: 'bold',
		height: 60,
	},
	pickerStyle: {
		fontSize: 24,
	},
});

const ChildLogin = ({ route, navigation }) => {
	const { setChild } = useContext(ChildContext);
	const [childName, setChildName] = useState('');
	const [childPin, setChildPin] = useState('');
	const [dataPin, setDataPin] = useState('');
	const [feedback, setFeedback] = useState('');
	const [children, setChildren] = useState([]);

	const parent = route.params;

	useEffect(() => {
		if (parent?.email) {
			console.log('got the parent email');
			const kids = firestore
				.collection('users')
				.doc(parent.email)
				.collection('kids');

			kids.get()
				.then((snapshot) => {
					setChildren(
						snapshot.docs.map((doc) => {
							const kid = doc.data();
							kid.id = doc.id;
							return kid;
						})
					);
				})
				.catch((err) => {
					setFeedback(err);
				});
		} else {
			// navigation.navigate('Login');
			console.log('Not ready to login');
		}
	}, []);

	useEffect(() => {
		if (childName) {
			const selectedChild = children.filter((theChild) => {
				return theChild.name === childName;
			});
			setDataPin(selectedChild[0].pin);
		}
	}, [childName, children]);

	const login = () => {
		if (childName && childPin) {
			if (childPin === dataPin) {
				setChild((prev) => ({
					...prev,
					name: childName,
					parentemail: parent.email,
					parentid: parent.authid,
					loggedInStatus: true,
				}));
				navigation.navigate('ChildDashboard');
			} else {
				setFeedback('You have entered the wrong pin number');
			}
		} else {
			setFeedback('All fields must be filled out');
		}
		if (childName && childPin) {
			setFeedback('');
		} else {
			setFeedback('You must select a name and enter a pin');
		}
		console.log('Logging child in');
	};
	return (
		<Container bgColor={colors.secondary} style={styles.ChildLogin}>
			<View style={styles.centerView}>
				<View style={styles.container}>
					<Logo variant="white" />
					<H1>Child Login</H1>
					<Text style={{ color: colors.white, marginBottom: 8 }}>
						Child Name
					</Text>
					<Select
						variant="unstyled"
						itemStyle={styles.itemStyle}
						style={styles.select}
						accessibilityLabel="Find Child Name"
						placeholder="Find Your Name"
						placeholderTextColor={colors['secondary-bright']}
						selectedValue={childName}
						onValueChange={(itemValue) => setChildName(itemValue)}
						dropdownIcon
					>
						{children.map((child, index) => {
							return (
								<Select.Item
									style={styles.pickerStyle}
									color={colors.white}
									key={index}
									label={child.name}
									value={child.name}
								/>
							);
						})}
					</Select>
					<InputText
						label="Child Pin"
						pattern="^[0-9]*$"
						placeholder="Your 4 digit pin"
						onChangeText={setChildPin}
						value={childPin.replace(/[^0-9]/g, '')}
						maxLength={4}
						keyboardType="number-pad"
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
