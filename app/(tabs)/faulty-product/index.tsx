import { Link, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { FAULTY_PRODUCT_API_URL } from "../../../env";

const FaultyProduct = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [resultlist, setResult] = useState<any | null>(null);

  let url = FAULTY_PRODUCT_API_URL + searchText;
  console.log('FAULTY_PRODUCT_API_URL %s', FAULTY_PRODUCT_API_URL);

  const doSearch = () => {
    console.log('doSearch %s', url + searchText);
    setIsLoading(true);
    fetch(url).then(r => r.json()).then(data => {
      setIsLoading(false);
      if (data.state == 200) {
        console.log(data.data[0]);
        setResult(data.data);
      }
      else
        console.error(data?.message);
    }).catch(error => console.error(error));
  }
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.container}>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Telefon numarası yada belge numarası"
        />
        <Button title='Ara' onPress={doSearch} />
      </View>
      <View key='rc1' style={styles.rowCaption}>
        <View key='rcc1' style={styles.columnCaption}>
          <Text>Belge No</Text>
        </View>
        <View key='rcc2' style={styles.columnCaption}>
          <Text>Mağaza</Text>
        </View>
        <View key='rcc3' style={styles.columnCaption}>
          <Text>Karar - 5319281096</Text>
        </View>
      </View>
      {
        resultlist ? (

          resultlist.map((item:any, index:any) => (

            <View key={index + 1000} style={styles.row}>
              <View key={item} style={styles.column}>
                <Text>{item.mgZ_UIB_NO}</Text>
              </View>

              <View key={item + 10} style={styles.column}>
                <Link href={`/faulty-product/${item.mgZ_UIB_NO}`} asChild>
                  <Text>{item.magazA_TANIM}</Text>
                </Link>
              </View>

              <View key={item + 20} style={styles.column}>
                <Text>{item.karaR_TEXT}</Text>
              </View>
            </View>
          ))
        ) :
          <Text style={styles.row}>Veri bulunamadı

          </Text>
      }
    </View>
  );
};

export default FaultyProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    paddingHorizontal: 10,
  },
  rowCaption: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  columnCaption: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  column: {
    flex: 1,
    padding: 1,
    borderWidth: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderColor: '#ccc',

  },

});

/*
const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  textContainer: {
    marginLeft: 16,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
*/