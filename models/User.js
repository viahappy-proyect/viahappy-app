const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  search_id: [{ type: Schema.Types.ObjectId, ref: 'Search' }],
  bussineses_id: [{ type: Schema.Types.ObjectId, ref: 'Bussineses' }]

}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
