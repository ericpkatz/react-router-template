const app = require('express').Router();
const models = require('./db').models;
const jwt = require('jwt-simple');

module.exports = app;

const JWT_SECRET = process.env.JWT_SECRET;


app.get('/products', (req, res, next)=> {
  models.Product.findAll({ order: 'name'})
    .then( products => res.send(products ))
    .catch(next);
});

app.delete('/products/:id', (req, res, next)=> {
  models.Product.destroy({ where: { id: req.params.id}})
    .then( () => res.sendStatus(204))
    .catch(next);
});

app.put('/auth/:token', (req, res, next)=> {
  const token = jwt.decode(req.params.token, JWT_SECRET); 
  models.User.findById(token.id)
    .then( user => {
      Object.assign(user, req.body);
      return user.save();
    })
    .then( user => res.send(user))
    .catch(next);
});

app.get('/auth/:token', (req, res, next)=> {
  const token = jwt.decode(req.params.token, JWT_SECRET); 
  models.User.findById(token.id)
    .then( user => res.send(user));
});

app.post('/auth', (req, res, next)=> {
  models.User.findOne({ 
    where: {
      name: req.body.name,
      password: req.body.password
    }
  })
  .then( user => {
    if(!user){
      return res.sendStatus(401);
    }
    const token = jwt.encode({ id: user.id }, JWT_SECRET); 
    res.send({ token });
  });
});
