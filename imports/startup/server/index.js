import { Tasks } from '../../api/Tasks';

Meteor.methods({
  addTask(title, description) {
    return Tasks.insert({
      title,
      description,
      createdAt: new Date(),
      userId: Meteor.userId()
    });
  },
  removeTask(id) {
    return Tasks.remove(id);
  }
});


Meteor.publish('tasks', () => {
  return Tasks.find();
});
