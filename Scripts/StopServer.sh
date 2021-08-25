#!/bin/bash
sudo systemctl stop nginx
pm2 stop ../index.js