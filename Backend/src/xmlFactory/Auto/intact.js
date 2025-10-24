export function buildIntactXml(data) {
  return `<IntactRequest><Premium>${data?.premium || 0}</Premium></IntactRequest>`;
}
