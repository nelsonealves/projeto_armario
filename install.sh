#!/bin/bash

sudo apt install mongodb -y
sudo apt install npm -y
sudo apt install nodejs -y
cd ./server
sudo npm install
cd ../projeto-armario/
sudo npm install
