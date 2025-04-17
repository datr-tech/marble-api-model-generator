import { deriveModelBaseName } from './deriveModelBaseName';
import { deriveModelClassName } from './deriveModelClassName';
import { deriveModelFieldNames } from './deriveModelFieldNames';
import { deriveModelForeignKeyFieldNames } from './deriveModelForeignKeyFieldNames';

export const parsePerSchema = (modelSchema, modelSchemaName) => {
  const modelBaseName = deriveModelBaseName(modelSchemaName);
  const modelClassName = deriveModelClassName(modelBaseName);
  const modelFieldNames = deriveModelFieldNames(modelSchema, modelSchemaName);
  const modelForeignKeyFieldNames = deriveModelForeignKeyFieldNames(modelFieldNames, modelSchema);

  return {
    modelBaseName,
    modelClassName,
    modelFieldNames,
    modelForeignKeyFieldNames,
  };
};
