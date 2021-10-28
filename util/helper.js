import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
	try {
		const jsonValue = JSON.stringify(value);
		await AsyncStorage.setItem(key, jsonValue);
	} catch (e) {
		// saving error
	}
};

export const getData = async (key) => {
	try {
		const jsonValue = await AsyncStorage.getItem(key);
		return jsonValue != null ? JSON.parse(jsonValue) : null;
	} catch (e) {
		// error reading value
		console.log('error:', e);
	}
	return null;
};

export const clearData = async (key) => {
	try {
		await AsyncStorage.removeItem(key);
	} catch (e) {
		// error reading value
		console.log('error:', e);
	}
};
