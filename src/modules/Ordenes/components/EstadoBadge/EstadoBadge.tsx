
import { View, Text } from 'react-native';
import { ESTADOS } from '../../../../interfaces/Estados';

interface EstadoBadgeProps {
  estadoId?: number;
  fontSize?: number;
}

export const EstadoBadge = ({ estadoId = 1, fontSize = 12 }: EstadoBadgeProps) => {
  const estado = ESTADOS.find((e:any) => e.id === estadoId);
  if (!estado) return null;
  return (
    <View style={{ backgroundColor: estado.color, borderRadius:4, paddingHorizontal:15 }} >
        <Text style={{ color: '#fff', padding: 2, borderRadius: 4, fontFamily: 'PoppinsLight', fontSize  }}>
          {estado.nombre}
        </Text>
    </View>
  );
};
