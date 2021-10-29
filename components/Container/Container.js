import React from 'react';
import {
	View,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	StyleSheet,
	Platform,
	Keyboard,
} from 'react-native';
import colors from '../../GlobalStyles';

const styles = StyleSheet.create({
	Container: {
		flex: 1,
	},
	inner: {
		flex: 1,
	},
	container: {
		flex: 1,
		margin: 32,
	},
});

const Container = ({ children, bgColor = colors.primary }) => {
	return (
		<>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={{ ...styles.Container, backgroundColor: bgColor }}
			>
				<TouchableWithoutFeedback
					style={styles.inner}
					onPress={Keyboard.dismiss}
				>
					<View style={styles.container}>{children}</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</>
	);
};

export default Container;
