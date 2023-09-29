const {existsSync, unlinkSync} = require('fs')
const db = require('../database/models')
const { validationResult } = require('express-validator')

const fs = require('fs');
const path = require('path');
const { response } = require('express');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {

	index: (req, res) => {

		db.Product.findAll()
			.then(products => {
				return res.render('products', {
					products,
					toThousand
				})
			}).catch(error => console.log(error))
	},

	detail: (req, res) => {
		db.Product.findByPk(req.params.id)
			.then(product => {
				return res.render('detail', {
					...product.dataValues,
					toThousand
				})
			}).catch(error => console.log(error))
	},
	
	create: (req, res) => {
		db.Category.findAll()
			.then(categories => {
				console.log(categories);
				return res.render('product-create-form', {
					categories
				})
			})
			.catch(error => console.log(error))
	},

	store: (req, res) => {

		const errors = validationResult(req)

		console.log("body", req.body);
		if (errors.isEmpty()) {
			const { name, price, description, categoryId, discount, image} = req.body;

			db.Product.create({
				name: name.trim(),
				price: price,
				discount: discount || 0,
				categoryId: categoryId,
				description: description.trim(),
				image: req.file ? req.file.filename : image
			})
				.then(product => {
					console.log(product);
					return res.redirect('/')
				})
				.catch(error => console.log(error))
		} else {
			if (req.file) {
				existsSync('./public/images/' + req.file.filename) &&
				unlinkSync('./public/images/' + req.file.filename)
			}
			db.Category.findAll()
			.then(categories => {
				console.log(categories);
				return res.render("product-create-form", {
					errors: errors.mapped(),
					old: req.body,
					categories
				});
			})
			.catch(error => console.log(error))			
		}
	},

	edit: (req, res) => {
		const categories = db.Category.findAll()
		const product = db.Product.findByPk(req.params.id)

		Promise.all([categories, product])
			.then(([categories, product]) => {
				return res.render('product-edit-form', {
					categories,
					...product.dataValues
				})
			})
			.catch(error => console.log(error))
	},

	update: (req, res) => {

		const { name, price, description, categoryId, discount, image } = req.body;

		db.Product.update(
			{
				name: name.trim(),
				price,
				discount,
				categoryId,
				description: description.trim(),
				image: req.file ? req.file.filename : image
			},
			{
				where: {
					id: req.params.id
				}
			}
		)
			.then(response => {
				console.log(response);
				return res.redirect('/products/detail/' + req.params.id)
			})
			.catch(error => console.log(error))

	},
	destroy: (req, res) => {

		db.Product.destroy({
			where: {
				id: req.params.id
			}
		})
			.then(response => {
				console.log(response);
				return res.redirect('/products')
			})
			.catch(error => console.log(error))

	}
};

module.exports = controller;