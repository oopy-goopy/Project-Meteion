# Project-Meteion
Client Web Interface for Project Meteion

An end to end chat between you and your friends, execept it couldn't just be that simple.
Fight the middleman, Google Gemini, as it tries to interpret your drawings into words and sends that to your friends.
The hardest way to do simple communication.

#### [Try it here (as long as we don't run out of railway credits)](https://www.rofletrose.tech)

just a sidenote: Google Gemini is a tad slow, its not our fault I swear

The server is run off of [https://proj-meteion.oopygoopy.tech](https://proj-meteion.oopygoopy.tech). Please don't steal our information, this is a hackathon we did not design with security in mind.

Inspired by Meteion from FFXIV, since we're trying to have Google Gemini interpret your emotions(or something like that).

StormHacks 2025 Devpost: [Devpost Link](https://devpost.com/software/oopygoopy-tech)

## Inspiration 
The inspiration for Project Meteion came from a casual conversation where the team joked about making language translation more challenging and fun. We were immediately hooked on the idea of creating conversations that are both entertaining and chaotic. Thus, Project Meteion was born. The name Meteion comes from one of our favorite games, where Meteion is a character who truly understands everyone's emotions.

## What it does
Project Meteion takes the regular concept of texting friends to another level. How does it do that, you might ask? Simple: **you draw what you want to say**.

That's right.

In Project Meteion, you and your friends can create a chat room where everyone communicates by drawing images that depict a _totally accurate_ representation of what they truly want to say. It's a mix of wordplay and chaotic art—a truly fun way to do something that usually takes seconds.

## How we built it
We built it with sheer willpower, determination, and perseverance. Just kidding. We used multiple frameworks and plugins for this project. The main website (www.rofletrose.tech) was built using Next.js to make client-server communication easier. Our backend (www.oopygoopy.tech) was built using Express.js and Socket.io for creating rooms, managing chats, and handling users.

How does the prediction work? We used Google Gemini to guess what the user has drawn and interpret what they're trying to say.

There are many more components that acted as glue to hold this project together, and if you're curious, we'd love to explain them to you.

## Challenges we ran into
We ran into a **lot** of challenges during this hackathon. Some of the main ones include:

- Next.js taking forever to locate the .env file
- DNS servers not responding
- Waiting 6 hours for our domain servers to propagate
- The culprit behind many projects: **CORS errors**

And many, many more. Tears were shed.

## Accomplishments that we're proud of
We're proud that we finished our project. Though not the prettiest, it works, and we had fun in the process. To us, that's what truly matters. This project helped us bond as a team and truly understand one another—our weaknesses and our strengths. That is what we're most proud of.

## What we learned
Each member learned something different throughout this experience. One member improved their proficiency in replicating user interface designs, another learned how to overcome the countless server errors that come with back-end development, and another learned how to use Next.js. Again, in the end we all learned something new about ourselves and the work we did.

## What's next for Project Meteion
To us Project Meteion is a starting point to something bigger. Maybe a platform that truly helps the challenged communicate more proficiently with others or maybe a fun game, solely for the joy of messing around. There is a lot of places this project can lead us. But first we should probably focus on the smaller/glanced over aspects, like making an accessible UI design for all platforms or fixing the potential security risks. 
