const dayDiv = document.querySelector("#day");

const getDay = () => {
  let today = new Date();
  let month = today.getUTCMonth() + 1;
  let day = today.getDate();
  let year = today.getUTCFullYear();
  dayDiv.innerHTML = `${year}년 ${month}월 ${day}일`;
  return { month, day };
};
