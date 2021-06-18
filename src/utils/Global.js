/* eslint-disable prettier/prettier */
/* eslint-disable no-underscore-dangle */
/* eslint-disable global-require */

export const GlobalData = { 
    uploadImageName: [],
    quoteDetails : '',
    EPRName: '',
    EPRAggregatorID:'',
    aggregators: []
}

/**
 * function to set and get Upload Image Name
 */
 export function setImageName(value) {
    GlobalData.uploadImageName = value;
}

export function getImageName() {
    return GlobalData.uploadImageName;
}

/**
 * function to set and get Estimated Price
 */
 export function setQuoteData(value) {
    GlobalData.quoteDetails = value;
}

export function getQuoteData() {
    return GlobalData.quoteDetails;
}

export function setEPRName(value){
    GlobalData.EPRName = value;
}

export function getEPRName(){
    return GlobalData.EPRName
}

export function setEPRAggregatorID(value){
    GlobalData.EPRAggregatorID = value;
}

export function getEPRAggregatorID(){
    return GlobalData.EPRAggregatorID
}

export function setAggregator(value) {
    GlobalData.aggregators = value;
}

export function getAggregator() {
    return GlobalData.aggregators;
}
