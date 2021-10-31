import {CatalogActionType, CatalogModel} from "components/parts/settings/CatalogSettings";

export class CatalogUtils {

  static getTitle(type: CatalogActionType, model: CatalogModel) {
    let title = '';

    switch (type) {
      case CatalogActionType.ADD:
        title += 'Добавление ';
        break;
      case CatalogActionType.UPDATE:
        title += 'Редактирование ';
        break;
    }

    switch (model) {
      case CatalogModel.CATEGORY:
        title += 'категории';
        break;
      case CatalogModel.SUBCATEGORY:
        title += 'подкатегории';
        break;
      case CatalogModel.GROUP:
        title += 'группы'
        break;
    }

    return title;
  }

  static getInputLabel(model: CatalogModel) {
    switch (model) {
      case CatalogModel.CATEGORY:
        return 'Категория';
      case CatalogModel.SUBCATEGORY:
        return 'Подкатегория'
      case CatalogModel.GROUP:
        return 'Группа';
    }
  }

  static getInputPlaceholder(model: CatalogModel) {
    switch (model) {
      case CatalogModel.CATEGORY:
        return 'Введите категорию';
      case CatalogModel.SUBCATEGORY:
        return 'Введите подкатегорию'
      case CatalogModel.GROUP:
        return 'Введите группу';
    }
  }

  static getActionMessage(model: CatalogModel) {
    let message = '';

    switch (model) {
      case CatalogModel.CATEGORY:
        message += 'Категория';
        break;
      case CatalogModel.SUBCATEGORY:
        message += 'Подкатегория';
        break;
      case CatalogModel.GROUP:
        message += 'Группа'
        break;
    }

    message += ' успешно сохранена';
    return message;
  }

}
