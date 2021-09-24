import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import colors from '../../GlobalStyles';

const styles = StyleSheet.create({
	InputText: {
		marginBottom: 16,
	},
	label: {
		color: colors.white,
		marginBottom: 8,
	},
	input: {
		paddingVertical: 24,
		paddingHorizontal: 8,
		alignContent: 'center',
		textAlign: 'center',
		borderRadius: 8,
		backgroundColor: colors['primary-bright'],
		color: colors.primary,
		marginBottom: 24,
		fontSize: 24,
		width: '100%',
	},
});

const InputText = ({ label, placeholder, ...rest }) => {
	return (
		<View style={`${styles.InputText}`}>
			<Text style={styles.label}>{label}</Text>
			<TextInput
				style={styles.input}
				placeholder={`ie: ${placeholder || ''}`}
				keyboardAppearance="dark"
				showSoftInputOnFocus
				textContentType="name"
				{...rest}
			/>
		</View>
	);
};

export default InputText;
