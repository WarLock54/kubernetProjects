# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY app.py .

# Set environment variables
ENV PYTHONUNBUFFERED 1
ENV POD_NAME=log-generator-pod

# Run app.py when the container launches
CMD ["python", "app.py"]