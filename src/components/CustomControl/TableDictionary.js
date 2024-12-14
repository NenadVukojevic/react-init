export const boolDomain = [
    {
        "id": 0,
        "value": "N"
    }
    ,
    {
        "id": 1,
        "value": "Y"
    }
];

export const booleanDomain = [
    {
        "id": false,
        "value": "N"
    }
    ,
    {
        "id": true,
        "value": "Y"
    }
];

export const TerminalDictionary = [
    {
        "title": "ID",
        "id": "terminalId",
        "width": "50px",
        "type": "text",
        "listType": "show",
        "formType": "ignore",
    },
    {
        "title": "TID",
        "id": "tid",
        "width": "150px",
        "type": "text",
        "listType": "show",
        "formType": "input",
    },
    {
        "title": "CITY",
        "id": "city.cityName",
        "width": "200px",
        "type": "text",
        "listType": "show",
        "formType": "select",
        "controlValue": "cityId",
        "domainId": 0,
        "optionValue": "cityName",
        "optionId": "cityId"
    },
    {
        "title": "Address",
        "id": "location",
        "width": "250px",
        "type": "text",
        "listType": "show",
        "formType": "input",
    },
    {
        "title": "Name",
        "id": "description",
        "width": "250px",
        "type": "text",
        "listType": "show",
        "formType": "input",
    },
    {
        "title": "Edit",
        "id": "terminalId",
        "width": "100px",
        "type": "button",
        "action": "onEdit",
        "listType": "show",
        "formType": "ignore"
    }

];


export const ResponseDictionary = [
    {
        "title": "ID",
        "id": "responseId",
        "width": "50px",
        "type": "text",
        "listType": "show",
        "formType": "ignore",
    },
    {
        "title": "CODE",
        "id": "responseCode",
        "width": "80px",
        "type": "text",
        "listType": "show",
        "formType": "input",
    },
    {
        "title": "LABEL",
        "id": "responseLabel",
        "width": "80px",
        "type": "text",
        "listType": "show",
        "formType": "input",
    },
    {
        "title": "CONFIRMATION",
        "id": "confirmation",
        "width": "100px",
        "type": "boolean",
        "listType": "show",
        "formType": "select",
        "controlValue": "confirmation",
        "domainId": 0,
        "optionValue": "value",
        "optionId": "id"
    },
    {
        "title": "Edit",
        "id": "responseId",
        "width": "100px",
        "type": "button",
        "action": "onEdit",
        "listType": "show",
        "formType": "ignore"
    },
]

export const CampaignDictionary = [
    {
        "title": "ID",
        "id": "campaignId",
        "width": "50px",
        "type": "text",
        "listType": "show",
        "formType": "ignore",
    },
    {
        "title": "Name",
        "id": "campaignName",
        "width": "250px",
        "type": "text",
        "listType": "show",
        "formType": "input",
    },
    {
        "title": "Description",
        "id": "campaignDescription",
        "width": "350px",
        "type": "text",
        "listType": "show",
        "formType": "textarea",
    },
    {
        "title": "Start",
        "id": "campaignStart",
        "width": "120px",
        "type": "text",
        "listType": "show",
        "formType": "input",
        "controlType": "date"
    },
    {
        "title": "End",
        "id": "campaignEnd",
        "width": "120px",
        "type": "text",
        "listType": "show",
        "formType": "input",
        "controlType": "date"
    },
    {
        "title": "Campaign Text",
        "id": "campaignText",
        "width": "400px",
        "type": "text",
        "listType": "ignore",
        "formType": "input",
    },
    {
        "title": "Collecting",
        "id": "contactCollecting",
        "width": "80px",
        "type": "boolean",
        "listType": "show",
        "formType": "select",
        "controlValue": "contactCollecting",
        "domainId": 1,
        "optionValue": "value",
        "optionId": "id"
    },
    {
        "title": "Status",
        "id": "campaignStatus",
        "width": "80px",
        "type": "signal",
        "listType": "show",
        "formType": "select",
        "controlValue": "campaignStatus",
        "domainId": 0,
        "optionValue": "statusName",
        "optionId": "statusId"
    },
    {
        "title": "Edit",
        "id": "campaignId",
        "width": "100px",
        "type": "button",
        "action": "onEdit",
        "listType": "show",
        "formType": "ignore"
    },
]

