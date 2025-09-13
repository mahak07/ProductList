import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  temp: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  condition: {
    fontSize: 24,
    marginTop: 10,
    textTransform: 'capitalize'
  },
  humidity: {
    fontSize: 18,
    marginTop: 5,
  },
  error: {
    color: 'red',
    padding: 20,
    fontSize: 18,
    textAlign: 'center'
  }
});
export default styles;