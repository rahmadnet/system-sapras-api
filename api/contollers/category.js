const mongoose = require('mongoose');
const Category = require('../routes/models/category');

// membuat category baru
exports.category_create_category = (req, res, next) => {
    const category = new Category({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        desc: req.body.desc
    });
    category.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Created category successfully',
            createCategory: {
                _id: result._id,
                name: result.name,
                desc: result.desc,
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/category/' + result._id
                }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
};

// menampilkan semua category
exports.category_get_all = (req, res, next) => {
    Category.find().select('_id name desc')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            category: docs.map(doc => {
                return {
                    _id: doc._id,
                    name: doc.name,
                    desc: doc.desc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/category/' + doc._id
                    }
                }
            })
        };
        res.status(200).json(response);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

// menampilkan category berdasarkan ID
exports.category_get_category = (req, res, next) =>{
    const id = req.params.categoryId;
    Category.findById(id)
    .select('_id name desc')
    .exec()
    .then(doc => {
        console.log("From DataBase", doc);
        if(doc){
            res.status(200).json({
                category: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/category/' + id
                }
            });
        } else {
            res.status(404).json({
                message: `No valid entry found provided ID ${id}`
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

// update category berdasarkan ID
exports.category_update_category = (req, res, next) => {
    const id = req.params.categoryId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Category.update({
            _id: id
        }, {
            $set: updateOps
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Category Updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/category/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

// delete category berdasarkan ID
exports.category_delete_category = (req, res, next) => {
    const id = req.params.categoryId;
    Category.remove({
            _id: id
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Category deleted',
                request: {

                    type: 'DELETE',
                    url: 'http://localhost:3000/category/' + id,
                    body: {
                        name: 'String',
                        desc: 'String'
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};