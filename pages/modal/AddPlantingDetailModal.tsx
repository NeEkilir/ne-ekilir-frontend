import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { tAxios } from '../../call_config';
import { RestManagerApiList } from '../../call_config/api-list/RestManagerApiList';
import { useUser } from '../../utils/UserContext';
import DateTimePicker from '@react-native-community/datetimepicker';

interface AddPlantingDetailModalInterface {
  show: any;
  onClose: any;
  userProductId: any;
  header: any;
}

export const AddPlantingDetailModal = (
  props: AddPlantingDetailModalInterface,
) => {
  const [height, setHeight] = useState<any>('');
  const [leafCount, setLeafCount] = useState<any>('');
  const [description, setDescription] = useState<any>('');
  const [detailTime, setDetailTime] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onSave = () => {
    tAxios
      .call({
        api: RestManagerApiList.ADD_PLANTING_DETAIL,
        body: {
          height: height,
          leafCount: leafCount,
          detailTime: detailTime.toISOString().split('T')[0],
          userProductId: props?.userProductId,
          description: description,
        },
      })
      .then((res: any) => {
        props?.onClose();
      });
  };

  const onChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    if (selectedDate) {
      setDetailTime(selectedDate);
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
          <Text>{props?.header}</Text>
          <TextInput
            placeholder="Uzunluk giriniz.."
            value={height}
            onChangeText={setHeight}
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 6,
              padding: 10,
              textAlignVertical: 'top',
              marginBottom: 15,
            }}
          />
          <TextInput
            placeholder="Yaprak sayısı giriniz.."
            multiline
            value={leafCount}
            onChangeText={setLeafCount}
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 6,
              padding: 10,
              height: 60,
              textAlignVertical: 'top',
              marginBottom: 15,
            }}
          />
          <TextInput
            placeholder="Açıklama giriniz.."
            multiline
            value={description}
            onChangeText={setDescription}
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 6,
              padding: 10,
              height: 60,
              textAlignVertical: 'top',
              marginBottom: 15,
            }}
          />
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
              value={detailTime}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}
          <Text
            style={{ marginVertical: 10, fontSize: 16, textAlign: 'center' }}
          >
            Seçilen Tarih: {detailTime.toLocaleDateString()}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              gap: 10,
              marginTop: 15,
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

            <TouchableOpacity
              style={{
                backgroundColor:
                  height?.trim() === '' || leafCount?.trim() === ''
                    ? '#A5D6A7'
                    : '#4CAF50',
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 6,
              }}
              disabled={!height || !leafCount}
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
