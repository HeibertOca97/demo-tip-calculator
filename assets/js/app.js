"use strict";

const bill = document.querySelector("#bill"),
  numberPeople = document.querySelector("#people"),
  custom = document.querySelector("#custom"),
  btn_reset = document.getElementById("btn-reset");
let selectTip = document.querySelectorAll(".item-tip");

const getResult = (bill_, tip_, people_) => {
  let r_tipAmount = document.getElementById("tipAmount"),
    r_total = document.getElementById("total"),
    b_,
    t_,
    np_;
  b_ = validationValues(bill_);
  t_ = validationValues(tip_);
  np_ = validationValues(people_);

  if (!b_ || !t_ || !np_) {
    r_tipAmount.innerHTML = "$0.00";
    r_total.innerHTML = "$0.00";
    addStyleButtom("btn-disabled", "btn-reset");
    return;
  }

  let tip = b_ / np_,
    tipAmount = (tip * tip_) / 100,
    total = b_ / np_ + tipAmount;
  r_tipAmount.innerHTML = "$" + tipAmount.toFixed(2);
  r_total.innerHTML = "$" + total.toFixed(2);
  addStyleButtom("btn-reset", "btn-disabled");
};

function addStyleButtom(classAdd, classRemove) {
  btn_reset.classList.add(classAdd);
  btn_reset.classList.remove(classRemove);
}

function validationValues(value) {
  return !value || value < 0 ? 0 : Number(value);
}

const allowToWriteOnlyNumbers = (e) => {
  let key = window.event ? e.which : e.keyCode;
  if ((key !== 46 && key < 48) || key > 57) {
    e.preventDefault();
  }
};

const allowToWriteOnlyWholeNumbers = (e) => {
  let key = window.event ? e.which : e.keyCode;
  if (key < 48 || key > 57) {
    e.preventDefault();
  }
};

const allUnCheckOptions = () => {
  selectTip.forEach((element) => {
    element.setAttribute("data-check", "");
    element.classList.add("uncheck");
    element.classList.remove("add");
  });
};
const unCheckOptions = (el) => {
  selectTip.forEach((element) => {
    if (el !== element) {
      element.setAttribute("data-check", "");
      element.classList.add("uncheck");
      element.classList.remove("add");
    }
  });
};

const generateAttrDataCheck = () => {
  selectTip.forEach((element) => {
    element.setAttribute("data-check", "");
  });
};

generateAttrDataCheck();

function getTipValue() {
  let result = {};

  for (let i = 0; i < selectTip.length; i++) {
    if (
      selectTip[i].getAttribute("data-check") == "true" &&
      selectTip[i].getAttribute("data-check") != ""
    ) {
      result["value"] = selectTip[i].getAttribute("data-value");
    }
  }

  return result.value;
}

const createElementTextError = () => {
  let span = document.createElement("span");
  span.setAttribute("class", "text-error");
  span.setAttribute("id", "msg-error");
  span.textContent = "Can`t be zero";
  numberPeople.parentElement.parentElement.appendChild(span);
};

const removeElementTextError = () => {
  if (document.getElementById("msg-error")) {
    numberPeople.parentElement.parentElement.removeChild(
      document.getElementById("msg-error")
    );
  }
};

/*******
 * Validate the entry of values ​​only of numeric type
 *******/

bill.addEventListener("keypress", allowToWriteOnlyNumbers);
bill.addEventListener("change", () => {
  if (bill.value > 0 && bill.value) {
    let getSelectTip = getTipValue() || custom.value;
    getResult(bill.value, getSelectTip, numberPeople.value);
  } else {
    getResult(0, 0, 0);
  }
});

[custom, numberPeople].forEach((element) =>
  element.addEventListener("keypress", allowToWriteOnlyWholeNumbers)
);
custom.addEventListener("change", () => {
  if (custom.value > 0 && custom.value) {
    generateAttrDataCheck();
    allUnCheckOptions();
    let getSelectTip = getTipValue() || custom.value;
    getResult(bill.value, getSelectTip, numberPeople.value);
  } else {
    getResult(0, 0, 0);
  }
});

numberPeople.addEventListener("blur", () => {
  if (numberPeople.value == 0) {
    createElementTextError();
    numberPeople.style.borderColor = "var(--cl-er1)";
    numberPeople.style.outlineColor = "var(--cl-er1)";
  } else {
    removeElementTextError();
    numberPeople.style.borderColor = "transparent";
    numberPeople.style.outlineColor = "var(--cl-border)";
  }
});

numberPeople.addEventListener("change", () => {
  if (numberPeople.value > 0 && numberPeople.value) {
    let getSelectTip = getTipValue() || custom.value;
    getResult(bill.value, getSelectTip, numberPeople.value);
  } else {
    getResult(0, 0, 0);
  }
});

selectTip.forEach((element) => {
  element.addEventListener("click", (e) => {
    custom.value = "";
    element.setAttribute("data-check", true);
    unCheckOptions(element);
    element.classList.remove("uncheck");
    element.classList.add("check");
    let getSelectTip = element.getAttribute("data-value") || custom.value;
    getResult(bill.value, getSelectTip, numberPeople.value);
  });
});

/*******
 * Validation to not allow to paste values
 *******/

for (let i in [bill, custom, numberPeople]) {
  [bill, custom, numberPeople][i].addEventListener("paste", (e) =>
    e.preventDefault()
  );
}

/*******
 * RESET ALL VALUES
 *******/
btn_reset.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-reset")) {
    let r_tipAmount = document.getElementById("tipAmount"),
      r_total = document.getElementById("total");
    generateAttrDataCheck();
    allUnCheckOptions();
    bill.value = "";
    numberPeople.value = "";
    custom.value = "";
    r_tipAmount.innerHTML = "$0.00";
    r_total.innerHTML = "$0.00";
    addStyleButtom("btn-disabled", "btn-reset");
  }
});
