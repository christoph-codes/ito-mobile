import React from 'react';
import { StyleSheet, Image } from 'react-native';
import logoLight from '../../assets/ito_logo_light.png';
import logoWhite from '../../assets/ito_logo_white.png';
import logoPrimary from '../../assets/ito_logo_primary.png';

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

const Logo = ({ variant }) => {
	const getVariant = () => {
		switch (variant) {
			case 'light':
				return logoLight;
			case 'white':
				return logoWhite;
			default:
				return logoPrimary;
		}
	};
	return <Image style={styles.Logo} source={getVariant()} />;
};

export default Logo;
