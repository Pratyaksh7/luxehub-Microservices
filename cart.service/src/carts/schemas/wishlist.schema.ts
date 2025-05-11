import * as mongoose from 'mongoose';

export const WishlistSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: [
        {
            id: String,
            name: String,
            description: String,
            categories: [String],
            price: Number,
            currencies: [String],
            stock_qty: Number,
            manufacturer: String,
            images: [String],
            attributes: {
                type: Map,
                of: mongoose.Schema.Types.Mixed,
            },
            tags: [String],
            rating: Number,
            reviews: [
                {
                    userid: String,
                    comment: String,
                    rating: Number,
                },
            ],
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ]
})