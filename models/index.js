// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
const { models } = require('../config/connection');

// Products belongsTo Category
models.Product.belongsTo(models.Category,
  {
    foreignKey: 'category_id'
  }
)
// Categories have many Products
models.Category.hasMany(models.Product,
  {
    foreignKey: 'category_id',
    onDelete: 'SET NULL'
  }
)
// Products belongToMany Tags (through ProductTag)
models.Product.belongsToMany(Tag, 
  {
    through: ProductTag,
    foreingKey: 'product_id'
  }
)
// Tags belongToMany Products (through ProductTag)
models.Tag.belongsToMany(Product, 
  {
    through: ProductTag,
    foreignKey: 'tag_id'
  }
  )


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
