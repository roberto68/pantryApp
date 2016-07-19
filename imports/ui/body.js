import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Router } from 'meteor/iron:router';

import { Tasks } from '../api/tasks.js';

import './task.js';
import './user.js'; // neccessary ??
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('tasks');
  //Meteor.subscribe('tasks');
});

Template.body.helpers({
  tasks() {
    // const instance = Template.instance();
    return Tasks.findAll({}, { sort: { createdAt: -1 } }); // findall ??
  }
});

Template.body.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Insert a task into the collection
    Meteor.call('tasks.insert', text);

    // Clear form
    target.text.value = '';
  },
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
});
//Router.route('/', function () {
//  this.render('home');
//});
Router.route('/login');
Router.route('/register');
