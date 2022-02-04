var controller = (function (budgetCtrl, uiCtrl) {
  var setupEventListeners = function () {
    var DOM = uiCtrl.getDOMstrings();
    document.querySelector(DOM.form).addEventListener("submit", ctrlAddItem);
    // клик по секции с доходами и расходами
    document
      .querySelector(DOM.budgetTable)
      .addEventListener("click", ctrlDeleteItem);
  };
  // Обновляем проценты у каждой записи
  function updatePercentages() {
    // посчитать проценты для кажой записи типа Exp
    budgetCtrl.calculatePercantges();
    // получаем данные из модели по процентам: id и его процент
    var idsAndPercents = budgetCtrl.getAllIdsAndPercentages();
    // Обновить UI с новыми процентами
    uiCtrl.updateItemsPercentages(idsAndPercents);
  }

  function ctrlAddItem(event) {
    event.preventDefault();

    // получить данные из формы
    var input = uiCtrl.getInput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // Добавить полученные данные в модель
      var newItem = budgetCtrl.addItem(
        input.type,
        input.description,
        input.value
      );
      budgetCtrl.test();

      // Добавить полученную запись/объект в UI
      uiCtrl.renderListItem(newItem, input.type);
      uiCtrl.clearFields();
      generateTestData.init();
      // Посчитать бюджет и отобразить в UI
      updateBudget();
      // Посчитали проценты у каждой записи
      updatePercentages();
    } else {
      alert("Введите описание и сумму");
    }
  }

  function ctrlDeleteItem(event) {
    var itemId, splitId, type, ID;
    if (event.target.closest(".item__remove")) {
      itemId = event.target.closest("li.budget-list__item").id;
      splitId = itemId.split("-"); // inc-0 => ["inc", "0"]
      type = splitId[0];
      ID = parseInt(splitId[1]);
      budgetCtrl.deleteItem(type, ID);
      uiCtrl.deleteListItem(itemId);
      // Посчитать бюджет и отобразить в UI
      updateBudget();
      // Посчитали проценты у каждой записи
      updatePercentages();
    }
  }

  function updateBudget() {
    // Расчитывает бюджет в модели
    budgetCtrl.calculateBudget();
    // Получаем расчтитаный бюджет из модели
    budgetObj = budgetCtrl.getBudget();

    //  Отображаем бюджет в шаблоне
    uiCtrl.updateBudget(budgetObj);
  }

  return {
    init: function () {
      uiCtrl.displayMonth();
      setupEventListeners();
      uiCtrl.updateBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: 0,
      });
    },
  };
})(modelController, viewController);

controller.init();
