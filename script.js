const totalBalance = document.querySelector(".balance-amount");
const incomeBalance = document.querySelector("#income");
const expenseBalance = document.querySelector("#expense");

const processTitle = document.querySelector("#text");
const processAmount = document.querySelector("#amount");

const postiveProcess = document.querySelector(".income-radio input");
const negativeProcess = document.querySelector(".expense-radio input");
const addProcess = document.querySelector(".submit-btn");

const list = document.querySelector("#list");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let currentLang = "ar";

const translations = {
  ar: {
    mainTitle: "متتبع المصروفات",
    totalBalanceLabel: "الرصيد المتبقي الكلي",
    currency: "جنيه",
    incomeLabel: "إجمالي الدخل (+)",
    expenseLabel: "إجمالي المصروفات (-)",
    formTitle: "تسجيل معاملة جديدة",
    descLabel: "الوصف / البيان",
    descPlaceholder: "مثلاً: راتب الشهر، غداء، فاتورة النت...",
    amountLabel: "المبلغ",
    typeLabel: "نوع المعاملة",
    radioIncome: "دخل (+)",
    radioExpense: "مصروف (-)",
    submitBtn: "إضافة إلى الدفتر",
    historyTitle: "سجل المعاملات اليومية",
    footerText: "التطبيق الرابع بجافاسكريبت بواسطة: ",
    deleteTitle: "حذف",
  },
  en: {
    mainTitle: "Expense Tracker",
    totalBalanceLabel: "Total Balance",
    currency: "EGP",
    incomeLabel: "Total Income (+)",
    expenseLabel: "Total Expenses (-)",
    formTitle: "Add New Transaction",
    descLabel: "Description",
    descPlaceholder: "e.g., Salary, Lunch, Internet bill...",
    amountLabel: "Amount",
    typeLabel: "Transaction Type",
    radioIncome: "Income (+)",
    radioExpense: "Expense (-)",
    submitBtn: "Add to Ledger",
    historyTitle: "Daily Transaction History",
    footerText: "4th Javascript project by: ",
    deleteTitle: "Delete",
  },
};

const changeLanguage = (lang) => {
  currentLang = lang;
  const htmlTag = document.getElementById("app-html");
  const langBtn = document.getElementById("lang-btn");

  if (lang === "ar") {
    htmlTag.dir = "rtl";
    htmlTag.lang = "ar";
    langBtn.innerText = "English";
  } else {
    htmlTag.dir = "ltr";
    htmlTag.lang = "en";
    langBtn.innerText = "العربية";
  }

  document.getElementById("lng-main-title").innerText =
    translations[lang].mainTitle;
  document.getElementById("lng-total-balance-label").innerText =
    translations[lang].totalBalanceLabel;
  document.getElementById("lng-income-label").innerText =
    translations[lang].incomeLabel;
  document.getElementById("lng-expense-label").innerText =
    translations[lang].expenseLabel;
  document.getElementById("lng-form-title").innerText =
    translations[lang].formTitle;
  document.getElementById("lng-desc-label").innerText =
    translations[lang].descLabel;
  document.getElementById("lng-amount-label").innerText =
    translations[lang].amountLabel;
  document.getElementById("lng-type-label").innerText =
    translations[lang].typeLabel;
  document.getElementById("lng-radio-income").innerText =
    translations[lang].radioIncome;
  document.getElementById("lng-radio-expense").innerText =
    translations[lang].radioExpense;
  document.getElementById("lng-submit-btn").innerText =
    translations[lang].submitBtn;
  document.getElementById("lng-history-title").innerText =
    translations[lang].historyTitle;
  document.getElementById("lng-footer-text").innerText =
    translations[lang].footerText;

  processTitle.placeholder = translations[lang].descPlaceholder;

  displayTransactions();
};

document.getElementById("lang-btn").addEventListener("click", () => {
  const nextLang = currentLang === "ar" ? "en" : "ar";
  changeLanguage(nextLang);
});

const updateLocalStorage = () => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

const gettingData = () => {
  let title = processTitle.value;
  let amount = Number(processAmount.value);

  if (postiveProcess.checked) {
    amount = Math.abs(amount);
  } else if (negativeProcess.checked) {
    amount = -Math.abs(amount);
  }

  let newTransaction = {
    id: Date.now(),
    text: title,
    amount: amount,
  };

  transactions.push(newTransaction);
  updateLocalStorage();
  processTitle.value = "";
  processAmount.value = "";
};

const displayTransactions = () => {
  list.innerHTML = "";

  let totalBalanceValue = 0;
  let incomeBalanceValue = 0;
  let expenseBalanceValue = 0;

  transactions.forEach((transaction) => {
    const isIncome = transaction.amount > 0;
    const typeClass = isIncome ? "plus" : "minus";
    const sign = isIncome ? "+" : "";

    const itemHTML = `
            <li class="transaction-item ${typeClass}">
                <span class="item-text">${transaction.text}</span>
                <span class="item-amount">${sign}${transaction.amount}</span>
                <button class="delete-btn" title="${translations[currentLang].deleteTitle}" onclick="deleteTransaction(${transaction.id})">✕</button>
            </li>
        `;

    list.insertAdjacentHTML("beforeend", itemHTML);

    if (transaction.amount > 0) {
      incomeBalanceValue += transaction.amount;
    } else if (transaction.amount < 0) {
      expenseBalanceValue += transaction.amount;
    }

    totalBalanceValue += transaction.amount;
  });

  totalBalance.innerHTML = `${totalBalanceValue.toFixed(2)} <span class="currency">${translations[currentLang].currency}</span>`;
  incomeBalance.innerText = incomeBalanceValue.toFixed(2);
  expenseBalance.innerText = expenseBalanceValue.toFixed(2);
};

const deleteTransaction = (id) => {
  transactions = transactions.filter((transaction) => transaction.id != id);
  updateLocalStorage();
  displayTransactions();
};

addProcess.addEventListener("click", function (event) {
  event.preventDefault();
  if (processTitle.value.trim() === "" || processAmount.value === "") return;
  gettingData();
  displayTransactions();
});

changeLanguage("ar");

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .then((reg) =>
        console.log("Service Worker Registered Successfully!", reg),
      )
      .catch((err) => console.log("Service Worker Registration Failed!", err));
  });
}