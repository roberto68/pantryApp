import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tasks } from '../api/tasks.js';

import './task.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('tasks');
});

Template.body.helpers({
  tasks() {
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
  getTaskId() {
     console.log (Tasks.find({}, { _id: 1 })); //only get the task Id
     return { id: Tasks.findOne({}, { _id: 1 }); // sort it same as tasks
   }
 });

Template.body.events({
  'submit .new-task'(event) {
    event.preventDefault();

    const target = event.target;
    const text = target.text.value;
    // Insert a task into the collection
    Meteor.call('tasks.insert', text);
    // Meteor.call('tasks.insert', text, Meteor.userId());
    // Clear form
    target.text.value = '';
  },
  'click #submit': (event) => {
    event.preventDefault();
    Meteor.call('tasks.remove'); // take Id from login, filter checked tasks
    // Meteor.call('tasks.remove', Meteor.userId(), text);
  },
});
