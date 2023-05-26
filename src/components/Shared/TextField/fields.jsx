export const field = {
  user: {
    name: 'user',
    type: 'text',
    placeholder: 'User name*',
    title: 'The name must be greater than 2 characters',
    required: true,
  },
  email: {
    name: 'email',
    type: 'text',
    placeholder: 'Електронна пошта*',
    required: true,
  },
  password: {
    name: 'password',
    type: 'password',
    placeholder: 'Пароль (від 8 символів)*',
    required: true,
    title: 'Пароль має бути не менше 8 символів',
  },
  filter: {
    type: 'text',
    name: 'filter',
    placeholder: 'Select filter value',
  },
  price: {
    name: 'price',
    type: 'text',
    placeholder: 'Ціна за одиницю*',
    required: true,
  },
  category: {
    name: 'category',
    type: 'text',
    placeholder: 'Категорія*',
    required: true,
  },
  shopName: {
    name: 'shopName',
    type: 'text',
    placeholder: 'Назва закладу*',
    required: true,
  },
  description: {
    name: 'description',
    type: 'text',
    placeholder: 'Опис товару*',
    required: true,
  },
};
