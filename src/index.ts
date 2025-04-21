import * as dolomiteModelSchemas from '@freight/dolomite-model-schemas';
import * as entityModelSchemas from '@freight/entity-model-schemas';
import * as freightModelSchemas from '@freight/freight-model-schemas';
import * as granul8ModelSchemas from '@freight/granul8-model-schemas';
import * as personaModelSchemas from '@freight/persona-model-schemas';
import * as procModelSchemas from '@freight/proc-model-schemas';
import { parser } from '@app-marble-api-model-generator/parser';

const servicesModelSchemas = [
  {
    modelSchemasPerService: dolomiteModelSchemas,
    serviceName: 'dolomite',
  },
  {
    modelSchemasPerService: entityModelSchemas,
    serviceName: 'entity',
  },
  {
    modelSchemasPerService: freightModelSchemas,
    serviceName: 'freight',
  },
  {
    modelSchemasPerService: granul8ModelSchemas,
    serviceName: 'granul8',
  },
  {
    modelSchemasPerService: personaModelSchemas,
    serviceName: 'persona',
  },
  {
    modelSchemasPerService: procModelSchemas,
    serviceName: 'proc',
  },
];

const servicesParsedSchemas = servicesModelSchemas.map(({ modelSchemasPerService, serviceName }) =>
  parser.parse(modelSchemasPerService, serviceName),
);

console.log({ servicesParsedSchemas });
