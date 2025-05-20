import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, ThemeMode } from '@/store/themeStore';

const themes = [
  { mode: 'light' as ThemeMode, name: 'Light', icon: 'sunny-outline' as const },
  { mode: 'dark' as ThemeMode, name: 'Dark', icon: 'moon-outline' as const },
  { mode: 'system' as ThemeMode, name: 'System', icon: 'phone-portrait-outline' as const },
];

export function getCurrentTheme() {
  const { mode, setMode, colors } = useTheme();
  const currentTheme = themes.find(t => t.mode === mode) || themes[0];
  return { mode, setMode, colors, currentTheme };
}

export function ThemeSelector() {
  const { mode, setMode, colors, currentTheme } = getCurrentTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.card }]}
        onPress={() => setIsOpen(true)}
      >
        <Ionicons
          name={currentTheme.icon}
          size={20}
          color={colors.text}
        />
        <Text style={[styles.buttonText, { color: colors.text }]}>
          {currentTheme.name}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable 
          style={[styles.modalOverlay, { backgroundColor: colors.modal.overlay }]}
          onPress={() => setIsOpen(false)}
        >
          <View style={[styles.modalContent, { backgroundColor: colors.modal.background }]}>
            {themes.map((theme) => (
              <TouchableOpacity
                key={theme.mode}
                style={[
                  styles.option,
                  { borderBottomColor: colors.border },
                  mode === theme.mode && { backgroundColor: colors.button.secondary }
                ]}
                onPress={() => {
                  setMode(theme.mode);
                  setIsOpen(false);
                }}
              >
                <Ionicons
                  name={theme.icon}
                  size={20}
                  color={colors.text}
                  style={styles.optionIcon}
                />
                <Text style={[styles.optionText, { color: colors.text }]}>
                  {theme.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    elevation: 5,
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    borderRadius: 8,
    padding: 16,
    width: '80%',
    maxWidth: 300,
    elevation: 5,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  optionIcon: {
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
  },
}); 