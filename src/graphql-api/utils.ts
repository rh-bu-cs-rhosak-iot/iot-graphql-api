import { GraphQLResolveInfo } from 'graphql';
import { fieldsList, fieldsMap } from 'graphql-fields-list';
import { Context, LooseObject, ModelTableMap } from './interfaces';

export const getResolverInfoFieldsList = (
  info: GraphQLResolveInfo,
  path?: string
) => fieldsList(info, { path });

export const getSelectedFieldsFromResolverInfo = (
  info: GraphQLResolveInfo,
  tableMap?: ModelTableMap,
  path?: string
): string[] => {
  const resolverFields = getFieldsFromResolver(info, path);

  return getSelectedFields(resolverFields, tableMap);
};

export const getSelectedFields = (
  fields: string[],
  tableMap?: ModelTableMap
): string[] => {
  if (tableMap) {
    return getModelFieldsFromResolverFields(fields, tableMap);
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

export const getFieldsFromResolver = (
  info: GraphQLResolveInfo,
  path?: string
): string[] => {
  return Object.keys(fieldsMap(info, { path }));
};

export const populateObject = (fields: string[], from: any): LooseObject => {
  let obj:LooseObject = {};
  for (let f in fields) {
    obj[fields[f]] = from[fields[f]];
  }
  return obj;
}