import contactModel from "../models/contactModel.js";

const contactController = async (req, res) => {
    try {

        await contactModel.create(req.body);
        res.status(200).json({response: 'SENT'})

    } catch (error) {
        res.status(500).json({error});
    }
    ;
}

export default contactController;