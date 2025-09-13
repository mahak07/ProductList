import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  articleContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  image: { width: 100, height: 100 },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#ddd',
  },
  textContainer: { flex: 1, padding: 10 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  source: { fontSize: 12, color: '#888' },
  date: { fontSize: 10, color: '#aaa' },
  retry: { marginTop: 10, color: 'blue' },
});
export default styles;