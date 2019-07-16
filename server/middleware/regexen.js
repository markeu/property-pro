// const numericPattern = /^([0-9])*$/
// const stringPatternP = /^[a-zA-Z\s]*$/

// const addressPattern = /^[a-zA-Z0-9._]*$/
// const mapPattern = /^[0-9]+,[0-9]*$/
// const passwordPattern = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/

// const emailPattern = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?))*$/

export const emailRegex = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{3})+$/;
export const numberRegex = /^\d$/;
export const passwordRegex = /^.{6,}$/;
export const descriptionRegex = /[a-zA-Z .]{20,}/;
export const floatRegex = /^(([0-9]+(?:\.[0-9]+)?)|([0-9]*(?:\.[0-9]+)?))$/;
export const stringRegex = /^[a-z]*$/;