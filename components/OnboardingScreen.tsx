import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import { useTheme } from '@/store/themeStore';
import { useAppStore } from '@/store/appStore';
import { useTranslation } from 'react-i18next';
import { User } from '@/types';
import { useNavigation } from 'expo-router';
import { CurrencySelector } from './CurrencySelector';
import { LanguageSelector } from './LanguageSelector';
import { ThemeSelector } from './ThemeSelector';

export function OnboardingScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { setUser, setInitialBalance } = useAppStore();
  const navigation: any = useNavigation();

  const [username, setUsername] = useState('');
  const [initialBalance, setInitialBalanceInput] = useState('');

  const handleSubmit = () => {
    if (!username.trim()) {
      Alert.alert(t('onboarding.error'), t('onboarding.usernameRequired'));
      return;
    }

    const balance = parseFloat(initialBalance);
    if (isNaN(balance)) {
      Alert.alert(t('onboarding.error'), t('onboarding.validBalance'));
      return;
    }

    const newUser: User = {
      id: '', // L'ID sera généré dans le store
      name: username.trim(),
      email: '', // Optionnel pour l'instant
      initialBalance: balance
    };

    setUser(newUser);
    setInitialBalance(balance);
    let dir = '/(tabs)/index';
    navigation.navigate(dir);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.title, { color: colors.titleText }]}>
          {t('onboarding.welcome')}
        </Text>
        
        <View style={styles.form}>
          <Text style={[styles.label, { color: colors.text }]}>
            {t('onboarding.username')}
          </Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: colors.input.background,
              borderColor: colors.input.border,
              color: colors.input.text
            }]}
            value={username}
            onChangeText={setUsername}
            placeholder={t('onboarding.usernamePlaceholder')}
            placeholderTextColor={colors.input.placeholder}
          />
          
          <View style={[{ backgroundColor: colors.card, borderBottomColor: colors.border }]}>
            <Text style={[styles.label, { color: colors.text }]}>
                {t('setting.language')}
            </Text>
            <View style={[{zIndex: 1002}, styles.rigth]}>
              <LanguageSelector/>
            </View>
          </View>

          <Text style={[styles.label, { color: colors.text }]}>
            {t('onboarding.initialBalance')}
          </Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: colors.input.background,
              borderColor: colors.input.border,
              color: colors.input.text
            }]}
            value={initialBalance}
            onChangeText={(text) => {
                // On autorise uniquement les chiffres et le point
                const numericText = text.replace(/[^0-9.]/g, '');
                setInitialBalanceInput(numericText);
            }}
            placeholder="0.00"
                // placeholder={t('onboarding.balancePlaceholder')}
            placeholderTextColor={colors.input.placeholder}
            keyboardType="default"
          />

          <View style={[{ backgroundColor: colors.card, borderBottomColor: colors.border }]}>
            <Text style={[styles.label, { color: colors.text }]}>
                {t('setting.currency')}
            </Text>
            <View style={[{zIndex: 1001,}, styles.rigth]}>
              <CurrencySelector/>
            </View>
          </View>

          <View style={[{ backgroundColor: colors.card, borderBottomColor: colors.border }]}>
            <Text style={[styles.label, { color: colors.text }]}>
                {t('setting.theme')}
            </Text>
            <View style={[{zIndex: 1000, marginLeft: 266}, styles.rigth]}>
                <ThemeSelector/>
            </View>
          </View>

          <Pressable
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={handleSubmit}
          >
            <Text style={[styles.buttonText, { color: colors.button.text }]}>
              {t('onboarding.start')}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    padding: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  button: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  rigth: {
    width: 94,
    marginLeft: 270,
    marginTop: -35
  },
}); 