import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  category: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'brown',
    marginVertical: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 5,
  },
  price: {
    fontSize: 14,
    color: 'green',
  },
});

export default styles;