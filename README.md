# BioQuiz

Share your personality and quiz others about yourself through short and interactive quizzes

## Development

To run locally, git clone to your computer. Edit the .env.template file, you'll need to add a database URL and Clerk info (I hate clerk and will not use it for hobby projects again it was because i got frustrated last minute pls bear with me :hs:)

Once you do all of that, rename the file to .env and run the following.
`npm i
npm run dev`

## Deployment

Ensure Clerk is in prod mode and run:
`npm build`
