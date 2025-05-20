import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, ThemeMode } from '@/store/themeStore';

const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷', acronym: 'FR' },
  { code: 'en', name: 'English', flag: '🇬🇧', acronym: 'EN' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', acronym: 'DE' },
  { code: 'es', name: 'Español', flag: '🇪🇸', acronym: 'ES' },
  { code: 'mg', name: 'Malagasy', flag: '🇲🇬', acronym: 'MG' },
];

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const { mode, setMode, colors } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, { backgroundColor: colors.card }]}
        onPress={() => setIsOpen(true)}
      >
        <Text style={[styles.buttonText, { color: colors.text }]}>
          {currentLanguage.flag} {currentLanguage.acronym}
        </Text>
        <Ionicons
          name="chevron-down"
          size={20}
          color={colors.text}
        />
      </Pressable>

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
            {languages.map((lang) => (
              <Pressable
                key={lang.code}
                style={[
                  styles.option,
                  { borderBottomColor: colors.border },
                  i18n.language === lang.code && { backgroundColor: colors.button.secondary }/*styles.selectedOption*/
                ]}
                onPress={() => {
                  i18n.changeLanguage(lang.code);
                  setIsOpen(false);
                }}
              >
                <Text style={[styles.optionText, { color: colors.text }]}>
                  {lang.flag} {lang.name} ({lang.acronym})
                </Text>
              </Pressable>
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
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    elevation: 5,
  },
  buttonText: {
    marginRight: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    width: '80%',
    maxWidth: 300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  option: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedOption: {
    backgroundColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 16,
  },
}); 