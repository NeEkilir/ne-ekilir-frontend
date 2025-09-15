import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { clearTokens } from '../../utils/SecureStorage';
import { useUser } from '../../utils/UserContext';

interface LogoutModalInterface {
  show: any;
  onClose: any;
}
export const LogoutModal = (props: LogoutModalInterface) => {
  const { setIsLogin } = useUser();

  const onSave = () => {
    clearTokens();
    setIsLogin(false);
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
            width: '85%',
          }}
        >
          <Text style={{ fontSize: 16, marginBottom: 5 }}>
            Çıkış yapmak istediğinize emin misiniz?
          </Text>
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
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Hayır</Text>
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
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Evet</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
