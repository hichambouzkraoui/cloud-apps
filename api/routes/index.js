import { routes } from "../constants";

import health from "./health"
import addNote from "./addNote"
import getNotes from "./getNotes"

module.exports = app => {

  // lifecycle checks
  app.use(routes.health, health);
  
  // note routes
  app.use(routes.addNote, addNote)
  app.use(routes.getNotes, getNotes)
};
