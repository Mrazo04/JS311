create table activities (
    activity_id integer primary key auto_increment,
    user_id integer,
    activity_name varchar(100), 
    ageMin varchar(100),
    ageMax varchar(100), 
    activity_type varchar(100), 
    price integer,  
    street_address varchar(100), 
    city varchar(100), 
    state varchar(100), 
    zipcode varchar(100)
);

create table fleisure_users(
	user_id integer primary key auto_increment,
  	email varchar(100) not null unique, 
  	hash varchar(1000)
);
