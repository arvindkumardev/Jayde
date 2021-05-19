/* eslint-disable prettier/prettier */
/* eslint-disable no-underscore-dangle */
/* eslint-disable global-require */

export const GlobalData = {
    CategoryName: '',
    
    subCategoryName: '',
    subCategoryId: 0,

    unitID: 0,
    unitName: '',

    location : '',
    Volume:10,
    uploadImageName: [],
    EstimatedPrice: 2000,
    quoteDetails : ''
}

/**
 * function to set and get Category Name.
 */
 export function setCategory(value) {
    GlobalData.CategoryName = value;
}

export function getCategoryName() {
    return GlobalData.CategoryName;
}

/**
 * function to set and get Sub Category Name.
 */
 export function setSubCategory(value) {
    GlobalData.subCategoryName = value;
}

export function getSubCategoryName() {
    return GlobalData.subCategoryName;
}

/**
 * function to set and get Sub Category ID.
 */
export function setSubCategoryId(value) {
    GlobalData.subCategoryId = value;
}

export function getSubCategoryId() {
    return GlobalData.subCategoryId;
}

/**
 * function to set and get Unit ID.
 */
 export function setUnitId(value) {
    GlobalData.unitID = value;
}

export function getUnitId() {
    return GlobalData.unitID;
}

/**
 * function to set and get Unit Name.
 */
 export function setUnit(value) {
    GlobalData.unitName = value;
}

export function getUnitName() {
    return GlobalData.unitName;
}

/**
 * function to set and get Location.
 */
 export function setLocation(value) {
    GlobalData.location = value;
}

export function getLocation() {
    return GlobalData.location;
}

/**
 * function to set and get Quantity.
 */
 export function setQuantity(value) {
    GlobalData.Volume = value;
}

export function getQuantity() {
    return GlobalData.Volume;
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
 export function setEstimatedPrice(value) {
    GlobalData.EstimatedPrice = value;
}

export function getEstimatedPrice() {
    return GlobalData.EstimatedPrice;
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
