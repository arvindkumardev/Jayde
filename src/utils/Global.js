export const GlobalData = {
    subCategoryName: '',
    subCategoryId: 0,

    unitID: 0,
    unitName: ''
}

/**
 * function to set and get Sub Category Name.
 */
 export function setSubCategoryName(value) {
    GlobalData.subCategoryName = value;
}

export function getSubCategoryName() {
    return GlobalData.subCategoryName;
}

/**
 * function to set and get Sub Category ID.
 */
export function setSubCategoryId(value) {
    GlobalData.subCategoryName = value;
}

export function getSubCategoryId() {
    return GlobalData.subCategoryName;
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
 export function setUnitName(value) {
    GlobalData.unitName = value;
}

export function getUnitName() {
    return GlobalData.unitName;
}

