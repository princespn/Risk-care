export function buildSgiXml(data) {
  return `<SGIRequest><Premium>${data?.premium || 0}</Premium></SGIRequest>`;
}
