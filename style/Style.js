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
    marginRight: 15,
    marginLeft: 15,
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
  logincontainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logintitle: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  logininput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
  loginbutton: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginbuttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
