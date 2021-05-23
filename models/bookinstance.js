let mongoose = require('mongoose');
const { DateTime } = require("luxon");


let Schema = mongoose.Schema;

let BookInstanceSchema = Schema(
    {
        book: {type: Schema.Types.ObjectId, ref: 'Book', required: true},
        imprint: {type: String, required: true},
        status: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
        due_back: {type: Date, default: Date.now},
    }
);

// Virtual for BookInstanceSchema's URL

BookInstanceSchema
    .virtual('url')
    .get(function(){
        return `/catalog/bookinstance/${this._id}`;
    });

BookInstanceSchema
    .virtual('due_back_formatted')
    .get(function () {
      return this.due_back
      ? DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED)
      : ''
    });

BookInstanceSchema
    .virtual('due_back_updated')
    .get(function(){
        return this.due_back
        ? this.due_back.toISOString().slice(0, 10)
        : ''
    });

module.exports = mongoose.model('BookInstance', BookInstanceSchema);