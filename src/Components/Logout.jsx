import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const Logout = () => {
    const {logOut} = useContext(AuthContext);
    return (
        <div>
            <button className="ml-2" onClick={logOut}>Logout</button>
        </div>
    );
};

export default Logout;