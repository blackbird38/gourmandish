`mongo --version`

Install MongoDB: https://docs.mongodb.com/manual/installation/

https://www.mongodb.com/try/download/community?tck=docs_server

install MongoDB as service - run service as network service + install Compass

Install Compass: https://www.mongodb.com/products/compass  and create the database foodynessdb

add in env vars (win): path `"C:\Program Files\MongoDB\Server\4.4\bin"`



What are services?

Services are application types that run in the system's background. These are applications such as task schedulers and event loggers. If you look at the Task Manager > Processes, you can see that you have a series of Service Hosts which are containers hosting your Windows Services.

What difference does setting MongoDB as a service make?

Running MongoDB as a service gives you some flexibility with how you can run and deploy MongoDB. For example, you can have MongoDB run at startup and restart on failures. If you don't set MongoDB up as a service, you will have to run the MongoDB server every time.

So, what is the difference between a network service and a local service?

Running MongoDB as a network service means that your service will have permission to access the network with the same credentials as the computer you are using. Running MongoDB locally will run the service without network connectivity.

https://mohamedradwan.com/2013/09/29/local-system-vs-network-service-vs-local-service-and-tfs-service-accounts/