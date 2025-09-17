import { useEffect, useState } from 'react';
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
import { useUser } from '../../utils/UserContext';
import Icon from 'react-native-vector-icons/FontAwesome';

interface AddCommentModalInterface {
  show: any;
  onClose: any;
  productId: any;
  getCommentList: any;
}

export const AddCommentModal = (props: AddCommentModalInterface) => {
  const [description, setDescriprion] = useState<any>('');
  const [header, setHeader] = useState<any>('');
  const { userInfo } = useUser();
  const [rating, setRating] = useState<any>();

  useEffect(() => {
    if (!rating) {
      tAxios
        .call({
          api: RestManagerApiList.GET_RATING,
          pathVariable: { productId: props?.productId, userId: userInfo?.id },
        })
        .then((res: any) => {
          setRating(res || { rating: 0 });
        });
    }
  }, [rating]);

  const ratingCompleted = (tempRate: any) => {
    if (rating?.id) {
      tAxios
        .call({
          api: RestManagerApiList.EDIT_RATING,
          pathVariable: { id: rating?.id },
          body: {
            productId: props?.productId,
            userId: userInfo?.id,
            rate: tempRate,
          },
        })
        .then((res: any) => {
          setRating(res || { rating: 0 });
        });
    } else {
      tAxios
        .call({
          api: RestManagerApiList.SAVE_RATING,
          body: {
            productId: props?.productId,
            userId: userInfo?.id,
            rate: tempRate,
          },
        })
        .then((res: any) => {
          setRating(res || { rating: 0 });
        });
    }
  };

  const onSave = () => {
    tAxios
      .call({
        api: RestManagerApiList.SAVE_COMMENT,
        body: {
          userId: userInfo?.id,
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
          <Text
            style={{
              fontSize: 17,
              textAlign: 'center',
              marginBottom: 15,
            }}
          >
            Yorum Yap
          </Text>
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
              justifyContent: 'center',
              marginTop: 0,
              marginBottom: 20,
            }}
          >
            {[1, 2, 3, 4, 5].map(star => (
              <TouchableOpacity
                key={star}
                onPress={() => ratingCompleted(star)}
              >
                <Icon
                  name={star <= rating?.rating ? 'star' : 'star-o'}
                  size={32}
                  color={star <= rating?.rating ? '#FFD700' : '#ccc'}
                  style={{ marginHorizontal: 4 }}
                />
              </TouchableOpacity>
            ))}
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
