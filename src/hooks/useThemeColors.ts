import useColorScheme from '../hooks/useColorScheme';
import { colors as themeColors } from '../themes/colors';

const useThemeColors = () => {
    const colorScheme = useColorScheme();
    const colors = themeColors[colorScheme];

    return colors;
};

export default useThemeColors;
