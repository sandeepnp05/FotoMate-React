const calculatePercentageChange = (newValue, oldValue) => {
    // If the old value is zero, return 0 as the percentage change
    if (oldValue === 0) {
        return {
            percentage: '0.00 %',
            colorClass: 'text-green-500' // You can choose the color for zero change
        };
    }

    // Calculate the percentage change
    const percentageChange = ((newValue - oldValue) / oldValue) * 100;
  
    // Determine if the change is negative
    const isNegative = percentageChange < 0;
  
    // Calculate the absolute value of the percentage change
    const absPercentageChange = Math.abs(percentageChange);
  
    // Determine the sign to display
    const sign = isNegative ? '-' : '+';
  
    // Determine the color class based on whether the change is negative
    const colorClass = isNegative ? 'text-danger' : 'text-green-500';
  
    // Return an object containing the formatted percentage and color class
    return {
      percentage: `${sign}${absPercentageChange.toFixed(2)} %`,
      colorClass: colorClass
    };
};

export default calculatePercentageChange;
