const menu = createMenu("menu", "menu__list", "menu__item");

menu.addCategory("movies", [
  ["fantasy", "yearOfRelease"],
  ["romance", "yearOfRelease"],
  ["animation", "yearOfRelease"],
]);

menu.addCategory("movies/fantasy/yearOfRelease", [
  ["2023", "moviesOf2023"],
  ["2022", "moviesOf2022"],
  ["2021", "moviesOf2021"],
]);
menu.addCategory("movies/fantasy/yearOfRelease/2023/moviesOf2023", [
  ["Стражи галактики", ""],
  ["Русалочка", ""],
  ["Дюна 2", ""],
  ["Трилогия о богах", ""],
]);

menu.addCategory("movies/fantasy/yearOfRelease/2022/moviesOf2022", [
  ["Тор:Любовь и гром", ""],
  ["Чёрный Адам", ""],
  ["Мобиус", ""],
  ["Проект 'Адам' ", ""],
]);

menu.addCategory("movies/fantasy/yearOfRelease/2021/moviesOf2021", [
  ["День курка", ""],
  ["Первый клон", ""],
  ["Жуткая семейка", ""],
]);

menu.test();

function createMenu(id, listClass, itemClass) {
  if (!id || typeof id != "string") {
    throw new Error("Параметор не определён или не является строкой");
  }

  const menuWrapper = document.getElementById(id);
  const categoryRepository = new Map();

  function generateСategory(categoryName) {
    if (!categoryRepository.has(categoryName)) {
      throw new Error("categoryName undefined");
    }

    const category = categoryRepository.get(categoryName);

    let ul = document.createElement("ul");
    ul.classList.add(listClass);
    ul.dataset.categoryName = categoryName;

    for (const element of category) {
      const li = document.createElement("li");

      li.textContent = element[0];
      li.addEventListener("click", () => {
        if (typeof element[1] == "string") {
          generateСategory(`${categoryName}/${element[0]}/${element[1]}`);
        }
      });
      li.classList.add(itemClass);

      ul.appendChild(li);
    }
    menuWrapper.innerHTML = "";
    menuWrapper.append(ul);
  }

  return {
    addCategory(name, MAPstructure) {
      const catigoryStructure = new Map();

      MAPstructure.forEach((element) => {
        catigoryStructure.set(element[0], element[1]);
      });

      categoryRepository.set(name, catigoryStructure);
    },
    addSubcategory() {},
    test() {
      generateСategory("movies");
    },
  };
}
