var generateTestData = (function () {
  var ExampleItem = function (type, desc, sum) {
    this.type = type;
    this.desc = desc;
    this.sum = sum;
  };

  var testData = [
    new ExampleItem("inc", "Зарплата", 75000),
    new ExampleItem("inc", "Фриланс", 30000),
    new ExampleItem("inc", "Дивиденды", 10000),
    new ExampleItem("inc", "Кэшбэк", 5000),
    new ExampleItem("inc", "Аренда", 40000),
    new ExampleItem("exp", "Рента", 35000),
    new ExampleItem("exp", "Продукты", 20000),
    new ExampleItem("exp", "Аптека", 2000),
    new ExampleItem("exp", "Транспорт", 5000),
    new ExampleItem("exp", "Развлечения", 15000),
  ];
  function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
  }

  function insertUI() {
    var randomIndex = getRandomIndex(testData.length);
    var randomItem = testData[randomIndex];
    document.querySelector("#input__type").value = randomItem.type;
    document.querySelector("#input__description").value = randomItem.desc;
    document.querySelector("#input__value").value = randomItem.sum;
  }

  return {
    init: insertUI,
  };
})();
generateTestData.init();
