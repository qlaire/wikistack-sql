var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

function convertToUrl(str) {
  if (str) {
    return str.trim().replace(/\s/g, "_").replace(/\W/g, "");
  } else {
    return Math.random().toString(36).substring(2, 7);
  }
}

var Page = db.define('page', {
  title: { type: Sequelize.STRING, allowNull: false },
  urlTitle: { type: Sequelize.STRING, allowNull: false, isUrl: true },
  content: { type: Sequelize.TEXT, allowNull: false },
  date: { type: Sequelize.DATE, isDate: true, defaultValue: Sequelize.NOW },
  status: Sequelize.ENUM('open', 'closed')
}, {
  getterMethods: {
    url: function() {return '/wiki/' + this.urlTitle;}
  },
  hooks: {
    beforeValidate: function(page) {
      page.urlTitle =  convertToUrl(page.title);
      console.log(page.urlTitle);
    }
  }
});

var User = db.define('user', {
  name: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false }
});

Page.belongsTo(User, {as: 'author'});

module.exports = {Page: Page, User: User};
