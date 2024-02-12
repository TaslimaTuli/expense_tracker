export function getColor(type) {
  switch (type) {
    case "Investment":
      return "rgb(255, 99, 132)";
    case "Expense":
      return "rgb(54, 162, 235)";
    case "Savings":
      return "rgb(255, 205, 86)";
    default:
      return "#e5e5e5"; // Default color
  }
}