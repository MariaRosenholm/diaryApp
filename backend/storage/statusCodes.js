"use strict";

const TYPES = {
  ERROR: "error",
  INFO: "info",
};

const MESSAGES = {
  PROGRAM_ERROR: () => ({
    message: "Sorry, error in the program!",
    type: TYPES.ERROR,
  }),
  NOT_FOUND: ( value) => ({
    message: `Nothing found with ${value}`,
    type: TYPES.INFO,
  }),
  INSERT_OK: (value) => ({
    message: `The entry with ${value} has been added. `,
    type: TYPES.INFO,
  }),
  NOT_INSERTED: () => ({
    message: "The entry was not inserted.",
    type: TYPES.ERROR,
  }),
  ALREADY_IN_USE: (value) => ({
    message: `${value} is already in use. `,
    type: TYPES.ERROR,
  }),
  DELETE_OK: (value) => ({
    message: `The entry with ${value} is removed. `,
    type: TYPES.INFO,
  }),
  NOT_DELETE: ( value) => ({
    message: `No entry with ${value} found. Nothing was removed. `,
    type: TYPES.ERROR,
  }),
  UPDATE_OK: ( value) => ({
    message: `The entry with ${value} has been updated. `,
    type: TYPES.INFO,
  }),
  NOT_UPDATED: () => ({
    message: "DATA WAS NOT UPDATED.",
    type: TYPES.INFO,
  }),
  KEYS_DO_NOT_MATCH: (keyValueInResource) => ({
    message: `The number ${keyValueInResource} of given entry is not the same as the given number. `,
    type: TYPES.ERROR,
  }),
};

module.exports = { MESSAGES };
