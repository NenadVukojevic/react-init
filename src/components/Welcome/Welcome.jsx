import React, { useEffect, useState } from 'react'
import request from '../Util/AxiosWrapper';
import ControlTitle from '../CustomControl/ControlTitle'

const Welcome = () => {
    const [version, setVersion] = useState("");
    useEffect(() => {
        const getVersion = async () => {
            request.request('GET', '/api/v1/campaign/version').then((res) => {
                setVersion(res.data);
                console.log(res.data);
            });
        }
        getVersion();
    }, [])

    return (
        <div className='displayObject'>
            <div>

                <ControlTitle title={`Campaign Manager v ${version}`} />
                <div>
                    payten@2024
                </div>
            </div>
        </div>
    )
}

export default Welcome