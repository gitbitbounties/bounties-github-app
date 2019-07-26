import { Application } from 'probot' // eslint-disable-line no-unused-vars
import { access } from 'fs';
const http = require('http');
var QRCode = require('qrcode');

export = (app: Application) => {
  app.on('issues.opened', async (context) => {
    console.log('ISSUE OPENED!!!');
    const issueComment = context.issue({ body: 'Thanks for opening this issue!' })
    await context.github.issues.createComment(issueComment)
  })

  app.on('issues.closed', async (context) => {
    console.log('Issue Closed!!!');
    postAuth(context);
    const issueComment = context.issue({ body: 'Thanks for Closing this issue!' })
    await context.github.issues.createComment(issueComment)
  })
  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/

  function postAuth(context: any) {
    //const postData = '{"login": "bcbd001e9a08386b16b4","password":"ea8704fe0a582128dbdb"}'
    const postData = '{"login":"706af00df46df2ac47d8","password":"7b47b66470a9110e1d3e"}';

    const options = {
      hostname: '13.64.70.226',
      port: 3000,
      path: '/auth?type=auth',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    const req = http.request(options, (res: any) => {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8');
      res.on('data', (chunk: any) => {
        let body = JSON.parse(chunk);
        console.log(`Access Token: ${body.access_token}`)
        console.log(`BODY: ${chunk}`);
        addInvoice(body.access_token, context);
      });
      res.on('end', () => {
        console.log('No more data in response.');
      });
    });
    
    req.on('error', (e: any) => {
      console.error(`problem with request: ${e.message}`);
    });
    
    // Write data to request body
    req.write(postData);
    req.end();
  }

  function addInvoice(access_token: string, context: any) {
    const postData = '{"amt": "100","memo":"Github Issue Resolved TIP"}'
    console.log(`Access token inside addInvoice: ${access_token}`);
    const options = {
      hostname: '13.64.70.226',
      port: 3000,
      path: '/addinvoice',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'Authorization': `Bearer ${access_token}`
      }
    };
    
    const req = http.request(options, (res: any) => {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8');
      res.on('data', (chunk: any) => {
        let body = JSON.parse(chunk);
        console.log(`BODY: ${chunk}`);
        let message = `This issue has been closed! Please tip the contributor using this lightning network invoice: ${body.payment_request}`;
        
        //QRCode.toString(body.payment_request, function (err:any , text: any) {
        //  console.log(`URL: ${text}`)
        //  message += '<span style="font-family:courier-new">' + text + '</span>';
        //});
        QRCode.toString(body.payment_request, function (err:any , text: any) {
          console.log(text);
          message += text;
        });
        const issueComment = context.issue({ body: message });
        context.github.issues.createComment(issueComment);
      });
      res.on('end', () => {
        console.log('No more data in response.');
      });
    });
    
    req.on('error', (e: any) => {
      console.error(`problem with request: ${e.message}`);
    });
    
    // Write data to request body
    req.write(postData);
    req.end();
  }

}
