import { useHistory } from 'react-router-dom';

export const getToken = () => {
    const token = localStorage.getItem('jwt');

    if (!token) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const history = useHistory();
        history.push('/login');
    }

    return token;
};
