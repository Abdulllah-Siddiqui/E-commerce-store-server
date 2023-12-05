import Agenda from 'agenda';

const  MONGO_URL  = 'mongodb://0.0.0.0:27017/probation_project';

const AgendaJobs = new Agenda({
  db: {
    address: MONGO_URL,
    collection: 'agendaJobs'
  },
  defaultConcurrency: 2,
  maxConcurrency: 100,
  defaultLockLifetime: 15 * 60000
});

export default AgendaJobs;