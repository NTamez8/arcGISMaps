#!/bin/bash
sudo systemctl start nginx
sudo pm2 start ../index.js