import { isForeignKeyField } from './isForeignKeyField';

export const deriveModelForeignKeyFieldNames = (modelFieldNames, modelSchema) =>
  modelFieldNames.filter((modelFieldName) => isForeignKeyField(modelFieldName, modelSchema));
