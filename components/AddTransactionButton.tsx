import * as React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Plus } from 'lucide-react-native';

interface AddTransactionButtonProps {
  onPress: () => void;
}

export const AddTransactionButton = ({ onPress }: AddTransactionButtonProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Plus color="#fff" size={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    zIndex: 999,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});