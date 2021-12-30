
export function checkPhone(value:string):boolean {
  let regPhong = /^1[3456789]\d{9}$/; //1开头，第二个数值是3456789之一，剩余9位是数值
  return regPhong.test(value);
}



export function checkPassword(value:string):boolean {
  let regPassword = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;//至少一个数值字符，至少一个字母字符的6-20个非空格字符
  return regPassword.test(value);
}


 
 export function checkCode(value:string):boolean{
  let regCode = /^\d{6}$/;
  return regCode.test(value);
}