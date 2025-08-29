import { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Button,
} from 'react-native';
import { tAxios } from '../../call_config';
import { RestManagerApiList } from '../../call_config/api-list/RestManagerApiList';
import DateTimePicker from '@react-native-community/datetimepicker';

interface AddProfileProductModalInterface {
  show: any;
  onClose: any;
  productId: any;
}

export const AddProfileProductModal = (
  props: AddProfileProductModalInterface,
) => {
  const [date, setDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const userId = 2;

  const onSave = () => {
    tAxios
      .call({
        api: RestManagerApiList.ADD_PROFILE_PRODUCT,
        body: {
          userId: userId,
          productId: props?.productId,
          plantingDate: date.toISOString().split('T')[0],
        },
      })
      .then(() => {
        props?.onClose();
      });
  };

  const onChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    if (selectedDate) {
      setDate(selectedDate);
    }
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
            width: '85%',
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: '#4CAF50',  
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 8,
              alignItems: 'center',
            }}
            onPress={() => setShowPicker(true)}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              Ekim tarihi seçiniz..
            </Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}

          <Text style={{ marginVertical: 10, fontSize: 16 }}>
            Seçilen Tarih: {date.toLocaleDateString()}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: '#F44336',
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 6,
                marginRight: 8,
              }}
              onPress={props.onClose}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Kapat</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: '#4CAF50',
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 6,
              }}
              onPress={onSave}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Kaydet</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
