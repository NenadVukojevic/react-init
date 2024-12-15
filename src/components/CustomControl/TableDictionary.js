/*
    (c) pavel Dec 2024
*************************************************************************
*******   D i c t i o n a r y                                   *********
*************************************************************************
*******    - used for generating codes based on description     *********
*******      and data passed as parameter to prototype controls *********
*******      that "explode" this dictionaries and data          *********
*************************************************************************
*************************************************************************
*/


/*
    Theese two are not actually dictionaries, they are fixed domains used with dictionaries.
    Most of the domains are read from database.

*/

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
/*
    Dictionary is used for creating list and forms using prototype files:
        - ListHeader.jsx
        - ListRow.jsx
        - ObjectForm.jsx

    parameters:
        - title         - label as it will apear in header and on the form

        - id            - parameter name from the recordset, value will be shown in listRow and on the form

        - width         - width of the header label and input element on the form

        - type          - way the data is shown in the List Row:
                            - text
                            - boolean (Yes/ No)
                            - signal  (image - red green dot)
                            - button  (action eg onEdit)

        - action        - when type is button and action is onEdit it set's button onClick to be onEdit function                            

        - listType      - is this data shown in the listHeeader and listRow
                            - show
                            - ignore - don't show

        - formType      - type of control for this parameter on the form
                            - input
                            - textarea
                            - select
                            - ignore - don't show

        - controlType   - if input control has additional specific type
                            - date
                            - number

        - controlValue  - specific for the select formType parameter name from the recordset

        - domainId      - id of the array containing options for that control
                        - domains is parameter that is passed to the ObjectForm control and it is array of arrays
 
        - optionValue   - for populating option label in select control, name of the parameter from the associated domain (see domain)
 
        - optionId      - for populating option value in select control, name of the parameter from the associated domain (see domain)
*/
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

export const UserDictionary = [
    {
        "title": "ID",
        "id": "id",
        "width": "50px",
        "type": "text",
        "listType": "show",
        "formType": "ignore",
    },
    {
        "title": "Username",
        "id": "username",
        "width": "100px",
        "type": "text",
        "listType": "show",
        "formType": "input",
    },
    {
        "title": "Name",
        "id": "name",
        "width": "150px",
        "type": "text",
        "listType": "show",
        "formType": "input",
    },
    {
        "title": "Password",
        "id": "password",
        "width": "150px",
        "type": "text",
        "listType": "ignore",
        "formType": "input",
        "controlType":"password"
    },
    {
        "title": "e-mail",
        "id": "email",
        "width": "250px",
        "type": "text",
        "listType": "show",
        "formType": "input",
    },
    {
        "title": "Active",
        "id": "enabled",
        "width": "70px",
        "type": "signal",
        "listType": "show",
        "formType": "select",
        "controlValue":"enabled",
        "domainId": 0,
        "optionValue": "value",
        "optionId": "id"
    },
    {
        "title": "edit",
        "id": "id",
        "width": "50px",
        "type": "button",
        "action": "onEdit",
        "listType": "show",
        "formType": "ignore"
    },
];

export const RoleGroupsAvailableDictionary = [
    {
        "title": "Name",
        "id": "groupname",
        "width": "250px",
        "type": "text",
        "listType": "show",
        "formType": "input",
    },
    {
        "title": "add",
        "id": "groupId",
        "width": "100px",
        "type": "button",
        "action": "onEdit",
        "listType": "show",
        "formType": "ignore"
    },

];

export const RoleGroupsSelectedDictionary= [
    {
        "title": "remove",
        "id": "groupId",
        "width": "100px",
        "type": "button",
        "action": "onEdit",
        "listType": "show",
        "formType": "ignore"
    },
    {
        "title": "Name",
        "id": "groupname",
        "width": "250px",
        "type": "text",
        "listType": "show",
        "formType": "input",
    },
    
]