create table activities (
    id integer primary key auto_increment,
    activity varchar(100), 
    ageGroup varchar(100), 
    actType varchar(100), 
    price integer, 
    summary varchar(1000), 
    streetAddress varchar(100), 
    city varchar(100), 
    state varchar(100), 
    zipcode integer
);
