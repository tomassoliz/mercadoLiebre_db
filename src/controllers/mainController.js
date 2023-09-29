/* base de datos */

const db = require('../database/models')
const { Op } = require('sequelize');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {

		// return res.render('index', {
		// 	visited: products.filter(product => product.category === 'visited'),
		// 	sale: products.filter(product => product.category === 'in-sale'),
		// 	toThousand
		// })

		const visited = db.Product.findAll({
			where: {
				categoryId: 1
			}
		})
		const sale = db.Product.findAll({
			where: {
				categoryId: 2
			}
		})

		Promise.all([visited, sale])
			.then(([visited, sale]) => {
				return res.render('index', {
					visited,
					sale,
					toThousand
				})
			}).catch(error => console.log(error))
	},

	search: (req, res) => {

		// const results = db.Product.findAll({
		// 	where: {
		// 		name: {
		// 			[Op.like]: `%${keywords}%`
		// 		}
		// 	}
		// })

		const keywords = req.query.keywords.toLowerCase();

		db.Product.findAll({
			where: {
				[Op.or]: [
					{
						name: {
							[Op.substring]: keywords
						}
					},
					{
						description: {
							[Op.substring]: keywords
						}
					}

				]

			}
		})
			.then((results) => {
				return res.render('results', {
					results,
					keywords,
					toThousand
				})
			}).catch(error => console.log(error))
	}
};

module.exports = controller;
