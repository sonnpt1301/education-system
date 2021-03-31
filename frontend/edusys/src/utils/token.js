import { useHistory } from 'react-router-dom';

export const getToken = () => {
    const token = localStorage.getItem('jwt');

    if (!token) {
        const history = useHistory();
        history.push('/login');
    }

    return token;
};
