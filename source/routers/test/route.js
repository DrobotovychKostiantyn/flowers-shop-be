import dg from 'debug';

const debug = dg('router:test');

export const test = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        res.sendStatus(200);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
