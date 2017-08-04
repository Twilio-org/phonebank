import knexModule from 'knex';
import bookshelfModule from 'bookshelf';
import scriptsService from '../db/services/scripts';
import Script from '../db/models/scripts';
import { development as devconfig } from '../../knexfile';

const knex = knexModule(devconfig);
const bookshelf = bookshelfModule(knex);
const ScriptModel = Script(bookshelf);

export function saveNewScript(req, res, next) {
  console.log(req.body, 'params in saveNewScript');
  const params = {
    name: req.body.name,
    body: req.body.body,
    description: req.body.description
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
      res.json({ message: 'Could not save script.' });
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

export function addQuestionToScript(req, res, next) {
  const { id } = req.params;
  const { question_id, sequence_number } = req.body;
  const params = { question_id, id, sequence_number };

  return scriptsService.addQuestionToScript(params, ScriptModel)
    .then((scriptQuestion) => {
      if (scriptQuestion) {
        res.status(200).json(scriptQuestion);
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log('error adding question to script: ', err);
    });
}

export function getQuestionsByScriptId(req, res, next) {
  const { id } = req.params;
  const params = { id };

  return scriptsService.getQuestionsByScriptId(params, ScriptModel)
    .then((questions) => {
      if (questions) {
        const { models } = questions;
        // parsing
        res.status(200).json(models);
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log('error getting questions by script id: ', err);
    });
}
