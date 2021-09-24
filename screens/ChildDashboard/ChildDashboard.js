import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	ChildDashboard: {
		flex: 1,
		alignContent: 'center',
	},
});

const ChildDashboard = () => {
	return (
		<View style={styles.ChildDashboard}>
			<Text>ChildDashboard</Text>
		</View>
	);
};

export default ChildDashboard;
