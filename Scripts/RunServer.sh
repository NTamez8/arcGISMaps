#!/bin/bash
sudo systemctl start nginx
pm2 start ../index.js