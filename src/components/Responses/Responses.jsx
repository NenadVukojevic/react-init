import React, { useEffect, useState } from 'react'
import request from '../Util/AxiosWrapper';
import { FormState, SortOrder } from '../Util/FormStates';
import { Paginator } from '../CustomControl/Paginator';
import { sortArray } from '../Util/util';
import ListOfResponses from './ListOfResponses';
import { boolDomain, ResponseDictionary } from '../CustomControl/TableDictionary';
import ResponseForm from './ResponseForm';

const Responses = () => {
  const [responses, setResponses] = useState([]);
  const [state, setState] = useState(FormState.LIST);
  const [current, setCurrent] = useState({});
  const [sortRules, setSortRules] = useState({ "sortId": "", "sortOrder": SortOrder.ASC });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [displayPage, setDisplayPage] = useState([]);


  const rowsPerPage = 10;

  useEffect(() => {

    const getResponses = async () => {
      request.request('GET', '/api/v1/campaign/responses').then((res) => {
        setResponses(res.data);
        console.log(res.data);
      });
    }
    state === FormState.LIST && getResponses();
  }, [state]);

  useEffect(() => {
    const paginator = new Paginator(responses.length, rowsPerPage, currentPage);
    setPageCount(paginator.getTotalPages());
    const rowRange = paginator.getRowRange();
    const sorted = sortArray(responses, sortRules.sortId, sortRules.sortOrder);
    setDisplayPage(sorted.slice(rowRange.startRow, rowRange.endRow));
  }, [responses, sortRules, currentPage])



  const setSortOrder = (id) => {
    var newRule = {};
    if (sortRules.sortId === id) {
      if (sortRules.sortOrder === SortOrder.DESC) {
        newRule.sortOrder = SortOrder.ASC;
      }
      else {
        newRule.sortOrder = SortOrder.DESC;
      }
    }
    else {
      newRule.sortOrder = SortOrder.ASC;
    }
    newRule.sortId = id;
    setSortRules(newRule);
    setCurrentPage(1);
  }

  const onEdit = (id) => {
    const found = responses.find((obj) => obj.responseId === id);
    setCurrent(
      found
      /*{
      
      "responseId": found.responseId,
      "responseCode": found.responseCode,
      "responseLabel": found.responseLabel,
      "confirmation": found.confirmation
      
    }*/);
    setState(FormState.EDIT);
  }

  const onNew = () => {
    setCurrent({
      "responseId": 0,
      "responseCode": "",
      "responseLabel": "",
      "confirmation": 0
    });
    setState(FormState.NEW);
  }

  const onSave = () => {
    console.log("onSave", current);
    
    request.request('POST', '/api/v1/campaign/response', current).then((res) => {
      setCurrent(res.data);
      console.log(res.data);
      setState(FormState.LIST);
    });
/**/
  }

  const onCancel = () => {
    setState(FormState.LIST);
  }

  return (
    <div className='displayObject'>

      {
        state === FormState.LIST && (
          <ListOfResponses
            Dictionary={ResponseDictionary}
            objects={displayPage}
            setSortOrder={setSortOrder}
            onEdit={onEdit}
            onNew={onNew}
            sortId={sortRules.sortId}
            sortOrder={sortRules.sortOrder}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageCount={pageCount}
          />
        )
      }

      {
        state === FormState.EDIT && (
          <ResponseForm
            Dictionary={ResponseDictionary}
            object={current}
            setObject={setCurrent}
            onSave={onSave}
            onCancel={onCancel}
            domains={[boolDomain]}
            title="Edit Response"
          />

        )

      }

      {
        state === FormState.NEW && (
          <ResponseForm
            Dictionary={ResponseDictionary}
            object={current}
            setObject={setCurrent}
            onSave={onSave}
            onCancel={onCancel}
            domains={[boolDomain]}
            title="Add Response"
          />

        )

      }
    </div>
  )
}

export default Responses