# BioQuiz

Share your personality and quiz others about yourself through short and interactive quizzes

**This is an MVP. It's not my best UI and there are definitely some bugs.** It was also unfortunately on my backlog of things, so this took a bit too long to finish.

## Development

To run locally, git clone to your computer. Edit the .env.template file, you'll need to add a database URL and Clerk info (I hate clerk and will not use it for hobby projects again it was because i got frustrated last minute pls bear with me :hs:)

Once you do all of that, rename the file to .env and run the following.
```
npm i
npm run dev
```

## Deployment

Ensure Clerk is in prod mode and run:
```npm build```