export const BinRangeDictionary = [
    {
        "title": "ID",
        "id": "binRangeId",
        "width": "50px",
        "type": "text",
        "listType": "show",
        "formType": "ignore",
    },
    {
        "title": "Start",
        "id": "binRangeStart",
        "width": "120px",
        "type": "text",
        "listType": "show",
        "formType": "input",
        "controlType": "number"
    },
    {
        "title": "End",
        "id": "binRangeEnd",
        "width": "120px",
        "type": "text",
        "listType": "show",
        "formType": "input",
        "controlType": "number"
    },
    {
        "title": "ON US",
        "id": "onUs",
        "width": "120px",
        "type": "signal",
        "listType": "show",
        "formType": "select",
        "controlValue": "onUs",
        "domainId": 0,
        "optionValue": "value",
        "optionId": "id"
    },
    {
        "title": "Edit",
        "id": "binRangeId",
        "width": "100px",
        "type": "button",
        "action": "onEdit",
        "listType": "show",
        "formType": "ignore"
    },
]


export const BinRangeGroupDictionary = [
    {
        "title": "ID",
        "id": "binRangeGroupId",
        "width": "50px",
        "type": "text",
        "listType": "show",
        "formType": "ignore",
    },
    {
        "title": "Name",
        "id": "binRangeName",
        "width": "250px",
        "type": "text",
        "listType": "show",
        "formType": "input",
    },
    {
        "title": "Edit",
        "id": "binRangeGroupId",
        "width": "100px",
        "type": "button",
        "action": "onEdit",
        "listType": "show",
        "formType": "ignore"
    },

]

export const BinRangesAvailableDictionary = [
    {
        "title": "ID",
        "id": "binRangeId",
        "width": "50px",
        "type": "text",
        "listType": "show",
        "formType": "ignore",
    },
    {
        "title": "Start",
        "id": "binRangeStart",
        "width": "100px",
        "type": "text",
        "listType": "show",
        "formType": "input",
        "controlType": "number"
    },
    {
        "title": "End",
        "id": "binRangeEnd",
        "width": "100px",
        "type": "text",
        "listType": "show",
        "formType": "input",
        "controlType": "number"
    },
    {
        "title": "ON US",
        "id": "onUs",
        "width": "120px",
        "type": "signal",
        "listType": "show",
        "formType": "select",
        "controlValue": "onUs",
        "domainId": 0,
        "optionValue": "value",
        "optionId": "id"
    },
    {
        "title": "Add",
        "id": "binRangeId",
        "width": "100px",
        "type": "button",
        "action": "onEdit",
        "listType": "show",
        "formType": "ignore"
    },
]

export const BinRangesSelectedDictionary = [
    {
        "title": "Remove",
        "id": "binRangeId",
        "width": "100px",
        "type": "button",
        "action": "onEdit",
        "listType": "show",
        "formType": "ignore"
    },
    {
        "title": "ID",
        "id": "binRangeId",
        "width": "50px",
        "type": "text",
        "listType": "show",
        "formType": "ignore",
    },
    {
        "title": "Start",
        "id": "binRangeStart",
        "width": "100px",
        "type": "text",
        "listType": "show",
        "formType": "input",
        "controlType": "number"
    },
    {
        "title": "End",
        "id": "binRangeEnd",
        "width": "100px",
        "type": "text",
        "listType": "show",
        "formType": "input",
        "controlType": "number"
    },
    {
        "title": "ON US",
        "id": "onUs",
        "width": "120px",
        "type": "signal",
        "listType": "show",
        "formType": "select",
        "controlValue": "onUs",
        "domainId": 0,
        "optionValue": "value",
        "optionId": "id"
    },
]

export const TerminalGroupDictionary = [
    {
        "title": "ID",
        "id": "terminalGroupId",
        "width": "50px",
        "type": "text",
        "listType": "show",
        "formType": "ignore",
    },
    {
        "title": "Name",
        "id": "terminalGroupName",
        "width": "250px",
        "type": "text",
        "listType": "show",
        "formType": "input",
    },
    {
        "title": "Edit",
        "id": "terminalGroupId",
        "width": "100px",
        "type": "button",
        "action": "onEdit",
        "listType": "show",
        "formType": "ignore"
    },

]

