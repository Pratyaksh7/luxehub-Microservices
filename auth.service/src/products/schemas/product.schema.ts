import  * as mongoose from 'mongoose';


export const ProductSchema = new mongoose.Schema(
    {
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
    },
    { timestamps: true },
  );
  
//   // Add text index
//   ProductSchema.index({ name: 'text', description: 'text', tags: 'text' });