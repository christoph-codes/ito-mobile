import React from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

const styles = StyleSheet.create({
	Spinner: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

const Spinner = () => {
	const spinValue = new Animated.Value(0);

	// First set up animation
	Animated.timing(spinValue, {
		toValue: 1,
		duration: 3000,
		easing: Easing.linear, // Easing is an additional import from react-native
		useNativeDriver: true, // To make use of native driver for performance
	}).start();

	// Next, interpolate beginning and end values (in this case 0 and 1)
	const spin = spinValue.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '360deg'],
	});

	return (
		<View className={styles.Spinner}>
			<Animated.Image
				style={{ transform: [{ rotate: spin }] }}
				source={require('../../assets/bird-stroke.svg')}
			/>
		</View>
	);
};

export default Spinner;
