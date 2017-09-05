import responsesService from '../db/services/responses';

export default function addResponse(req, res) {
  const { call_id } = req.params;
  const { question_id, response } = req.body;
  const params = { question_id, call_id, response };

  return responsesService.saveNewResponse(params)
    .then(() => {
      res.status(200).json({ message: 'Response added successfully' });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Unable to add Response', error: err });
    });
}
