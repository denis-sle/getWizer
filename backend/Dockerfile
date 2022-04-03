FROM python:3.8

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install -r requirements.txt

COPY . /app

# for flask web server
EXPOSE 5000

ENTRYPOINT [ "python" ]
CMD ["app.py" ]
