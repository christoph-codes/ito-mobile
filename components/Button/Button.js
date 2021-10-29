import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../GlobalStyles';

const styles = StyleSheet.create({
	Button: {
		paddingVertical: 24,
		paddingHorizontal: 16,
		textAlign: 'center',
		backgroundColor: colors.secondary,
		borderRadius: 8,
	},
	ButtonText: {
		color: colors.white,
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
	},
});

const Button = ({ children, variant = 'secondary', ...rest }) => {
	return (
		<TouchableOpacity
			style={{ ...styles.Button, backgroundColor: colors[variant] }}
			{...rest}
		>
			<Text style={styles.ButtonText}>{children}</Text>
		</TouchableOpacity>
	);
};

export default Button;
