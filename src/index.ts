import { Application } from 'probot' // eslint-disable-line no-unused-vars

export = (app: Application) => {
  // Get an express router to expose new HTTP endpoints
  const router = app.route('/my-app');

  router.get('/hello-world', (req, res) => {
    res.write('<script  /script>');
  });

  app.on('issues.opened', async (context) => {
    const issueComment = context.issue({ body: 'Thanks for opening this issue!' })
    await context.github.issues.createComment(issueComment)
  })
  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
