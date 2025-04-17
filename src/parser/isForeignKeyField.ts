export const isForeignKeyField = (fieldName, modelSchema) => typeof modelSchema[fieldName].ref !== 'undefined';
