import { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { tAxios } from '../../call_config';
import { RestManagerApiList } from '../../call_config/api-list/RestManagerApiList';
import { AddPlantingDetailModal } from './AddPlantingDetailModal';
import { format } from 'date-fns';
import { DeletePlantingDetailModal } from './DeletePlantingDetailModal';
import Icon from 'react-native-vector-icons/FontAwesome';

interface PlantingDetailModalInterface {
  show: any;
  onClose: any;
  data: any;
}
export const PlantingDetailModal = (props: PlantingDetailModalInterface) => {
  const [showAddDetail, setShowAddDetail] = useState<any>();
  const [showDeleteModal, setShowDeleteModal] = useState<any>();
  const [plantingDetailList, setPlantingDetailList] = useState<any>();

  const getDetailList = (id: any) => {
    tAxios
      .call({
        api: RestManagerApiList.PLANTING_DETAIL_LIST,
        pathVariable: { id: id },
      })
      .then((res: any) => {
        setPlantingDetailList(res);
      });
  };

  useEffect(() => {
    if (props?.data?.id) {
      getDetailList(props?.data?.id);
    }
  }, [props?.data]);

  return (
    <>
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
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
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
                  justifyContent: 'flex-start',
                  alignItems: 'flex-end',
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: '#F44336',
                    paddingVertical: 2,
                    paddingHorizontal: 5,
                    borderRadius: 6,
                  }}
                  onPress={props.onClose}
                >
                  <Text style={{ color: 'white', fontSize: 12 }}>X</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{ height: 2, backgroundColor: '#ccc', marginVertical: 5 }}
            />
            <View style={{ maxHeight: 300 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginTop: 0,
                  marginLeft: 0,
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    color: '#6d6d6dff',
                    fontWeight: 'bold',
                  }}
                >
                  Ekim Tarihi:
                </Text>
                <Text style={{ fontSize: 10, color: '#6d6d6dff' }}>
                  {props?.data?.plantingDate &&
                    format(
                      new Date(props?.data?.plantingDate),
                      'dd.MM.yyyy HH:mm',
                    )}
                </Text>
              </View>
              <View
                style={{
                  height: 2,
                  backgroundColor: '#ccc',
                  marginVertical: 5,
                }}
              />
              <FlatList
                data={plantingDetailList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <View
                    key={item?.id}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      backgroundColor: '#fff',
                      borderRadius: 8,
                      padding: 10,
                      marginBottom: 10,
                      margin: 2,
                      shadowColor: '#000',
                      shadowOffset: { width: 2, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 3,
                      elevation: 2,
                    }}
                  >
                    <View style={{ flex: 1, marginRight: 8 }}>
                      <View style={{ marginTop: 5 }}>
                        <View style={{ flexDirection: 'row', gap: 5 }}>
                          <Text style={{ fontSize: 13, color: '#6d6d6dff' }}>
                            Tarih:
                          </Text>
                          <Text style={{ fontSize: 13, fontWeight: 'bold' }}>
                            {item.detailTime &&
                              format(new Date(item.detailTime), 'dd.MM.yyyy')}
                          </Text>
                        </View>
                        {item?.height && (
                          <View style={{ flexDirection: 'row', gap: 5 }}>
                            <Text style={{ fontSize: 13, color: '#6d6d6dff' }}>
                              Uzunluk:
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: 'bold' }}>
                              {item?.height}
                            </Text>
                          </View>
                        )}
                        {item?.leafCount && (
                          <View style={{ flexDirection: 'row', gap: 5 }}>
                            <Text style={{ fontSize: 13, color: '#6d6d6dff' }}>
                              Yaprak Sayısı:
                            </Text>
                            <Text style={{ fontSize: 13, fontWeight: 'bold' }}>
                              {item?.leafCount}
                            </Text>
                          </View>
                        )}
                        {item?.description && (
                          <View>
                            <Text style={{ fontSize: 13, color: '#6d6d6dff' }}>
                              Açıklama:{' '}
                              <Text style={{ fontWeight: 'bold' }}>
                                {item?.description.split('\n')[0]}
                              </Text>
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-end',
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          paddingVertical: 2,
                          paddingHorizontal: 5,
                          borderRadius: 6,
                          borderWidth: 1,
                          borderColor: '#F44336',
                        }}
                        onPress={() => {
                          setShowDeleteModal(item?.id);
                        }}
                      >
                        <Icon name={'trash'} size={15} color="#F44336" />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                gap: 10,
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: '#4CAF50',
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderRadius: 6,
                }}
                onPress={() => {
                  setShowAddDetail(true);
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                  + Durum Ekle
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {showAddDetail && (
        <AddPlantingDetailModal
          show={showAddDetail}
          onClose={() => {
            setShowAddDetail(false);
            getDetailList(props?.data?.id);
          }}
          userProductId={props?.data?.id}
          header={
            props?.data?.productId?.productNameTr +
            ' (' +
            props?.data?.aliasName +
            ')'
          }
        />
      )}
      {showDeleteModal && (
        <DeletePlantingDetailModal
          show={showDeleteModal ? true : false}
          onClose={() => {
            getDetailList(props?.data?.id);
            setShowDeleteModal(null);
          }}
          id={showDeleteModal}
        />
      )}
    </>
  );
};
