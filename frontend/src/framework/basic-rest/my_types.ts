export type Collection = {
    "_id": {
      "$oid": {
        "type": "ObjectId"
      }
    },
    "slug": {
      "type": "String"
    },
    "title": "String",
    "updated_at": {
      "type": "Date"
    },
    "description": {
      "type": "String"
    },
    "published_at": {
      "type": "Date"
    },
    "sort_order": {
      "type": "String"
    },
    "template_suffix": {
      "type": "Mixed"
    },
    "products_count": {
      "type": "Number"
    },
    "collection_type": {
      "type": "String"
    },
    "published_scope": {
      "type": "String"
    },
    "admin_graphql_api_id": {
      "type": "String"
    },
    "image": {
      "created_at": {
        "type": "Date"
      },
      "alt": {
        "type": "String"
      },
      "width": {
        "type": "Number"
      },
      "height": {
        "type": "Number"
      },
      src: "String"
    }
  }
  

//   export type Filter = {
//     id:          number;
//     filter_name: string;
//     options:     {
//       id:    number;
//       label: string;
//       slug:  string;
//   }
// }

export type Filter = {
  "_id": {
    "type": "ObjectId"
  },
  "collection_id": {
    "type": "ObjectId"
  },
  "options": {
    "type": [
      "Mixed"
    ]
  }
}

export type Option = {
    id:    number;
    label: string;
    slug:  string;
}

export type User = {
  _id:string;
  googleId: string;
  displayName: string;
  email: string;
  _v: number;
  addresses: [Address]
}

type Address = {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  streetAddress: string;
  townCity: string;
  state: string;
  country: string;
  pincode: string;
  additionalInformation: string;
  isSubscribed: boolean;
  isTerm: boolean;
  isDefault: boolean;
}


type ORDER = {
  order_id: string;
  customer_id: string;
  items: ORDERITEM[];
}

type ORDERITEM = {
  id: string;
  title: string;
  variant: string;
  price: number;
  image: string;
  quantity: number;
  key: number;
  itemTotal: number;
}