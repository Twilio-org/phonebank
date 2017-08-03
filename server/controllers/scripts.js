import knexModule from 'knex';
import bookshelfModule from 'bookshelf';
import scriptsService from '../db/services/scripts';
import { development as devconfig } from '../../knexfile';
import Script from '../db/models/scripts';
// import bookshelfCreateTable from '../db/init';

const knex = knexModule(devconfig);
const bookshelf = bookshelfModule(knex);
const ScriptModel = Script(bookshelf);

export function saveNewScript(req, res, next) {
  const params = {
    name: req.body.params,
    body: req.body.params,
    description: req.body.params
  };

  scriptsService.saveNewScript(params, ScriptModel)
    .then((script) => {
      if (script) {
        res.status(201).json(script);
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json({ message: 'Could not save script.' });
    });
}

export function getScriptById(req, res, next) {
  const params = {
    id: req.params.id
  };

  return scriptsService.getScriptById(params, ScriptModel)
    .then((script) => {
      if (script) {
        res.status(200).json(script);
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log('could not fetch script by id: ', err);
    });
}

export function getAllScripts(req, res, next) {
  return scriptsService.getAllScripts(ScriptModel)
    .then((scripts) => {
      if (scripts) {
        res.status(200).json(scripts);
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log('could not fetch all scripts: ', err);
    });
}

export function updateScriptById(req, res, next) {
  const params = {
    name: req.params.name,
    body: req.params.body,
    description: req.params.description
  };

  return scriptsService.updateScriptById(params, ScriptModel)
    .then((script) => {
      if (script) {
        res.status(200).json(script);
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log('could not update script: ', err);
    });
}

export function deleteScriptById(req, res, next) {
  const params = {
    id: req.params.id
  };

  return scriptsService.deleteScriptById(params, ScriptModel)
    .then((script) => {
      if (script) {
        res.status(200).json(script);
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log('could not delete script', err);
    });
}
