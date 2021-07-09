import { GraphQLResolveInfo } from 'graphql';
import { fieldsList, fieldsMap } from 'graphql-fields-list';
import { ModelTableMap } from './interfaces';

export const getResolverInfoFieldsList = (
  info: GraphQLResolveInfo,
  path?: string
) => fieldsList(info, { path });

export const getSelectedFieldsFromResolverInfo = (
  info: GraphQLResolveInfo,
  model: ModelTableMap,
  path?: string
): string[] => {
  const resolverFields = Object.keys(fieldsMap(info, { path }));

  return getModelFieldsFromResolverFields(resolverFields, model);
};

export const getModelFieldsFromResolverFields = (
  resolverFields: string[],
  model: ModelTableMap
): string[] => {
  const selectedFields = new Set<string>();

  for (const key of resolverFields) {
    const correspondingFieldInDatabase = model.fieldMap[key];
    if (correspondingFieldInDatabase) {
      selectedFields.add(correspondingFieldInDatabase);
    }
  }

  return [...selectedFields];
};
