### What is your favourite programming language? - and why?

My favorite programming language is Javascript for these two reasons:
- it has a large ecosystem of wonderful tools and libraries which creates the option for optimal choice.
- knowing Javascript can easily turn you into a full-stack developer without having to learn another language or framework for front-end or back-end programming.

### How would you describe the software lifecycle at your most recent position? What did you enjoy the most? What would have you like to change?

Currently I am a freelance engineer as there is no definite software life cycle being followed, but in another recent role, the incremental / agile methodology was followed.
I love and enjoy _Agile_ because it fosters a strong team spirit and the product delivery can be predictable as well.

I would like to change the way stand-up meetings are being done, it should not necessarily take place everyday. If stand-ups were done consecutively, I believe it will be more productive, accountable and transparent.

### What is the largest web application you have ever worked on? - and what coding were you responsible for?

That would be an application called _Barefoot Nomad_, whilst I was still a software engineer at Andela stackUp. 
The web application was being developed to facilitate travels for company staff. I mainly contributed to the back-end part and handled simplified devOps. 

### Have you ever experienced OOP go wrong? - and what elements of OO design are most prone to abuse and misuse? How may this be prevented?

No, I haven't. But I think the concept of _inheritance_ have been badly used over time. Inheritance is quite a complicated topic but I know that bad use of the concept can result into _code smells_, _duplicate code_ and _scattered logic_.
Honestly, inheritance will always be used as it's very crucial for development but should be thorougly understood to prevent further issues.

### Explain how you would design an API Rate Limiter (e.g. for Firebase or Github)

I will go ahead with the _fixed window algorithm_. 
Github for instance, gets millions of requests every second and because of the rate at which some people make requests, other people's requests can be unjustly painful to get. 

Rate Limiter just helps to balance the ideal number of requests required from a user at a given time.
Using that algorithm, I'll create a threshold for the amount of requests a user(window) can make, in minutes, hours or day. 
Once a user(windows) exceeds the threshold, at that very moment, any other request from that same user will be discarded.