var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

var Page = db.define('page', {
  title: { type: Sequelize.STRING, allowNull: false },
  urlTitle: { type: Sequelize.STRING,
    validate: {
      allowNull: false,
      isUrl: true }
    },
  content: { type: Sequelize.TEXT, allowNull: false },
  date: { type: Sequelize.DATE, isDate: true, defaultValue: Sequelize.NOW },
  status: Sequelize.ENUM('open', 'closed')
}, {
  getterMethods: {
    url: function() {return '/wiki/' + this.urlTitle;}
  }
});

var User = db.define('user', {
  name: { type: Sequelize.STRING,
    validate: {
      allowNull: false,
      isAlphanumeric: true }
  },
  email: { type: Sequelize.STRING,
    validate: {
      allowNull: false,
      isEmail: true }
  }
});

module.exports = {Page: Page, User: User};
