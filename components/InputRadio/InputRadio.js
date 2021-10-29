import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../../GlobalStyles';

const styles = StyleSheet.create({
	InputRadio: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 24,
	},
	radio: {
		height: 48,
		width: 48,
		borderWidth: 4,
		borderColor: colors.white,
		padding: 4,
		borderRadius: 24,
		backgroundColor: colors['primary-bright'],
	},
	radioChecked: {
		height: 48,
		width: 48,
		borderWidth: 4,
		padding: 4,
		borderRadius: 24,
		borderColor: colors.white,
		backgroundColor: colors.secondary,
	},
	label: {
		color: colors.white,
		marginHorizontal: 8,
		fontSize: 24,
	},
});

const InputRadio = ({ label, value, onChange, ...rest }) => {
	return (
		<TouchableOpacity
			style={styles.InputRadio}
			onPress={onChange}
			{...rest}
		>
			<View style={value ? styles.radioChecked : styles.radio} />
			<Text style={styles.label}>{label}</Text>
		</TouchableOpacity>
	);
};

export default InputRadio;
