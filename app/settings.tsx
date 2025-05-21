import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Switch, TextInput, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useAppStore } from '@/store/appStore';
import {
  User,
  Bell,
  CreditCard,
  HelpCircle,
  ChevronRight,
  LogOut,
  Moon,
  ChevronLeft
} from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import '../i18n';
import { CurrencySelector } from '@/components/CurrencySelector';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ThemeSelector, getCurrentTheme } from '@/components/ThemeSelector';
import { useTheme } from '@/store/themeStore';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';


export default function SettingsScreen() {
  const { t } = useTranslation();

  const { colors, isDark } = useTheme();
  const { setInitialBalance, initialBalance } = useAppStore();
  const { mode, setMode, currentTheme }  = getCurrentTheme();

  const [balanceText, setBalanceText] = useState(initialBalance.toString());

  const [isDarkMode, setIsDarkMode] = useState(false);

  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  
  const handleBalanceChange = () => {
    const newBalance = parseFloat(balanceText);
    if (!isNaN(newBalance)) {
      setInitialBalance(newBalance);
      Alert.alert('Success', 'Initial balance updated successfully');
    } else {
      Alert.alert('Error', 'Please enter a valid number');
    }
  };
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  const toggleNotifications = () => {
    setIsNotificationsEnabled(!isNotificationsEnabled);
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={25} fontWeight='700' color={ colors.button.textSecondary } />
        </Pressable>
        <Text style={[styles.titleText, { color: colors.titleText }]}>{t('setting.settings')}</Text>
      </View>

      <ScrollView>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.sectionTitle }]}>{t('setting.account')}</Text>
          
          <Pressable style={[styles.settingItem, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
            <View style={[styles.settingIconContainer, { backgroundColor: colors.background, borderColor: colors.border }]}>
              <User size={20} color={colors.text} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: colors.sectionTitle }]}>{t('setting.profile')}</Text>
              <Text style={[styles.settingDescription, { color: colors.settingDescription }]}>{t('setting.profiledesc')}</Text>
            </View>
            <ChevronRight size={20} color={ colors.button.textSecondary } />
          </Pressable>
          
          <Pressable style={[styles.settingItem, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
            <View style={[styles.settingIconContainer, , { backgroundColor: colors.background, borderColor: colors.border }]}>
              <CreditCard size={20} color={colors.text} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: colors.sectionTitle }]}>{t('setting.theme')}</Text>
              <Text style={[styles.settingDescription, { color: colors.settingDescription }]}>{t('setting.themedesc')}</Text>
            </View>
            <ChevronRight size={20} color={ colors.button.textSecondary } />
          </Pressable>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.sectionTitle }]}>{t('setting.preferences')}</Text>
          
          <View style={[styles.settingItem, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
            <View style={[styles.settingIconContainer, { backgroundColor: colors.background, borderColor: colors.border }]}>
            <Ionicons
              name={currentTheme.icon}
              size={20}
              color={colors.text}
            />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: colors.sectionTitle }]}>{t('setting.theme')}</Text>
              <Text style={[styles.settingDescription, { color: colors.settingDescription }]}>{t('setting.themedesc')}</Text>
            </View>
            <View style={{zIndex: 1002}}>
              <ThemeSelector />
            </View>
          </View>
          
          {/* <View style={[styles.settingItem, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
            <View style={[styles.settingIconContainer, { backgroundColor: colors.background, borderColor: colors.border }]}>
              <Bell size={20} color={colors.text} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>Notifications</Text>
              <Text style={[styles.settingDescription, { color: colors.text }]}>Enable push notifications</Text>
            </View>
            <Switch
              value={isNotificationsEnabled}
              onValueChange={toggleNotifications}
              trackColor={{ false: '#e5e5e5', true: '#6366f1' }}
              thumbColor={'#fff'}
            />
          </View> */}

          <View style={[styles.settingItem, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
            <View style={[styles.settingIconContainer, { backgroundColor: colors.background, borderColor: colors.border }]}>
              <Ionicons name="language-outline" size={20} color={colors.text} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: colors.sectionTitle }]}>{t('setting.language')}</Text>
              <Text style={[styles.settingDescription, { color: colors.settingDescription }]}>{t('setting.languagedesc')}</Text>
            </View>
            <View style={{zIndex: 1001}}>
              <LanguageSelector/>
            </View>
          </View>

          <View style={[styles.settingItem, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
            <View style={[styles.settingIconContainer, { backgroundColor: colors.background, borderColor: colors.border }]}>
              <Ionicons name="cash-outline" size={20} color={colors.text} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: colors.sectionTitle }]}>{t('setting.currency')}</Text>
              <Text style={[styles.settingDescription, { color: colors.settingDescription }]}>{t('setting.currencydesc')}</Text>
            </View>
            <View style={{zIndex: 1000}}  >
              <CurrencySelector/>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.sectionTitle }]}>{t('setting.financial')}</Text>
          
          <View style={[styles.settingItem, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
            <View style={[styles.settingIconContainer, { backgroundColor: colors.background, borderColor: colors.border }]}>
              <CreditCard size={20} color={colors.text} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: colors.sectionTitle }]}>{t('setting.init')}</Text>
              <View style={styles.balanceInputContainer}>
                <TextInput
                  style={[styles.balanceInput, { borderColor: colors.border, color: colors.input.text }]}
                  value={balanceText}
                  onChangeText={setBalanceText}
                  keyboardType="numeric"
                  placeholder="0.00"
                />
                <Pressable 
                  style={[styles.updateButton, { backgroundColor: colors.primary }]}
                  onPress={handleBalanceChange}
                >
                  <Text style={[styles.updateButtonText]}>{t('setting.update')}</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.sectionTitle }]}>{t('setting.support')}</Text>
          
          <Pressable style={[styles.settingItem, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
            <View style={[styles.settingIconContainer, { backgroundColor: colors.background, borderColor: colors.border }]}>
              <HelpCircle size={20} color={colors.text} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: colors.sectionTitle }]}>{t('setting.help')}</Text>
              <Text style={[styles.settingDescription, { color: colors.settingDescription }]}>{t('setting.helpdesc')}</Text>
            </View>
            <ChevronRight size={20} color="#a3a3a3" />
          </Pressable>
        </View>
        
        <Pressable style={[styles.logoutButton, {backgroundColor : colors.error}]}>
          <LogOut size={20} color="#dc2626" />
          <Text style={[styles.logoutText, { color: colors.button.text }]}>{t('setting.log-out')}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    fontWeight: '700',
    // marginBottom: 8,
    textAlign:'center',
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#525252',
    marginLeft: 16,
    marginBottom: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  settingIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#262626',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#737373',
  },
  balanceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  balanceInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  updateButtonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 20,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#dc2626',
  },
  settingLabel: {
    fontSize: 16,
  },
  backButton: {
    marginRight: -25,
    width: 25,
    zIndex: 1000
  },
});