export const TerminalsAvailableDictionary = [
    {
        "title": "ID",
        "id": "terminalId",
        "width": "50px",
        "type": "text",
        "listType": "show",
        "formType": "ignore",
    },
    {
        "title": "TID",
        "id": "tid",
        "width": "70px",
        "type": "text",
        "listType": "show",
        "formType": "input",
    },
    {
        "title": "CITY",
        "id": "city.cityName",
        "width": "100px",
        "type": "text",
        "listType": "show",
        "formType": "select",
        "controlValue": "cityId",
        "domainId": 0,
        "optionValue": "cityName",
        "optionId": "cityId"
    },
    {
        "title": "Address",
        "id": "location",
        "width": "150px",
        "type": "text",
        "listType": "show",
        "formType": "input",
    },
    {
        "title": "Name",
        "id": "description",
        "width": "150px",
        "type": "text",
        "listType": "show",
        "formType": "input",
    },
    {
        "title": "Add",
        "id": "terminalId",
        "width": "50px",
        "type": "button",
        "action": "onEdit",
        "listType": "show",
        "formType": "ignore"
    }

];

export const TerminalsSelectedDictionary = [
    
    {
        "title": "Remove",
        "id": "terminalId",
        "width": "50px",
        "type": "button",
        "action": "onEdit",
        "listType": "show",
        "formType": "ignore"
    },
    {
        "title": "ID",
        "id": "terminalId",
        "width": "50px",
        "type": "text",
        "listType": "show",
        "formType": "ignore",
    },
    {
        "title": "TID",
        "id": "tid",
        "width": "70px",
        "type": "text",
        "listType": "show",
        "formType": "input",
    },
    {
        "title": "CITY",
        "id": "city.cityName",
        "width": "100px",
        "type": "text",
        "listType": "show",
        "formType": "select",
        "controlValue": "cityId",
        "domainId": 0,
        "optionValue": "cityName",
        "optionId": "cityId"
    },
    {
        "title": "Address",
        "id": "location",
        "width": "150px",
        "type": "text",
        "listType": "show",
        "formType": "input",
    },
    {
        "title": "Name",
        "id": "description",
        "width": "150px",
        "type": "text",
        "listType": "show",
        "formType": "input",
    },

];

export const CampaingConfigDictionary = [
    {
        "title": "Name",
        "id": "configName",
        "width": "150px",
        "type": "text",
        "listType": "show",
        "formType": "ignore",
    },
    {
        "title": "Value",
        "id": "configValue",
        "width": "350px",
        "type": "text",
        "listType": "show",
        "formType": "input",
    },
    {
        "title": "Edit",
        "id": "configName",
        "width": "100px",
        "type": "button",
        "action": "onEdit",
        "listType": "show",
        "formType": "ignore"
    },
]

export const BinRangeGroupDictionaryAvailable = [
    {
        "title": "Name",
        "id": "binRangeName",
        "width": "250px",
        "type": "text",
        "listType": "show",
        "formType": "input",
    },
    {
        "title": "add",
        "id": "binRangeGroupId",
        "width": "100px",
        "type": "button",
        "action": "onEdit",
        "listType": "show",
        "formType": "ignore"
    },

]

export const BinRangeGroupDictionarySelected = [
    {
        "title": "remove",
        "id": "binRangeGroupId",
        "width": "100px",
        "type": "button",
        "action": "onEdit",
        "listType": "show",
        "formType": "ignore"
    },
    {
        "title": "Name",
        "id": "binRangeName",
        "width": "250px",
        "type": "text",
        "listType": "show",
        "formType": "input",
    },


]

export const BinRangesPreviewDictionary = [
    {
        "title": "Start",
        "id": "binRangeStart",
        "width": "100px",
        "type": "text",
        "listType": "show",
        "formType": "input",
        "controlType": "number"
    },
    {
        "title": "End",
        "id": "binRangeEnd",
        "width": "100px",
        "type": "text",
        "listType": "show",
        "formType": "input",
        "controlType": "number"
    },
    {
        "title": "ON US",
        "id": "onUs",
        "width": "120px",
        "type": "signal",
        "listType": "show",
        "formType": "select",
        "controlValue": "onUs",
        "domainId": 0,
        "optionValue": "value",
        "optionId": "id"
    },
]

