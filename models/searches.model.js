const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const searchSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    zone: String,
    place: String

}, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

const Search = mongoose.model('Search', searchSchema);
module.exports = Search

// searches: [
//     {
//         zone: String,
//         place: String
//     }
// ]