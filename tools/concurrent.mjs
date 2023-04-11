import concurrently from 'concurrently';

const commands = [
  {
    command: 'nx run api:serve:development',
    name: 'API',
    prefixColor: 'blue',
  },
  {
    command: 'nx run checkout:serve:development',
    name: 'CHECKOUT',
    prefixColor: 'magenta',
  },
];

const options = {
  prefix: 'name',
  killOthers: ['failure'],
  restartTries: 3,
};

const { result } = concurrently(commands, options);

result.then(
  function onSuccess() {
    process.exit();
  },
  function onFailure(exitInfo) {
    console.log(exitInfo);
    process.exit();
  }
);
