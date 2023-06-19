import { Stack, useSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FAULTY_PRODUCT_API_URL } from "../../../env";

const FaultyProductDetails = () => {

  const [isLoading, setIsLoading] = useState(true);
  const { id } = useSearchParams();


  let url = FAULTY_PRODUCT_API_URL +""+id ;
  const [cat, setCat] = useState<any>(null);

  useEffect(() => {
    console.log(url);
    
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setCat(json.data[0]);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Stack.Screen
        options={{
          title: cat.markA_AD,
        }}
      />
      <View>
        <Text style={styles.name}>Name: {cat.markA_AD}</Text>
        <Text style={styles.text}>Origin: {cat.istasyoN_TEXT}</Text>
        <Text style={styles.text}>Temperament: {cat.magazA_TANIM}</Text>
        <Text style={styles.text}>Description: {cat.karaR_TEXT}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    margin: 10,
  },
});

export default FaultyProductDetails;
