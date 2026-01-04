const fs = require('fs');
const path = require('path');
// Загружаем модуль. В этой библиотеке функция экспортируется под именем icsToJson
const icsToJsonModule = require('ics-to-json');

/**
 * В зависимости от версии и окружения Node.js, 
 * именованный экспорт может быть доступен напрямую или через .default
 */
const convert = icsToJsonModule.icsToJson || (icsToJsonModule.default && icsToJsonModule.default.icsToJson);

/**
 * Основная функция конвертации
 * @param {string} inputPath - путь к исходному .ics файлу
 */
const convertIcsToJson = (inputPath) => {
  try {
    // Проверка: удалось ли найти функцию icsToJson в модуле
    if (typeof convert !== 'function') {
      throw new Error(
        "Не удалось найти функцию 'icsToJson'. Проверьте, установлена ли библиотека: npm install ics-to-json"
      );
    }

    // 1. Проверяем существование файла
    if (!fs.existsSync(inputPath)) {
      console.error("Ошибка: Файл не найден по адресу", inputPath);
      return;
    }

    // 2. Читаем содержимое .ics файла
    const icsData = fs.readFileSync(inputPath, 'utf-8');

    // 3. Конвертируем данные
    // Вызываем функцию icsToJson, которую мы извлекли выше
    const jsonData = convert(icsData);

    // 4. Формируем путь для выходного файла
    const parsedPath = path.parse(inputPath);
    const outputPath = path.join(parsedPath.dir, parsedPath.name + '.json');

    // 5. Записываем результат в файл с форматированием
    fs.writeFileSync(outputPath, JSON.stringify(jsonData, null, 2));

    console.log(`Успех! Данные извлечены и сохранены в: ${outputPath}`);
  } catch (error) {
    console.error("Произошла ошибка при конвертации:", error.message);
  }
};

// Получаем путь к файлу из аргументов командной строки
const filePath = process.argv[2];

if (!filePath) {
  console.log("Использование: node converter.js <путь_к_файлу.ics>");
} else {
  convertIcsToJson(filePath);
}
