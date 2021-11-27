export class FieldsValidator {
  constructor(requiredFields, objectToCheck) {
    this.requiredFields = requiredFields;
    this.objectToCheck = objectToCheck;
  }

  executeValidation() {
    const fieldsObjectToCheck = Object.keys(this.objectToCheck);
    let missingFields = {};

    for(let field of this.requiredFields) {
      if (field.regExp) {
        if (
          !field.regExp.test(this.objectToCheck[field.name]) && 
          !(!this.objectToCheck[field.name] && !field.isRequired)) {
          missingFields[field.name] = field.invalidMessage || 
            'El contenido del campo es inválido';
        }
      }
      if ((!fieldsObjectToCheck.includes(field.name) || !this.objectToCheck[field.name]) && field.isRequired) {
        missingFields[field.name] = field.requiredMessage || 
          'Este campo es requerido';
      }
    };

    return Object.keys(missingFields).length > 0 ? 
      { errors: true, fields: missingFields } : 
      { errors: false, fields: {} };
  };
};