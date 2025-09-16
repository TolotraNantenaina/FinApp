import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export const RenderToast = ({ title, message, status }: { title: string; message: string; status?: 'success'|'danger'|'warning'|'info' }) => {
  const iconName =
    status === 'success' ? 'check-circle' :
    status === 'danger'  ? 'error' :
    status === 'warning' ? 'warning' :
    'info';

  const color =
    status === 'success' ? '#10B981' :
    status === 'danger'  ? '#EF4444' :
    status === 'warning' ? '#F59E0B' :
    '#3B82F6';

  // Couleurs plus claires pour le fond et l'icône
  const lightColors = {
    success: '#6EE7B7',   // vert clair
    danger:  '#FCA5A5',   // rouge clair
    warning: '#FDE68A',   // jaune clair
    info:    '#93C5FD',   // bleu clair
  };

  const lightBgColor =
    status === 'success' ? lightColors.success :
    status === 'danger'  ? lightColors.danger :
    status === 'warning' ? lightColors.warning :
    lightColors.info;

  const lightIconColor =
    status === 'success' ? '#059669' :   // vert un peu plus doux
    status === 'danger'  ? '#DC2626' :   // rouge un peu plus doux
    status === 'warning' ? '#D97706' :   // jaune/orange doux
    '#2563EB';                          // bleu doux

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: lightBgColor, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, margin: 2 }}>
      <MaterialIcons name={iconName} size={18} color={color} style={{ marginRight: 0 }} />
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{title} : </Text>
      <Text style={{ fontSize: 14 }}>{message}</Text>
    </View>
  );
};