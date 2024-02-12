import _ from "lodash";
import { Chart, ArcElement } from "chart.js";

Chart.register(ArcElement);

// Function to calculate the sum of amounts for each type of transaction
export function getSum(t, type) {
  let sum = _(t) // Start lodash chain
    .map((obj) => {
      return { ...obj, amount: Number(obj.amount) }; // Convert amount strings to numbers
    })
    .groupBy("type")
    .map((objs, key) => {
      let total = _.sumBy(objs, "amount"); // Calculate total amount for each type
      if (!type) return total;
      return {
        type: key,
        //color: objs[0].color,
        total: total,
        percent: (100 * total) / _.sumBy(t, (obj) => Number(obj.amount)),
      };
    })
    .value(); // End lodash chain and get the value of the chain
  //console.log(sum);
  return sum;
}

// Function to generate data for chart labels
export function graphLabel(transaction) {
  let amountSum = getSum(transaction, "type");
  return amountSum;
}

// Function to generate chart data
export function chart_Data(transaction, custom) {
  const colorMap = {
    Investment: "rgb(255, 99, 132)",
    Expense: "rgb(54, 162, 235)",
    Savings: "rgb(255, 205, 86)",
  };

  let bg = _.map(transaction, (a) => colorMap[a.type]);
  bg = _.uniq(bg);
  let dataValue = getSum(transaction); //get total amounts for each type
  //console.log(bg);

  // Configuration object for the chart
  const config = {
    data: {
      datasets: [
        {
          data: dataValue, // Total amounts for each type
          backgroundColor: bg,
          hoverOffset: 4,
          borderRadius: 30,
          spacing: 10,
        },
      ],
    },
    options: {
      cutout: 115,
    },
  };

  return config;
}

// Function to calculate total sum of all amounts
export function getTotal(transaction) {
  const sum = _.sum(getSum(transaction));
  return sum.toFixed(2); // Return total sum formatted as a string with two decimal places
}
