const knex = require('../bancodedados/conexao');

async function listarRestaurantes (req, res) {
    try {
        const restaurantes = await knex('restaurante').returning('*');

        return res.status(200).json(restaurantes);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

async function obterRestaurante (req, res) {
    const { id: restauranteId } = req.params;

    try {
        const restaurante = await knex('restaurante')
            .where({ id: restauranteId })
            .first();
            
        if (!restaurante) {
            return res.status(404).json('Restaurante não encontrado');
        }

        return res.status(200).json(restaurante);

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

async function listarProdutosAtivos (req, res) {
    const { id: restauranteId } = req.params;

    try {
        const produtos = await knex('produto')
            .where({ restaurante_id: restauranteId })
            .returning('*');

        return res.status(200).json(produtos);

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

async function obterProduto (req, res) {
    const { id: restauranteId, idProduto } = req.params;
    console.log(req.params);

    try {
        const produto = await knex('produto')
            .where({ restaurante_id: restauranteId, id: idProduto })
            .first();
            
        if (!produto) {
            return res.status(404).json('Produto não encontrado');
        }

        return res.status(200).json(produto);

    } catch (error) {
        return res.status(400).json(error.message);
    }
}


module.exports = {
    listarRestaurantes,
    obterRestaurante,
    listarProdutosAtivos,
    obterProduto
}