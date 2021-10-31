import {MAMActionType, MAMModel} from "components/parts/settings/MAMSettings";

export class MAMUtils {

  static getTitle(type: MAMActionType, model: MAMModel) {
    let title = '';

    switch (type) {
      case MAMActionType.ADD:
        title += 'Добавление ';
        break;
      case MAMActionType.UPDATE:
        title += 'Редактирование ';
        break;
    }

    switch (model) {
      case MAMModel.MODIFICATION:
        title += 'модификации';
        break;
      case MAMModel.MANUFACTURER:
        title += 'производителя';
        break;
    }

    return title;
  }

  static getInputLabel(model: MAMModel) {
    switch (model) {
      case MAMModel.MODIFICATION:
        return 'Модификация';
      case MAMModel.MANUFACTURER:
        return 'Производитель'
    }
  }

  static getInputPlaceholder(model: MAMModel) {
    switch (model) {
      case MAMModel.MODIFICATION:
        return 'Введите модификацию';
      case MAMModel.MANUFACTURER:
        return 'Введите производителя'
    }
  }

  static getActionMessage(model: MAMModel) {
    let message = '';

    switch (model) {
      case MAMModel.MODIFICATION:
        message += 'Модификация';
        break;
      case MAMModel.MANUFACTURER:
        message += 'Производитель';
        break;
    }

    message += ' успешно ';

    if (model === MAMModel.MANUFACTURER) {
      message += 'сохранен';
    }
    else {
      message += 'сохранена';
    }

    return message;
  }

}
