import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../../GlobalStyles';

const styles = StyleSheet.create({
	FeedbackText: {
		color: colors.secondary,
		marginVertical: 16,
		textAlign: 'center',
		fontSize: 16,
	},
});

const FeedbackText = ({ children, feedback }) => {
	if (feedback) {
		return <Text style={styles.FeedbackText}>{children}</Text>;
	}
	return null;
};

export default FeedbackText;
