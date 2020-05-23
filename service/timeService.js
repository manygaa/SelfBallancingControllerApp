export const getCurrentDate=()=>{
  return new Date().toISOString().split('T')[0];
}

export const getCurrentTime = () => {
  const today = new Date();
  return `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
}

export const getDate = () => {
  return `${getCurrentDate()} ${getCurrentTime()} `;
}
