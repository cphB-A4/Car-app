// MyComponent.tsx

import React from 'react';
import { View } from 'react-native';
import SmallText from './Texts/SmallText';

interface CarDetailsProps {
    property: string;
    value: string | number | null;
}

const CarDetails: React.FC<CarDetailsProps> = ({ property, value }) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
                <SmallText textStyles={{ fontWeight: '600' }}>
                    {property}
                </SmallText>
            </View>
            <View style={{ flex: 1 }}>
                <SmallText textStyles={{ fontWeight: '400' }}>
                    {value}
                </SmallText>
            </View>
        </View>
    );
};
export default CarDetails;
