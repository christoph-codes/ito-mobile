import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { UserContext } from '../../providers/UserProvider';
import FeedbackText from '../../components/FeedbackText/FeedbackText';
import InputText from '../../components/InputText';
import Container from '../../components/Container';
import H1 from '../../components/H1';
import Button from '../../components/Button';
import Logo from '../../components/Logo';

const styles = StyleSheet.create({
	ParentLogin: {
		flex: 1,
		backgroundColor: 'green',
	},
	logo: {
		width: 200,
		height: 100,
		resizeMode: 'contain',
		alignSelf: 'center',
		marginBottom: 32,
	},
});

const ParentLogin = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [feedback, setFeedback] = useState('');
	const { signIn, loginFeedback } = useContext(UserContext);

	const login = (e) => {
		e.preventDefault();
		// Check to see if all fields are filled in
		if (email && password) {
			signIn(email, password);
		} else {
			setFeedback('Please confirm all fields are filled in! Thank you.');
		}
	};
	return (
		<Container>
			<View>
				<View style={styles.container}>
					<Logo />
					<H1>Parent Login</H1>
					<InputText
						label="Email"
						autoCompleteType="email"
						placeholder="hello@inthisorder.app"
						onChangeText={setEmail}
						value={email}
					/>
					<InputText
						label="Password"
						autoCompleteType="password"
						placeholder="••••••••"
						secureTextEntry
						onChangeText={setPassword}
						value={password}
					/>
					<FeedbackText feedback={feedback}>{feedback}</FeedbackText>
					<FeedbackText feedback={loginFeedback}>
						{loginFeedback}
					</FeedbackText>
					<Button onPress={login}>Login</Button>
				</View>
			</View>
		</Container>
	);
};

export default ParentLogin;
