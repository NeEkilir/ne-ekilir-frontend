import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import { tAxios } from '../../call_config';
import { RestManagerApiList } from '../../call_config/api-list/RestManagerApiList';
import { useState } from 'react';
import { RootStackParamList } from '../../AppNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

interface SearchProductModalInterface {
  show: any;
  onClose: any;
}
export const SearchProductModal = (props: SearchProductModalInterface) => {
  const [query, setQuery] = useState<any>();
  const [filteredData, setFilteredData] = useState<any>([]);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleSearch = (text: any) => {
    setQuery(text);
    if (text.length > 1) {
      tAxios
        .call({
          api: RestManagerApiList.SEARCH_PRODUCT,
          pathVariable: { productName: text },
        })
        .then((res: any) => {
          setFilteredData(res);
        });
    } else {
      setFilteredData([]);
    }
  };

  const handleSelect = (item: any) => {
    setQuery(item);
    setFilteredData([]);
    navigation.navigate('Ürün', { productId: item.id });
    props?.onClose();
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props?.show}
      onRequestClose={props?.onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            width: '90%',
          }}
        >
          <View style={{ display: 'flex', justifyContent: 'center'  }}>
            <Text style={{ fontSize: 16, textAlign: 'center' }}>
              İstediğiniz sebzeyi veya meyveyi arayabilirsiniz..
            </Text>
          </View>
          <View style={{ paddingTop: 10, paddingBottom: 10 }}>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                padding: 10,
                borderRadius: 8,
                marginBottom: 1,
              }}
              placeholder="Bir ürün giriniz"
              value={query?.productNameTr ? query?.productNameTr : query || ''}
              onChangeText={handleSearch}
            />

            {filteredData.length > 0 && (
              <FlatList
                data={filteredData}
                keyExtractor={(item: any, index: any) => index.toString()}
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 8,
                  maxHeight: 150,
                }}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSelect(item)}
                    style={{ padding: 10 }}
                  >
                    <Text>{item?.productNameTr}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              gap: 10,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: '#F44336',
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 6,
              }}
              onPress={props.onClose}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
