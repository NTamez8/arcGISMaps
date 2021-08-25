#!/bin/bash
sudo systemctl stop nginx
sudo pm2 stop ../index.js