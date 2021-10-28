import Spinner from '../../components/Spinner';

const styles = StyleSheet.create({
	ChildDashboard: {
		flex: 1,
		alignContent: 'center',
	},
});

const ChildDashboard = () => {
	if (areChildTasksLoading) {
		return <Spinner />;
	}
	return (
		<View style={styles.ChildDashboard}>
			<Text>ChildDashboard</Text>
		</View>
	);
};

export default ChildDashboard;
