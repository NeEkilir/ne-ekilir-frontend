import { useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

interface PlantingDetailModalInterface {
  show: any;
  onClose: any;
  data: any;
}
export const PlantingDetailModal = (props: PlantingDetailModalInterface) => {
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
          <Text style={{ fontSize: 16, marginBottom: 5 }}>
            {props.data?.productId?.productNameTr +
              ' (' +
              (props?.data?.aliasName ? props?.data?.aliasName : '--') +
              ')'}
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
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
