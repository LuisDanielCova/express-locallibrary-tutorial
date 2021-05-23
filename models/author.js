let mongoose = require('mongoose');
const { DateTime } = require("luxon");

let Schema = mongoose.Schema;

let AuthorSchema = Schema(
    {
        first_name: {type: String, required: true, maxLength: 100},
        family_name: {type: String, required: true, maxLength: 100},
        date_of_birth: {type: Date},
        date_of_death: {type: Date},
    }
);

// Virtual for author's full name
AuthorSchema
    .virtual('name')
    .get(function(){
        return `${this.family_name}, ${this.first_name}`;
    });


// Virtual for author's lifespan
AuthorSchema
    .virtual('date_of_birth_formatted')
    .get(function(){
        return this.date_of_birth 
        ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) 
        : '';
    });

AuthorSchema
    .virtual('date_of_death_formatted')
    .get(function(){
        return this.date_of_death 
        ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) 
        : '';
    });

// Virtual for update form dates
AuthorSchema
    .virtual('date_of_birth_updated')
    .get(function(){
        return this.date_of_birth 
        ? this.date_of_birth.toISOString().slice(0, 10)  
        : '';
    });

AuthorSchema
    .virtual('date_of_death_updated')
    .get(function(){
        return this.date_of_death 
        ? this.date_of_death.toISOString().slice(0, 10) 
        : '';
    });

// Virtual for author's URL
AuthorSchema
    .virtual('url')
    .get(function(){
        return `/catalog/author/${this._id}`;
    });

// Export Model
module.exports = mongoose.model('Author', AuthorSchema);