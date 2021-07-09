import { GraphQLResolveInfo } from 'graphql';
import { fieldsList, fieldsMap } from 'graphql-fields-list';
import { Context, ModelTableMap } from './interfaces';

export const getResolverInfoFieldsList = (
  info: GraphQLResolveInfo,
  path?: string
) => fieldsList(info, { path });

export const getSelectedFieldsFromResolverInfo = (
  info: GraphQLResolveInfo,
  tableMap?: ModelTableMap,
  path?: string
): string[] => {
  const resolverFields = Object.keys(fieldsMap(info, { path }));

  if (tableMap) {
    return getModelFieldsFromResolverFields(resolverFields, tableMap);
  } else {
    return [];
  }
};

export const getModelFieldsFromResolverFields = (
  resolverFields: string[],
  model: ModelTableMap
): string[] => {
  const selectedFields = new Set<string>();

  for (const key of resolverFields) {
    if (model.fields?.includes(key)) {
      selectedFields.add(model.fields[model.fields.indexOf(key)]);
    }
  }

  return [...selectedFields];
};
