export const validateText = (text, errorMessage, elem) => {
  if (!text) {
    alert(errorMessage);
    if (elem !== undefined && document.getElementById(elem) !== undefined) {
      document.getElementById(elem).focus();
    }
    return false;
  }
  return true;
}
