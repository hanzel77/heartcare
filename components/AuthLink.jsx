import {Link} from 'expo-router';
import {StyleSheet} from 'react-native';

export default function AuthLink({ href, children, ...props }) {
    return (
        <Link style={styles.link} href={href} {...props}>
            {children}
        </Link>
    );
}
const styles = StyleSheet.create({
    link: {
        marginTop: 10,
        color: 'red',
        textAlign: 'center',
    },
})