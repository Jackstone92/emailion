const mongoose = require('mongoose');
// import lodash, path-parser and URL to help parse webhook events //
const _ = require('lodash');
const Path = require('path-parser').default;
// node.js url //
const { URL } = require('url');
// check user is logged in //
const requireLogin = require('../middlewares/requireLogin');
// if user is logged in, check they have enough credits to send emails //
const requireCredits = require('../middlewares/requireCredits');

// import mongoose model //
const Survey = mongoose.model('surveys');

// import Mailer service (sendgrid) //
const Mailer = require('../services/Mailer');

// import survey template //
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false
    });

    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // create and attempt to send an email //
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();

      // persistent save survey //
      await survey.save();

      // deduct 1 credit from user and save user //
      req.user.credits -= 1;
      const user = await req.user.save();

      // send updated user model //
      res.send(user);
    } catch (err) {
      // unprocessable entity: something is wrong with the data sent //
      res.status(422).send(err);
    }
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    // extract the survey id and the 'choice' //
    const p = new Path('/api/surveys/:surveyId/:choice');

    // use lodash chain helper to chain lodash functions together //
    _.chain(req.body)
      // processing logic of incoming events //
      .map(({ url, email }) => {
        // match will either b an object or null if not able to extract surveyId and choice //
        const match = p.test(new URL(url).pathname);

        if (match) {
          return {
            email,
            surveyId: match.surveyId,
            choice: match.choice
          };
        }
      })
      // remove the elements that are undefined //
      .compact()
      // remove duplicate records //
      .uniqBy('email', 'surveyId')
      // iterate through events and query mongo for duplicates and update //
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            // find exactly one record with id of surveyId //
            _id: surveyId,
            // for every survey in that collection look through recipients, go through all subdocuments and find //
            // one element that matches email and responded property of false //
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            // update the found record //
            // increment the voting choice by 1 //
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    res.send({});
  });
};
