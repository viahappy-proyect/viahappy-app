const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const searchSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    zone: String,
    place: String,
    bussineses_id: [{ type: Schema.Types.ObjectId, ref: 'Bussineses' }]
}, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });
searchSchema.index({location: "2dsphere"})
const Search = mongoose.model('Search', searchSchema);
module.exports = Search

// searches: [
//     {
//         zone: String,
//         place: String
//     }
// ]