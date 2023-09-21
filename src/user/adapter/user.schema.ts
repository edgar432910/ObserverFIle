import Joi from 'joi';

export const schemas = {
  INSERT: {
    body: Joi.object({
      name: Joi.string().required(),
      dni: Joi.string().required(),
      lastname: Joi.string().required(),
    }),
  },
  UPDATE: {
    body: Joi.object({
      name: Joi.string(),
      dni: Joi.string(),
      lastname: Joi.string(),
    }),
  },
};

/* --------------------------------
      name: body.name,
      paternal_surname: body.paternal_surname,
      maternal_surname: body.maternal_surname,
      cmp: body.cmp,
      document: body.document,
      typeDocument: body.typeDocument,

*/
