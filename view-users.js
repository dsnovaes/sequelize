const Sequelize = require('sequelize');
const database = require('./db');


router.get('/usuarios', (req, res) => {
    (async () => {
        const User = require('./user');

        try {
            const resultado = await database.sync();
            const result = await User.findAll({
                limit: 3,
                offset: 3
            });
        } catch (error) {
            console.log(error);
        }

    })();
})

