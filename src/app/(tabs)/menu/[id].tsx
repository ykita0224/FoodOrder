import {View, Text, StyleSheet} from 'react-native';
import Colors from '@/src/constants/Colors';
import { Stack, useLocalSearchParams } from 'expo-router';

const ProductDetailsScreen = () => {
    const {id} = useLocalSearchParams();
    return (
        <View>
            <Stack.Screen options={{title: 'Details: ' + id}}/>
            <Text style={styles.title}>ProductDetailsScreen: {id}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: Colors.light.tint,
    }
  });

export default ProductDetailsScreen;