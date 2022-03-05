export const getInterest = (amount = 0, period = "long") => {
  if (period === "long") return parseFloat(amount) * 0.18;
  if (period === "short") return parseFloat(amount) * 0.09;
};

export const getServiceFee = (amount = 0) => {
  if (amount <= 10000) return 50;
  if (amount > 10000 && amount <= 20000) return 100;
  if (amount > 20000 && amount <= 50000) return 200;
  if (amount > 50000 && amount <= 100000) return 400;
  if (amount > 100000) return 600;
  return 0;
};

export const getInsurance = (amount = 0, monthsCount = 1) => {
  const precentage = {
    1: 0.002083,
    2: 0.002083,
    3: 0.003125,
    4: 0.004167,
    5: 0.005208,
    6: 0.00625,
    7: 0.007292,
    8: 0.008333,
    9: 0.009375,
    10: 0.010417,
    11: 0.011458,
    12: 0.0125,
    13: 0.013542,
    14: 0.014583,
    15: 0.015625,
    16: 0.016667,
    17: 0.017708,
    18: 0.01875,
    19: 0.019792,
    20: 0.020833,
    21: 0.021875,
    22: 0.022917,
    23: 0.023958,
    24: 0.025,
  };

  return parseFloat(amount) * precentage[monthsCount];
};
