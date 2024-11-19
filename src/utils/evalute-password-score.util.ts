export function evaluatePasswordStrength(password: string) {
  let score = 0;
  if (!password) return "";
  // Check password length
  if (password.length > 8) score += 1;
  // Contains lowercase
  if (/[a-z]/.test(password)) score += 1;
  // Contains uppercase
  if (/[A-Z]/.test(password)) score += 1;
  // Contains numbers
  if (/\d/.test(password)) score += 1;
  // Contains special characters
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  switch (score) {
    default:
      return "Short";
    case 0:
      return "Short";
    case 1:
      return "Weak";
    case 2:
      return "Weak";
    case 3:
      return "Medium";
    case 4:
      return "Medium";
    case 5:
      return "Strong";
  }
}
