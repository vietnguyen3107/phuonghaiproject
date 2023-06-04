import requests
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
token = "Basic ZHJhZ29ubW91bnRhaW4ucHJvamVjdEBnbWFpbC5jb206TG9uZ1Nvbn5e"
headers = {'Authorization':token,'Content-Type':'application/json',\
		'Accept':'application/json'}

from datetime import datetime, timedelta
import time
import os

import ftputil

# Goto DATA folder
# os.chdir("DATA")

ftp_ip =  "18.142.215.113"
user = "laos"
pwd = "laos"
root_folder = "/upload"

while True:
	try:
		with ftputil.FTPHost(ftp_ip, user, pwd) as ftp_host:
			for f in ftp_host.listdir(root_folder):
				if f.endswith(".txt"):
					try:
						with ftp_host.open("{}/{}".format(root_folder, f), 'rb') as obj:
							lines = obj.readlines()
							for data in lines:
								data = data.decode("utf-8")
								date_time = datetime.strptime(data[5:21], '%d.%m.%Y,%H:%M') - timedelta(hours=7)
								l = data[22:-3].split(',')
								post = []
								for i in l:
									if i[:4] == 'CH01':
										p = {"ReceivedDate": date_time.strftime('%Y-%m-%dT%H:%M:%S'),"Value":float(i[5:]),\
										"Status":"Good","SensorType":"Level",\
										"Unit":'m',"DeviceSerialNumber": l[0]}
										post.append(p)
									elif i[:4] == 'CH02':
										p = {"ReceivedDate": date_time.strftime('%Y-%m-%dT%H:%M:%S'),"Value":float(i[5:]),\
										"Status":"Good","SensorType":"Temp",\
										"Unit":'oC',"DeviceSerialNumber": l[0]}
										post.append(p)
									elif i[:4] == 'CH31':
										p = {"ReceivedDate": date_time.strftime('%Y-%m-%dT%H:%M:%S'),"Value":float(i[5:]),\
										"Status":"Good","SensorType":"Pin",\
										"Unit":'V',"DeviceSerialNumber": l[0]}
										post.append(p)
									elif i[:4] == 'CH32':
										p = {"ReceivedDate": date_time.strftime('%Y-%m-%dT%H:%M:%S'),"Value":float(i[5:]),\
										"Status":"Good","SensorType":"Power",\
										"Unit":'V',"DeviceSerialNumber": l[0]}
										post.append(p)

								# Post data to server
								url_link = 'https://thegreenlab.xyz/Datums/Batch'
								try:
									resp = requests.post(url=url_link,json=post,headers=headers,\
										auth=("dragonmountain.project@gmail.com","LongSon~^"), verify=False, timeout=30)
									print(resp)
								except Exception as e:
									print("Error post data: {}".format(e))
					except Exception as e:
						print(e)
				# Delete file
				ftp_host.remove("{}/{}".format(root_folder, f))
	except:
		pass
	time.sleep(100)


