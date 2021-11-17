const router = require('express').Router();
const Classes = require('./classes-model');
const { validateClass } = require('./classes-middleware');
const { restricted } = require('../auth/auth-middleware');

router.get('/', async (req, res, next) => {
  try {
    const classes = await Classes.getClasses();
    res.status(200).json(classes);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
    try{
        const classId = await Classes.getClassById(req.params.id)
        res.status(200).json(classId)
    }catch(err){
        next(err)
    }
});

router.post('/', validateClass, async (req, res, next) => {
    try{
        const newClass = await Classes.addClass(req.body)
        res.status(201).json(newClass)
    }catch(err){
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    try{
        const changes = req.body
  const { class_id } = req.params
        const updatedClass = await Classes.updateClass(class_id, changes)
        res.status(200).json(updatedClass)
    }catch(err){
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try{
        const deletedClass = await Classes.deleteClass(req.params.id)
        res.status(200).json(deletedClass)
    }catch(err){
        next(err)
    }
})

module.exports = router;
