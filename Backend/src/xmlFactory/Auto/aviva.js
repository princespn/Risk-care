export function buildGaXml(data) {
  return `<GARequest><Premium>${data?.premium || 0}</Premium></GARequest>`;
}
