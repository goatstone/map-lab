import { gibs, Product } from '../gibs'

interface ProductSelect {
  (setProduct: any): { key: string }
}

const productSelect: ProductSelect = setProduct => {
  const items: Product[] = []
  gibs.products.multibandImagery.forEach(product => {
    const item: any = {
      key: product.imageLayer,
      text: product.description,
      onClick: () => setProduct(product.imageLayer),
    }
    items.push(item)
  })

  return {
    key: 'gibs-products',
    text: 'Gibs Products',
    iconProps: { iconName: 'ProductList' },
    subMenuProps: {
      items,
    },
  }
}

export default productSelect
