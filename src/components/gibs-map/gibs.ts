// `https://map1.vis.earthdata.nasa.gov/wmts-geo/
// MODIS_Terra_CorrectedReflectance_TrueColor/default/2014-07-09/
// EPSG4326_250m/${tile.zoom}/${tile.y}/${tile.x}.jpg`,

// https://gibs.earthdata.nasa.gov/wmts/epsg{EPSG:Code}/best/
// {ProductName}/default/{Time}/{TileMatrixSet}/{ZoomLevel}/{TileRow}/{TileCol}.png
const gibs = {
  products: {
    MODIS_Terra_CorrectedReflectance_TrueColor: {
      value: 'MODIS_Terra_CorrectedReflectance_TrueColor',
      dateRange: ['2003-01-01', 'present'],
      tileMatrixSets: ['EPSG4326_250m'],
      format: 'jpg',
    },
    VIIRS_SNPP_CorrectedReflectance_TrueColor: {
      value: 'VIIRS_SNPP_CorrectedReflectance_TrueColor',
      dateRange: ['2020-04-25', 'present'],
      tileMatrixSets: ['EPSG4326_250m'],
      format: 'jpg',
    },
    MODIS_Terra_CorrectedReflectance_Bands367: {
      value: 'MODIS_Terra_CorrectedReflectance_Bands367',
      dateRange: ['2003-01-01', 'present'],
      tileMatrixSets: ['EPSG4326_250m'],
      format: 'jpg',
    },
    MODIS_Aqua_CorrectedReflectance_Bands721: {
      value: 'MODIS_Aqua_CorrectedReflectance_Bands721',
      dateRange: ['2003-01-01', 'present'],
      tileMatrixSets: ['EPSG4326_250m'],
      format: 'jpg',
    },
    MODIS_Terra_CorrectedReflectance_Bands721: {
      value: 'MODIS_Terra_CorrectedReflectance_Bands367',
      dateRange: ['2003-01-01', 'present'],
      tileMatrixSets: ['EPSG4326_250m'],
      format: 'jpg',
    },
  },
}
// , projection, product, date, tileMatrixSet)
// console.log(projection, product, date, tileMatrixSet)
const gibsImageServiceUrl = (tile: any, product: string, date: string) => `
https://map1.vis.earthdata.nasa.gov/wmts-geo/${product}/default/${date}/EPSG4326_250m/${tile.zoom}/${tile.y}/${tile.x}.jpg`

export { gibsImageServiceUrl, gibs }
