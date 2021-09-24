import React from 'react';
import { StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
	Logo: {
		width: 200,
		height: 100,
		resizeMode: 'contain',
		alignSelf: 'center',
		marginBottom: 32,
		marginTop: 32,
	},
});

const Logo = () => {
	return (
		<Image
			style={styles.Logo}
			source={require('../../assets/ito_logo_light.png')}
		/>
	);
};

export default Logo;
