import { useState } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { tAxios } from '../../call_config';
import { RestManagerApiList } from '../../call_config/api-list/RestManagerApiList';

interface AddCommentModalInterface {
  show: any;
  onClose: any;
  productId: any;
  getCommentList: any;
}

export const AddCommentModal = (props: AddCommentModalInterface) => {
  const [description, setDescriprion] = useState<any>('');
  const [header, setHeader] = useState<any>('');

  const userId = 2;

  const onSave = () => {
    tAxios
      .call({
        api: RestManagerApiList.SAVE_COMMENT,
        body: {
          userId: userId,
          productId: props?.productId,
          commentHeader: header,
          commentDetail: description,
        },
      })
      .then((res: any) => {
        props?.onClose();
        props?.getCommentList(props?.productId);
      });
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
          <TextInput
            placeholder="Başlık giriniz.."
            value={header}
            onChangeText={setHeader}
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
            placeholder="Bilgi giriniz.."
            multiline
            value={description}
            onChangeText={setDescriprion}
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

            <TouchableOpacity
              style={{
                backgroundColor:
                  description?.trim() === '' || header?.trim() === ''
                    ? '#A5D6A7'
                    : '#4CAF50',
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 6,
              }}
              disabled={!description || !header}
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
