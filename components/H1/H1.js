import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../../GlobalStyles';

const styles = StyleSheet.create({
	H1: {
		fontSize: 32,
		color: colors.white,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 16,
	},
});

const H1 = ({ children }) => {
	return <Text style={styles.H1}>{children}</Text>;
};

export default H1;
