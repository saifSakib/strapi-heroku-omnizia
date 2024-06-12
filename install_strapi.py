import os
import sys

print("====Running npm install=====")
os.system("cd /home/approot/app/strapi && npm install --unsafe-perm && npm run build")
