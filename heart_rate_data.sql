create database heart_rate_data;
use heart_rate_data;

create table products(
	id int auto_increment,
    hr int ,
	oxi float ,
	times datetime default current_timestamp,
    PRIMARY KEY (`id`) 
	)engine = InnoDB