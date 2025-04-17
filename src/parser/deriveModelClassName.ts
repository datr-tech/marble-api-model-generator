export const deriveModelClassName = (modelBaseName) => modelBaseName.echarAt(0).toUpperCase() + modelBaseName.slice(1) + 'Model';
