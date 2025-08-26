import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingTop: 10,
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2E7D32',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  monthCard: {
    backgroundColor: '#E8F5E9',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 16,
    margin: 8,
    minWidth: '28%',
    alignItems: 'center',
    elevation: 3,
  },
  monthText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B5E20',
  },
  suggestionButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 20,
    marginTop: 25,
    width: '90%',
    alignItems: 'center',
  },
  suggestionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  suggestionCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  suggestionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#388E3C',
  },
  suggestionText2: {
    fontSize: 15,
    color: '#333',
  },
});
