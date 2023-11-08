import jsonpath from "jsonpath";

export interface ContentMapping {
  [key: string]: { jsonPath: string };
}

export const contentMapper = (data: Record<string, any>, mapping: ContentMapping) => {
  let mappedData = {};
  for (const [key, value] of Object.entries(mapping)) {
    if (data) {
      mappedData[key] = jsonpath.query(data, value.jsonPath)[0];
    }
  }
  return mappedData;
};
