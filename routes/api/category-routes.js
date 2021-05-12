const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ['product_name', 'price', 'stock']
      }
    ]
  })
  .then(results => res.json(results))
  .catch(err => {
      res.json(err)
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [Product]
  })
  .then(results => res.json(results))
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(results => res.json(results))
  .catch(err => {
    if(err) {
      res.status(500).json(err)
    }
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(results => res.json(results))
  .catch(err => {
    if(err) {
      res.status(500).json(err)
    }
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(results => {
    if(!results) {
      res.status(404).json({ message: 'Product not found' })
    }
    res.json(results)
  })
  .catch(err => {
    res.json(err)
  })
});

module.exports = router;
