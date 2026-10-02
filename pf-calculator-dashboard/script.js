const form = document.getElementById('pfForm');
const salaryInput = document.getElementById('salary');
const employeeRateInput = document.getElementById('employeeRate');
const employerRateInput = document.getElementById('employerRate');
const currentBalanceInput = document.getElementById('currentBalance');
const interestRateInput = document.getElementById('interestRate');
const yearsInput = document.getElementById('years');
const projectedValueEl = document.getElementById('projectedValue');
const totalInvestedEl = document.getElementById('totalInvested');
const totalInterestEl = document.getElementById('totalInterest');
const interestPercentEl = document.getElementById('interestPercent');
const rateBadgeEl = document.getElementById('rateBadge');
const yearRateLabelEl = document.getElementById('yearRateLabel');
const tableBodyEl = document.getElementById('tableBody');
const chartEl = document.getElementById('yearBarChart');
const presetButtons = document.querySelectorAll('.preset');

function currency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}

function formatCompact(value) {
  const number = Number(value) || 0;
  if (number >= 10000000) {
    return `${(number / 10000000).toFixed(2)} Cr`;
  }
  if (number >= 100000) {
    return `${(number / 100000).toFixed(2)} L`;
  }
  return currency(number);
}

function clampYears(value) {
  const maxYear = 40;
  const safeValue = Number(value) || 1;
  return Math.min(Math.max(safeValue, 1), maxYear);
}

function getValues() {
  return {
    salary: Number(salaryInput.value) || 0,
    employeeRate: Number(employeeRateInput.value) || 0,
    employerRate: Number(employerRateInput.value) || 0,
    currentBalance: Number(currentBalanceInput.value) || 0,
    interestRate: Number(interestRateInput.value) || 0,
    years: clampYears(yearsInput.value),
  };
}

function calculateProjection() {
  const {
    salary,
    employeeRate,
    employerRate,
    currentBalance,
    interestRate,
    years,
  } = getValues();

  const monthlyEmployeeContribution = (salary * employeeRate) / 100;
  const monthlyEmployerContribution = (salary * employerRate) / 100;
  const annualContribution = (monthlyEmployeeContribution + monthlyEmployerContribution) * 12;

  let balance = currentBalance;
  const rows = [];
  let totalContribution = currentBalance;
  let totalInterest = 0;

  for (let year = 1; year <= years; year += 1) {
    const openingBalance = balance;
    const contribution = annualContribution;
    totalContribution += contribution;

    const interestEarned = ((openingBalance + contribution) * interestRate) / 100;
    balance = openingBalance + contribution + interestEarned;
    totalInterest += interestEarned;

    rows.push({
      year,
      openingBalance,
      contribution,
      interestEarned,
      closingBalance: balance,
    });
  }

  const projectedValue = balance;
  const interestShare = projectedValue > 0 ? (totalInterest / projectedValue) * 100 : 0;

  return {
    rows,
    totalContribution,
    totalInterest,
    projectedValue,
    interestShare,
  };
}

function renderTable(rows) {
  tableBodyEl.innerHTML = rows
    .map(
      (row) => `
        <tr>
          <td>${row.year}</td>
          <td>${currency(row.openingBalance)}</td>
          <td>${currency(row.contribution)}</td>
          <td>${currency(row.interestEarned)}</td>
          <td>${currency(row.closingBalance)}</td>
        </tr>
      `
    )
    .join('');
}

function renderChart(rows) {
  const values = rows.map((row) => row.closingBalance);
  const maxValue = Math.max(...values, 1);

  chartEl.innerHTML = rows
    .map((row) => {
      const height = (row.closingBalance / maxValue) * 100;
      return `
        <div class="bar-item">
          <div class="bar-track">
            <div class="bar-fill" style="height: ${Math.max(height, 8)}%"></div>
          </div>
          <div class="bar-value">${formatCompact(row.closingBalance)}</div>
          <div class="bar-year">Y${row.year}</div>
        </div>
      `;
    })
    .join('');
}

function updateSummary(result) {
  const { totalContribution, totalInterest, projectedValue, interestShare } = result;
  const interestPercent = Math.min(100, Math.max(0, interestShare));
  const rate = Number(interestRateInput.value) || 0;

  projectedValueEl.textContent = currency(projectedValue);
  totalInvestedEl.textContent = currency(totalContribution);
  totalInterestEl.textContent = currency(totalInterest);
  interestPercentEl.textContent = `${interestPercent.toFixed(1)}%`;
  rateBadgeEl.textContent = `${rate.toFixed(2)}%`;
  yearRateLabelEl.textContent = `${rate.toFixed(2)}%`;

  const donut = document.querySelector('.donut-ring');
  if (donut) {
    const contributionRatio = projectedValue > 0 ? (totalContribution / projectedValue) * 100 : 0;
    const contributionEnd = Math.min(100, contributionRatio);
    const interestEnd = Math.min(100, contributionEnd + interestPercent);

    donut.style.background = `conic-gradient(var(--green) 0 ${contributionEnd}%, var(--blue) ${contributionEnd}% ${interestEnd}%, var(--violet) ${interestEnd}% 100%)`;
  }
}

function refreshProjection() {
  const result = calculateProjection();
  renderTable(result.rows);
  renderChart(result.rows);
  updateSummary(result);
}

function handleSubmit(event) {
  event.preventDefault();
  refreshProjection();
}

presetButtons.forEach((button) => {
  button.addEventListener('click', () => {
    presetButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
    interestRateInput.value = button.dataset.rate;
    refreshProjection();
  });
});

form.addEventListener('submit', handleSubmit);
['input', 'change'].forEach((eventName) => {
  form.addEventListener(eventName, refreshProjection);
});

refreshProjection();
