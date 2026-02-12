const Joi = require('joi');

const expenseSchema = Joi.object({
    title: Joi.string().min(3).max(50).required().messages({
        'string.min': 'Title must be at least 3 characters long',
        'any.required': 'Title is mandatory'
    }),
    amount: Joi.number().positive().required().messages({
        'number.positive': 'Amount must be greater than 0',
        'any.required': 'Amount is required'
    }),
    category: Joi.string().valid('Food', 'Transport', 'Rent', 'Entertainment', 'Shopping', 'Health', 'Education', 'Other').required(),
    date: Joi.date().iso().optional()
});

exports.validateExpense = (req, res, next) => {
    const { error } = expenseSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};