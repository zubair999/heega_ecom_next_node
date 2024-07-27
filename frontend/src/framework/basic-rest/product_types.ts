export type NProduct = {
  _id: {
    $oid: string
  }
  id: {
    $numberLong: number
  }
  title: string
  body_html: string
  collection: Array<string>
  vendor: string
  product_type: string
  created_at: string
  handle: string
  updated_at: string
  published_at: string
  template_suffix: string
  published_scope: string
  tags: string
  status: string
  admin_graphql_api_id: string
  variants: Array<{
    id: number
    product_id: {
      $numberLong: number
    }
    title: string
    price: number
    sku: string
    position: number
    inventory_policy: string
    compare_at_price: string
    fulfillment_service: string
    inventory_management: string
    option1: string
    option2: string
    option3: any
    created_at: string
    updated_at: string
    taxable: boolean
    barcode: string
    grams: number
    weight: number
    weight_unit: string
    inventory_item_id: {
      $numberLong: string
    }
    inventory_quantity: number
    old_inventory_quantity: number
    requires_shipping: boolean
    admin_graphql_api_id: string
    image_id: any,
    option: Array<any>
  }>
  options: Array<{
    id: {
      $numberLong: string
    }
    product_id: {
      $numberLong: string
    }
    name: string
    position: number
    filter_option?: Array<string>
  }>
  images: Array<{
    id: {
      $numberLong: string
    }
    alt: any
    position: number
    product_id: {
      $numberLong: string
    }
    created_at: string
    updated_at: string
    admin_graphql_api_id: string
    width: number
    height: number
    src: string
    variant_ids: Array<any>
  }>
  image: {
    id: {
      $numberLong: string
    }
    alt: any
    position: number
    product_id: {
      $numberLong: string
    }
    created_at: string
    updated_at: string
    admin_graphql_api_id: string
    width: number
    height: number
    src: string
    variant_ids: Array<any>
  }
}
