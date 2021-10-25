import React from 'react';
import {
	View,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	StyleSheet,
	Platform,
	Keyboard,
	Text,
} from 'react-native';
import colors from '../../GlobalStyles';

const styles = StyleSheet.create({
	Container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	inner: {
		alignSelf: 'center',
		justifyContent: 'center',
		alignContent: 'center',
	},
	container: {
		alignSelf: 'center',
		justifyContent: 'center',
		alignContent: 'center',
		width: 300,
		flex: 1,
	},
	copyright: {
		backgroundColor: colors.primary,
		textAlign: 'center',
		paddingBottom: 32,
		justifyContent: 'flex-end',
		color: colors['primary-light'],
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
					<View style={styles.container}>
						<View>{children}</View>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
			<Text style={styles.copyright}>
				Copyright {new Date().getFullYear()} &#169; InThisOrder. All
				Rights Reserved.
			</Text>
		</>
	);
};

export default Container;
