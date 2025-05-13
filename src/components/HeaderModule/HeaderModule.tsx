import { Button, Text, View } from "react-native";
import ButtonIcon from "../IconButton/ButtonIcon";

interface Props {
    title: string;
    onPressStart?: () => void;
    onPressEnd?: () => void;
    iconStart?: string;
    iconEnd?: string;
}

export default function HeaderModule({ title, onPressStart, onPressEnd, iconStart = 'plus', iconEnd = 'right' }: Props) {
  return (
    <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {
                onPressStart &&
                <ButtonIcon icon={iconStart} onPress={onPressStart}/>
              }
                <Text style={{fontSize:24, fontFamily: 'PoppinsSemiBold'}}> {title}</Text> 
            </View>
            {
                onPressEnd &&
                <ButtonIcon icon={iconEnd} onPress={onPressEnd}/>
            }
        </View>
      <View>

      </View>
    </View>
  );
}
