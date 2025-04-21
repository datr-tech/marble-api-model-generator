import * as schemas from "./schemas";
import fs from "node:fs";

/*
 * UPDATE PER RUN
 *
 * "dev": "npx tsx ./src/gen_models.ts"
 */
const serviceName = "persona";
const outPath = `/home/joealdersonstrachan/Desktop/freight/apps/${serviceName}-api/src/api/models`;

if (!fs.existsSync(outPath)) {
  fs.mkdirSync(outPath, { recursive: true });	
}

const doesOutPathExist = fs.existsSync(outPath);

const generateValidateImports = (foreignKeyFieldNames) => {
	let imports = "import {";

	if (!foreignKeyFieldNames.length) {
		return "";
	}

	foreignKeyFieldNames.forEach((foreignKeyFieldName, i) => {
		const validatorFieldName = foreignKeyFieldName.charAt(0).toUpperCase() + foreignKeyFieldName.slice(1);
		
		if (i == 0) {
			imports += "\n";
		}
		imports += `\tmodelValidator${validatorFieldName}`;

		if (i < (foreignKeyFieldNames.length - 1)) {
			imports += ",";
		}
			
		imports += "\n";
	});

	imports += `} from '@app-marble-api-model-generator/api/modelValidators';\n`;

	return imports;
};


const generateValidatePostStatements = (modelBaseName, foreignKeyFieldNames) => {
	let statements = "";
	
	if (!foreignKeyFieldNames.length) {
		return "";
	}

	foreignKeyFieldNames.forEach((foreignKeyFieldName) => {
		const validatorFieldName = foreignKeyFieldName.charAt(0).toUpperCase() + foreignKeyFieldName.slice(1);

		statements += `\t${modelBaseName}Schema.post('validate', modelValidator${validatorFieldName});\n`
	});

	return statements;
};


const generateModel = (modelClassName, modelBaseName, serviceName, validateImports, validatePostStatements) => {
	return`
		import { model, Schema } from 'mongoose';
		import { ${modelBaseName}ModelSchema, ${modelBaseName}ModelSchemaOptions } from '@freight/${serviceName}-model-schemas';
		${validateImports}

		const ${modelBaseName}Schema = new Schema(${modelBaseName}ModelSchema, ${modelBaseName}ModelSchemaOptions);

		${validatePostStatements}

		export const ${modelClassName} = model('${modelClassName}', ${modelBaseName}Schema);`
};



const isForeignKey = (fieldName, schema) => typeof schema[fieldName].ref !== "undefined";
const getModelBaseName = (schemaName) => schemaName.replace("ModelSchema", "");
const getModelClassName = (modelBaseName) => modelBaseName.charAt(0).toUpperCase() + modelBaseName.slice(1) + "Model";
const schemaNames = Object.keys(schemas);

schemaNames.forEach((schemaName) => {
	if (!schemaName.includes("Options")) {
		const schema = schemas[schemaName];
		const modelBaseName = getModelBaseName(schemaName);
		const modelClassName = getModelClassName(modelBaseName);
		
		const fieldNames = Object.keys(schemas[schemaName]);
		const foreignKeyFieldNames = fieldNames.filter((fieldName) => isForeignKey(fieldName, schema));

		const validateImports = generateValidateImports(foreignKeyFieldNames);
		const validatePostStatements = generateValidatePostStatements(modelBaseName, foreignKeyFieldNames);
		const model = generateModel(
			modelClassName,
			modelBaseName,
			serviceName,
			validateImports,
			validatePostStatements
		);

		const filePath = `${outPath}/${modelClassName}.ts`;
		console.log({ filePath });

		fs.writeFileSync(filePath, model, 'utf8');
	}
});
