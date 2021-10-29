import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	LogoTitle: {
		textAlign: 'center',
	},
	logo: {
		width: 120,
		height: 30,
		resizeMode: 'contain',
	},
});

const LogoTitle = () => {
	return (
		<View style={styles.LogoTitle}>
			<Image
				style={styles.logo}
				source={require('../../assets/inthisorder_text_white.png')}
			/>
		</View>
	);
};

export default LogoTitle;
