import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

const languages = [
  { code: 'fr', name: 'Français', acronym: 'Fr', flag: '🇫🇷' },
  { code: 'en', name: 'English', acronym: 'En', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', acronym: 'De', flag: '🇩🇪' },
  { code: 'es', name: 'Español', acronym: 'Es', flag: '🇪🇸' },
  { code: 'mg', name: 'Malagasy', acronym: 'Mg', flag: '🇲🇬' },
];

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.buttonText}>
          {currentLanguage.flag} {currentLanguage.acronym}
        </Text>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#000"
        />
      </Pressable>

      {isOpen && (
        <View style={styles.dropdown}>
          {languages.map((lang) => (
            <Pressable
              key={lang.code}
              style={[
                styles.option,
                i18n.language === lang.code && styles.selectedOption
              ]}
              onPress={() => {
                i18n.changeLanguage(lang.code);
                setIsOpen(false);
              }}
            >
              <Text style={styles.optionText}>
                {lang.flag} {lang.acronym}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1000,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    // borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10.84,
    elevation: 5,
  },
  buttonText: {
    marginRight: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 5,
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedOption: {
    backgroundColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 14,
  },
}); 