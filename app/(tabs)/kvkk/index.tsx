import { Link, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, FlatList, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { KVKK_API_URL } from "../../../env";


interface KvkkModel {
  agreementTypeId: number;
  permission: boolean;
  isActive: boolean;
  isDeleted: boolean;
  permissionValue: string;
  createDate: Date;
  modifiedDate: Date;
}


const Kvkk = () => {

  const [searchText, setSearchText] = useState('');
  const [kvkk, setPerson] = useState<KvkkModel | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    if (searchText.length < 3) {
      Alert.alert('Uyarı', 'Arama metni en az 3 karakter olmalıdır.');
      return;
    }

    let url = KVKK_API_URL + searchText;
    console.log(url);
    setIsLoading(true);

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      setIsLoading(false);
      if (data.state == 200) {
        console.log(data.data[0]);
        setPerson(data.data);
      }
      else
        console.error(data?.message??'hata oluştu');
      })
      .catch(error => console.error(error));
  };
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
          placeholder="Arama metnini girin"
        />
        <Button title="Ara" onPress={handleSearch} />
      </View>


      {kvkk ? (
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Parameter:</Text>
          <Text style={styles.value}>{kvkk.permissionValue}</Text>

          <Text style={styles.label}>Permission:</Text>
          <Text style={styles.value}>{kvkk.permission ? "Var" : "Yok"}</Text>
          <Text style={styles.label}>Active:</Text>
          <Text style={styles.value}>{kvkk.isActive ? "Aktif" : "Değil"}</Text>
        </View>
      ) : (
        <Text style={styles.emptyText}>Veri bulunamadı</Text>
      )}
    </View>
  );
};

export default Kvkk;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
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
  detailContainer: {
    flex: 1,
    flexDirection: Platform.OS == "web" ? 'row' : 'column',
    justifyContent: Platform.OS == "web" ? 'space-between' : 'flex-start',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  emptyText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
});
