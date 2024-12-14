import React, { useState } from 'react'
import request from '../Util/AxiosWrapper';
import OffersForm from './OffersForm'
import { formatDate } from '../Util/util'
import OffersList from './OffersList';
import { OffersDictionary } from '../CustomControl/TableDictionary';

const Offers = () => {
    const today = new Date()
    const tomorrow = new Date(today)

    tomorrow.setDate(tomorrow.getDate() + 1)

    const [offers, setOffers] = useState([]);
    const [search, setSearch] = useState({
        "campaignId": 0,
        "start": formatDate(today),
        "end": formatDate(tomorrow)
    });

    const onSearch = () => {
        console.log(search);
        request.request('POST', '/api/v1/report/', search).then((res) => {
            setOffers(res.data);
            console.log(res.data);
        });

    }
    return (
        <div className='displayObject'>

            <div>

                <OffersForm
                    search={search}
                    setSearch={setSearch}
                />
                <div className='formActionBar'>
                    <button onClick={onSearch}>Search</button>
                </div>

                <div className='formControl'>
                    <OffersList Dictionary={OffersDictionary} objects={offers} />
                </div>
            </div>

        </div>
    )
}

export default Offers