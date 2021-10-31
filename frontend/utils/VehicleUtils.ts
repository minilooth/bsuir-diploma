import {VehicleActionType, VehicleModel} from "components/parts/settings/VehicleSettings";

export class VehicleUtils {

  static getTitle(type: VehicleActionType, model: VehicleModel) {
    let title = '';

    switch (type) {
      case VehicleActionType.ADD:
        title += 'Добавление ';
        break;
      case VehicleActionType.UPDATE:
        title += 'Редактирование ';
        break;
    }

    switch (model) {
      case VehicleModel.MAKE:
        title += 'марки';
        break;
      case VehicleModel.MODEL:
        title += 'модели';
        break;
      case VehicleModel.GENERATION:
        title += 'поколения'
        break;
    }

    return title;
  }

  static getInputLabel(model: VehicleModel) {
    switch (model) {
      case VehicleModel.MAKE:
        return 'Марка';
      case VehicleModel.MODEL:
        return 'Модель'
      case VehicleModel.GENERATION:
        return 'Поколение';
    }
  }

  static getInputPlaceholder(model: VehicleModel) {
    switch (model) {
      case VehicleModel.MAKE:
        return 'Введите марку';
      case VehicleModel.MODEL:
        return 'Введите модель'
      case VehicleModel.GENERATION:
        return 'Введите поколение';
    }
  }

  static getActionMessage(model: VehicleModel) {
    let message = '';

    switch (model) {
      case VehicleModel.MAKE:
        message += 'Марка';
        break;
      case VehicleModel.MODEL:
        message += 'Модель';
        break;
      case VehicleModel.GENERATION:
        message += 'Поколение'
        break;
    }

    message += ' успешно ';

    if (model === VehicleModel.GENERATION) {
      message += 'сохранено';
    }
    else {
      message += 'сохранена';
    }

    return message;
  }

}