export const TerminalGroupDictionaryAvailable = [
    {
        "title": "Name",
        "id": "terminalGroupName",
        "width": "250px",
        "type": "text",
        "listType": "show",
        "formType": "input",
    },
    {
        "title": "add",
        "id": "terminalGroupId",
        "width": "100px",
        "type": "button",
        "action": "onEdit",
        "listType": "show",
        "formType": "ignore"
    },

]

export const TerminalGroupDictionarySelected = [
    {
        "title": "remove",
        "id": "terminalGroupId",
        "width": "100px",
        "type": "button",
        "action": "onEdit",
        "listType": "show",
        "formType": "ignore"
    },
    {
        "title": "Name",
        "id": "terminalGroupName",
        "width": "250px",
        "type": "text",
        "listType": "show",
        "formType": "input",
    },
    

]

export const TerminalPreviewDictionary = [
    {
        "title": "TID",
        "id": "tid",
        "width": "70px",
        "type": "text",
        "listType": "show",
        "formType": "input",
    },
    {
        "title": "CITY",
        "id": "city.cityName",
        "width": "100px",
        "type": "text",
        "listType": "show",
        "formType": "select",
        "controlValue": "cityId",
        "domainId": 0,
        "optionValue": "cityName",
        "optionId": "cityId"
    },
    {
        "title": "Address",
        "id": "location",
        "width": "150px",
        "type": "text",
        "listType": "show",
        "formType": "input",
    },
    {
        "title": "Name",
        "id": "description",
        "width": "150px",
        "type": "text",
        "listType": "show",
        "formType": "input",
    },


];


export const OffersSearchDictionary =[
    {
        "title": "Campaign",
        "id": "campaignId",
        "width": "120px",
        "type": "text",
        "listType": "show",
        "formType": "select",
        "controlValue": "campaignId",
        "domainId": 0,
        "optionValue": "campaignName",
        "optionId": "campaignId"
    }
        ,
    {
        "title": "Start",
        "id": "start",
        "width": "120px",
        "type": "text",
        "listType": "show",
        "formType": "input",
        "controlType": "date"
    },
    {
        "title": "End",
        "id": "end",
        "width": "120px",
        "type": "text",
        "listType": "show",
        "formType": "input",
        "controlType": "date"
    },
    
]

export const OffersDictionary = [
    {
        "title": "ID",
        "id": "offerId",
        "width": "50px",
        "type": "text",
        "listType": "show",
    },
    {
        "title": "Campaign",
        "id": "campaignName",
        "width": "120px",
        "type": "text",
        "listType": "show",
    },
    {
        "title": "Date",
        "id": "offerDate",
        "width": "150px",
        "type": "text",
        "listType": "show",
    },
    {
        "title": "BIN",
        "id": "bin",
        "width": "100px",
        "type": "text",
        "listType": "show",
    },
    {
        "title": "PAN",
        "id": "pan",
        "width": "180px",
        "type": "text",
        "listType": "show",
    },
    {
        "title": "Code",
        "id": "responseCode",
        "width": "60px",
        "type": "text",
        "listType": "show",
    },
    {
        "title": "Response",
        "id": "responseData",
        "width": "100px",
        "type": "text",
        "listType": "show",
    },
];

export const CityDictionary = [

    {
        "title": "ID",
        "id": "cityId",
        "width": "50px",
        "type": "text",
        "listType": "show",
        "formType": "ignore",
    },
    {
        "title": "ZIP",
        "id": "cityCode",
        "width": "70px",
        "type": "text",
        "listType": "show",
        "formType": "input",
    },
    {
        "title": "Name",
        "id": "cityName",
        "width": "150px",
        "type": "text",
        "listType": "show",
        "formType": "input",
    },
    {
        "title": "edit",
        "id": "cityId",
        "width": "50px",
        "type": "button",
        "action": "onEdit",
        "listType": "show",
        "formType": "ignore"
    },
];