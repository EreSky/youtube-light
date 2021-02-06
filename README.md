# YoutubeLight

## Running the project: 
## Server
Under 'server' folder: Run `start:dev` or `start` for a dev server running on port 3000
## Client
Under 'client' folder: Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`

## General Notes:
My main focus was to get it working ASAP and because certain time limitation I let go of different ideas I had when i thought about the assignment.
I also initially wanted to implement the server using Java's Spring Boot but felt that for this position if you guys are using Node it's better that I'll use that.

My initial approach was to use push notifications/some streaming endpoint, for Java as of today I'm using Flux(server sent events),
and for Node I thought of using sockets(SocketIO e.g. which I used before), but wanted to do it as fast as I can, so I used long polling.
I'm aware that it's probably not the best choice and also made it difficult to implement delete and reorder of videos, which I didn't implement.
Sockets would make it easy to broadcast specific events like: add, delete, reorder etc.  
and also since its full duplex the client would have sent messages directly through the socket. 

I'm using loki.js for the storage which is a super fast in-memory javascript document oriented database.

Real world I would also probably use some kind of Db, maybe adding Kafka for scaling etc.

Also, for the client I would have implemented some kind of pagination/virtualization for retrieval of videos not in the view.

Thanks.





