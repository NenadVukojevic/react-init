export const TerminalDictionary = [
    {
        "title":"ID",
        "id": "terminalId",
        "width":"50px",
        "type":"text",
        "listType":"show",
        "formType":"ignore",
    },
    {
        "title":"TID",
        "id": "tid",
        "width":"150px",
        "type":"text",
        "listType":"show",
        "formType":"input",
    },
    {
        "title":"CITY",
        "id": "city.cityName",
        "width":"200px",
        "type":"text",
        "listType":"show",
        "formType":"select",
        "controlValue":"cityId",
        "domainId":0,
        "optionValue":"cityName",
        "optionId":"cityId"
    },
    {
        "title":"Address",
        "id": "location",
        "width":"250px",
        "type":"text",
        "listType":"show",
        "formType":"input",
    },
    {
        "title":"Name",
        "id": "description",
        "width":"250px",
        "type":"text",
        "listType":"show",
        "formType":"input",
    },
    {
        "title":"Edit",
        "id":"terminalId",
        "width": "100px",
        "type":"button",
        "action":"onEdit",
        "listType":"show",
        "formType":"ignore"
    }

];


export const ResponseDictionary = [
    {
        "title":"ID",
        "id": "responseId",
        "width":"50px",
        "type":"text",
        "listType":"show",
        "formType":"ignore",
    },
    {
        "title":"CODE",
        "id": "responseCode",
        "width":"80px",
        "type":"text",
        "listType":"show",
        "formType":"input",
    },
    {
        "title":"LABEL",
        "id": "responseLabel",
        "width":"80px",
        "type":"text",
        "listType":"show",
        "formType":"input",
    },
    {
        "title":"CONFIRMATION",
        "id": "confirmation",
        "width":"100px",
        "type":"text",
        "listType":"show",
        "formType":"input",
    },
    {
        "title":"Edit",
        "id":"responseId",
        "width": "100px",
        "type":"button",
        "action":"onEdit",
        "listType":"show",
        "formType":"ignore"
    },
]

export const CampaignDictionary = [
    {
        "title":"ID",
        "id": "campaignId",
        "width":"50px",
        "type":"text",
        "listType":"show",
        "formType":"ignore",
    },
    {
        "title":"Name",
        "id": "campaignName",
        "width":"250px",
        "type":"text",
        "listType":"show",
        "formType":"input",
    },
    {
        "title":"Description",
        "id": "campaignDescription",
        "width":"350px",
        "type":"text",
        "listType":"show",
        "formType":"textarea",
    },
    {
        "title":"Start",
        "id": "campaignStart",
        "width":"120px",
        "type":"text",
        "listType":"show",
        "formType":"input",
        "controlType":"date"
    },
    {
        "title":"End",
        "id": "campaignEnd",
        "width":"120px",
        "type":"text",
        "listType":"show",
        "formType":"input",
        "controlType":"date"
    },
    {
        "title":"Campaign Text",
        "id":"campaignText",
        "width":"400px",
        "type":"text",
        "listType":"ignore",
        "formType":"input",
    },
    {
        "title":"Collecting",
        "id": "contactCollecting",
        "width":"80px",
        "type":"boolean",
        "listType":"show",
        "formType":"select",
        "controlValue":"contactCollecting",
        "domainId":1,
        "optionValue":"value",
        "optionId":"id"
    },
    {
        "title":"Status",
        "id": "campaignStatus",
        "width":"80px",
        "type":"signal",
        "listType":"show",
        "formType":"select",
        "controlValue":"campaignStatus",
        "domainId":0,
        "optionValue":"statusName",
        "optionId":"statusId"
    },
    {
        "title":"Edit",
        "id":"campaignId",
        "width": "100px",
        "type":"button",
        "action":"onEdit",
        "listType":"show",
        "formType":"ignore"
    },
]