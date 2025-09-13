import { View, Text, Image } from "react-native";
import styles from "../styles/styleProduct";
import { Product } from "../interfaces/product";
import { capitalize } from "../utils/utility";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <Text style={styles.category}>{capitalize(product.category)}</Text>
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

export default ProductCard;