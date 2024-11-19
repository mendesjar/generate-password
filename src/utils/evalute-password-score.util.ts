export function evaluatePasswordStrength(password: string) {
  let score = 0;
  if (!password) return "";
  // Check password length
  if (password.length > 8) score += 1;
  else score -= 1;
  // Contains lowercase
  if (/[a-z]/.test(password)) score += 1;
  else score -= 1;
  // Contains uppercase
  if (/[A-Z]/.test(password)) score += 1;
  else score -= 1;
  // Contains numbers
  if (/\d/.test(password)) score += 1;
  else score -= 1;
  // Contains special characters
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  else score -= 1;

  switch (score) {
    default:
      return "Short bg-red-800";
    case 0:
      return "Short bg-red-800";
    case 1:
      return "Weak bg-red-500";
    case 2:
      return "Weak bg-red-200";
    case 3:
      return "Medium bg-yellow-500";
    case 4:
      return "Medium bg-yellow-200";
    case 5:
      return "Strong bg-green-800";
  }
}
