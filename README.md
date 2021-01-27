# Skeleton project for Swagger

note: 1. use admin cmd
    2. node -v v10.16.0
    2. install swaigger

# How to Create Replica set
1. Install mongoDB if not Install
2. create data dir data1 and data2
3. In each data dir create folders db, config, log
    3.1 create log file in log folder name: mongod.log
    3.2 create config filg inside config folder name mongo.cfg
        3.2.1 copy and past in data1\cofig\mongod.cfg
                dbpath =c:\data1\db\path
                logpath =c:\data1\log\mongod.log
                port=27020
4. copy all folder from data1 dir anf past in dir data2 edit config.
5. check mongodb services if running stop it. 
6. got C:\Program Files\MongoDB\Server\4.1\bin this location run commond
create replica set:
    mongod --dbpath "C:\Program Files\MongoDB\Server\4.1\data" --logpath "C:\Program Files\MongoDB\Server\4.1\log\mongod.log" --port 27017 --storageEngine=wiredTiger --journal --replSet haikuJam
7. open new cmd(admin) and goto mongo terminal used commond:
    mongo --port 27017
8. create varible for master replica used commond
    rsconf={_id: "haikuJam", members:[{_id:0, host:"localhost:27017"}]}
9. initiate that varible used commonds
    rs.initiate(rsconf);
    rs.status();
10. config other replica open new cmd(admin) and goto C:\Program Files\MongoDB\Server\4.1\data used commond
    mongod --dbpath "C:\data1\db" --logpath "C:\data1\log\mongod.log" --port 27020 --storageEngine=wiredTiger --journal --replSet haikuJam
    mongod --dbpath "C:\data2\db" --logpath "C:\data2\log\mongod.log" --port 27021 --storageEngine=wiredTiger --journal --replSet haikuJam
11. run commond in primary replica to add varible
    rs.add({host:"localhost:27020"})
    rs.add({host:"localhost:27021"})
12. run mongoDB instances used commond:
    mongo --port 27021
    mongo --port 27021
13. set both both mongoDB as slave
    rs.slaveOk()





