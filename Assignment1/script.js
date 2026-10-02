const updatePasswordForm = document.getElementById("updatePasswordForm");
const newPasswordInput = document.getElementById("newPassword");
const confirmPasswordInput = document.getElementById("confirmPassword");
const newPasswordErrMsg = document.getElementById("newPasswordErrMsg");
const confirmPasswordErrMsg = document.getElementById("confirmPasswordErrMsg");

function validateRequiredField(input, errorMessage) {
  const isEmpty = input.value.trim() === "";
  errorMessage.textContent = isEmpty ? "Required*" : "";
  input.setAttribute("aria-invalid", String(isEmpty));
  return !isEmpty;
}

newPasswordInput.addEventListener("blur", () => {
  validateRequiredField(newPasswordInput, newPasswordErrMsg);
});

confirmPasswordInput.addEventListener("blur", () => {
  validateRequiredField(confirmPasswordInput, confirmPasswordErrMsg);
});

newPasswordInput.addEventListener("input", () => {
  if (newPasswordInput.value.trim() !== "") {
    newPasswordErrMsg.textContent = "";
    newPasswordInput.setAttribute("aria-invalid", "false");
  }
});

confirmPasswordInput.addEventListener("input", () => {
  if (confirmPasswordInput.value.trim() !== "") {
    confirmPasswordErrMsg.textContent = "";
    confirmPasswordInput.setAttribute("aria-invalid", "false");
  }
});

updatePasswordForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const isNewPasswordValid = validateRequiredField(newPasswordInput, newPasswordErrMsg);
  const isConfirmPasswordValid = validateRequiredField(confirmPasswordInput, confirmPasswordErrMsg);

  if (!isNewPasswordValid) {
    newPasswordInput.focus();
  } else if (!isConfirmPasswordValid) {
    confirmPasswordInput.focus();
  }
});