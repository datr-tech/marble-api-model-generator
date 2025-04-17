import { deriveModelsDirPath } from './deriveModelsDirPath';
import { parsePerSchema } from './parsePerSchema';

export const parse = (modelSchemasPerService, serviceName) => {
  const modelsDirPath = deriveModelsDirPath(serviceName);
  const modelSchemaNames = Object.keys(modelSchemasPerService);

  return {
    modelsDirPath,
    parsedModelSchemas: modelSchemaNames.map((modelSchemaName) => {
      const modelSchema = modelSchemasPerService[modelSchemaName];
      return parsePerSchema(modelSchema, modelSchemaName);
    }),
    serviceName,
  };
};
