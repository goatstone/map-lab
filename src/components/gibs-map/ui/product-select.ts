interface ProductSelect {
  (setProduct: any): any
}

const productSelect: ProductSelect = setProduct => {
  console.log(setProduct)
  return {
    key: 'gibs-products',
    text: 'Gibs Products',
    iconProps: { iconName: 'ProductList' },
    subMenuProps: {
      items: [
        {
          key: 'MODIS_Terra_CorrectedReflectance_TrueColor',
          text: 'MODIS_Terra_CorrectedReflectance_TrueColor',
          onClick: () => setProduct('MODIS_Terra_CorrectedReflectance_TrueColor'),
        },
        {
          key: 'VIIRS_SNPP_CorrectedReflectance_TrueColor',
          text: 'VIIRS_SNPP_CorrectedReflectance_TrueColor',
          onClick: () => setProduct('VIIRS_SNPP_CorrectedReflectance_TrueColor'),
        },
      ],
    },
  }
}

export default productSelect
