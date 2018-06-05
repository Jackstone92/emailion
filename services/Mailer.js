// import sendgrid //
const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
// import sendgrid api key //
const keys = require('../config/keys');

// create a class that extends sendrid.mail mailer //
class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    // sendgrid-specific setup //
    this.sgAPI = sendgrid(keys.sendGridKey);

    this.from_email = new helper.Email('no-reply@emailion.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    // an array of formatted helper.Email //
    this.recipients = this.formatAddresses(recipients);

    // ensure body is added as content to mailer using sendgrid //
    this.addContent(this.body);

    // enable click-tracking inside email //
    // sendgrid will automatically replace every link with their own special link //
    this.addClickTracking();

    this.addRecipients();
  }

  // helper method to convert array of objects to this.recipients //
  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  // helper method to add click tracking using sendgrid //
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  // helper method to add recipients using sendgrid //
  addRecipients() {
    const personalize = new helper.Personalization();

    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });

    this.addPersonalization(personalize);
  }

  // helper method to send email //
  async send() {
    // create request //
    const request = this.sgAPI.emptyRequest({
      // configuration options //
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });

    // send off request //
    const response = await this.sgAPI.API(request);
    return response;
  }
}

module.exports = Mailer;
