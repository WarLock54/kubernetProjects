import time
import datetime
import os

pod_name = os.getenv('POD_NAME', 'log-generator')
counter = 0

print(f"Starting log generation on pod: {pod_name}")

while True:
    timestamp = datetime.datetime.now().isoformat()
    print(f'{timestamp} - INFO - Log entry {counter} from pod {pod_name}')
    counter += 1
    time.sleep(5)